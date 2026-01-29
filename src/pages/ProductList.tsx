import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { fetchProductList } from '../api/products';
import type { ProductResponse } from '../types/product';

export default function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchProductList()
      .then((res) => {
        if (!cancelled) {
          setProducts(res.data ?? []);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : '상품 목록을 불러오지 못했습니다.');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handlePurchase = (product: ProductResponse) => {
    navigate('/purchase-success', { state: { product } });
  };

  if (loading) {
    return (
      <Layout>
        <h2>상품 목록</h2>
        <p>로딩 중...</p>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <h2>상품 목록</h2>
        <p style={{ color: 'red' }}>{error}</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h2>상품 목록</h2>

      {products.length === 0 ? (
        <p>등록된 상품이 없습니다.</p>
      ) : (
        products.map((p) => (
          <div
            key={p.id}
            style={{
              border: '1px solid #ddd',
              padding: 12,
              marginBottom: 10,
            }}
          >
            <strong>
              <Link to={`/products/${p.id}`}>{p.name}</Link>
            </strong>
            <p>{p.price.toLocaleString()}원</p>
            {p.description && <p style={{ fontSize: 14, color: '#666' }}>{p.description}</p>}
            <button onClick={() => handlePurchase(p)}>구매하기</button>
          </div>
        ))
      )}
    </Layout>
  );
}
