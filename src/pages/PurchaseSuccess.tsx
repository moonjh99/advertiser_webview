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

    const cleanup = setupNativeMessageListener((data) => {
      if (data.type === 'CREATE_ORDER_RESPONSE') {
        setLoading(false);
        if (data.success) {
          const orderId = data.data?.id ?? data.orderId;
          setOrderId(orderId);
        } else {
          setError(data.error || data.message || '주문 생성에 실패했습니다.');
        }
      }
    });

    const orderRequest: CreateOrderRequest = {
      items: [{ productId: product.id, quantity: 1 }],
    };
    sendToNative({ type: 'CREATE_ORDER', orderRequest });

    return cleanup;
  }, [product]);

  if (loading) {
    return (
      <Layout>
        <h2 className="page-title">주문 처리 중</h2>
        <div className="loading-spinner">잠시만 기다려주세요.</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <h2 className="page-title">주문 실패</h2>
        <div className={`result-card card error`}>
          <div className="result-icon">⚠️</div>
          <h3 className="result-title">주문을 완료하지 못했습니다</h3>
          <p className="result-message">{error}</p>
          <Link to="/products" className="btn btn-primary">
            상품 목록으로
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h2 className="page-title">구매 완료</h2>
      <div className="result-card card success">
        <div className="result-icon">✓</div>
        <h3 className="result-title">주문이 완료되었습니다</h3>
        <p className="result-message">결제가 정상적으로 처리되었습니다.</p>
        {orderId != null && <p className="result-order-id">주문 번호: {orderId}</p>}
        <Link to="/products" className="btn btn-primary">
          상품 목록으로
        </Link>
      </div>
    </Layout>
  );
}
