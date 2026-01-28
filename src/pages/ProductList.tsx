import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';

const PRODUCTS = [
  { id: 'p1', name: '무선 이어폰', price: 32000 },
  { id: 'p2', name: '스마트 워치', price: 58000 },
];

export default function ProductList() {
  const navigate = useNavigate();

  return (
    <Layout>
      <h2>상품 목록</h2>

      {PRODUCTS.map((p) => (
        <div
          key={p.id}
          style={{
            border: '1px solid #ddd',
            padding: 12,
            marginBottom: 10,
          }}
        >
          <strong>{p.name}</strong>
          <p>{p.price.toLocaleString()}원</p>
          <button onClick={() => navigate('/purchase-success')}>
            구매하기
          </button>
        </div>
      ))}
    </Layout>
  );
}
