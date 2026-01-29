import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { sendToNative } from '../bridge/nativeBridge';
import type { ProductResponse } from '../types/product';

type LocationState = { product?: ProductResponse } | null;

export default function PurchaseSuccess() {
  const location = useLocation();
  const product = (location.state as LocationState)?.product;

  useEffect(() => {
    sendToNative({
      type: 'PURCHASE',
      orderId: `order_${Date.now()}`,
      productId: product?.id,
      amount: product?.price ?? 0,
    });
  }, [product?.id, product?.price]);

  return (
    <Layout>
      <h2>구매 완료</h2>
      <p>결제가 정상적으로 완료되었습니다.</p>
      <Link to="/products">상품 목록으로</Link>
    </Layout>
  );
}
