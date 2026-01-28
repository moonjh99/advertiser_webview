import { useEffect } from 'react';
import Layout from '../components/Layout';
import { sendToNative } from '../bridge/nativeBridge';

export default function PurchaseSuccess() {
  useEffect(() => {
    sendToNative({
      type: 'PURCHASE',
      orderId: `order_${Date.now()}`,
      amount: 32000,
    });
  }, []);

  return (
    <Layout>
      <h2>구매 완료</h2>
      <p>결제가 정상적으로 완료되었습니다.</p>
      <a href="/">메인으로 돌아가기</a>
    </Layout>
  );
}
