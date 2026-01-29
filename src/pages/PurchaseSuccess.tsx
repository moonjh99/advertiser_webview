import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { sendToNative, setupNativeMessageListener } from '../bridge/nativeBridge';
import type { ProductResponse } from '../types/product';
import type { CreateOrderRequest } from '../types/order';

type LocationState = { product?: ProductResponse } | null;

export default function PurchaseSuccess() {
  const location = useLocation();
  const product = (location.state as LocationState)?.product;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<number | null>(null);

  useEffect(() => {
    if (!product) {
      setError('상품 정보가 없습니다.');
      setLoading(false);
      return;
    }

    // RN에서 주문 생성 응답 받기
    const cleanup = setupNativeMessageListener((data) => {
      if (data.type === 'CREATE_ORDER_RESPONSE') {
        setLoading(false);
        if (data.success) {
          // RN 응답 형식: data.data (id, totalAmount 등) — PURCHASE/트래킹은 RN에서 CREATE_ORDER로 통일
          const orderId = data.data?.id ?? data.orderId;
          setOrderId(orderId);
        } else {
          setError(data.error || data.message || '주문 생성에 실패했습니다.');
        }
      }
    });

    // RN으로 주문 생성 요청 보내기
    const orderRequest: CreateOrderRequest = {
      items: [
        {
          productId: product.id,
          quantity: 1, // 기본값 1개, 필요시 수량 선택 기능 추가 가능
        },
      ],
    };

    sendToNative({
      type: 'CREATE_ORDER',
      orderRequest,
    });

    return cleanup;
  }, [product]);

  if (loading) {
    return (
      <Layout>
        <h2>주문 처리 중...</h2>
        <p>잠시만 기다려주세요.</p>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <h2>주문 실패</h2>
        <p style={{ color: 'red' }}>{error}</p>
        <Link to="/products">상품 목록으로</Link>
      </Layout>
    );
  }

  return (
    <Layout>
      <h2>구매 완료</h2>
      <p>주문이 정상적으로 완료되었습니다.</p>
      {orderId && <p>주문 번호: {orderId}</p>}
      <Link to="/products">상품 목록으로</Link>
    </Layout>
  );
}
