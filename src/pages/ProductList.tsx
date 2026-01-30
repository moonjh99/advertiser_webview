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
        <h2 className="page-title">상품 목록</h2>
        <div className="loading-spinner">로딩 중...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <h2 className="page-title">상품 목록</h2>
        <div className="error-state">{error}</div>
      </Layout>
    );
  }

  if (products.length === 0) {
    return (
      <Layout>
        <h2 className="page-title">상품 목록</h2>
        <div className="empty-state">등록된 상품이 없습니다.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h2 className="page-title">상품 목록</h2>
      <div className="product-grid">
        {products.map((p) => (
          <article key={p.id} className="product-card card">
            <Link to={`/products/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="product-card-image">상품 이미지</div>
              <div className="product-card-body">
                <h3 className="product-card-name">{p.name}</h3>
                <p className="product-card-price">{p.price.toLocaleString()}원</p>
              </div>
            </Link>
            <div className="product-card-body" style={{ paddingTop: 0 }}>
              <button type="button" className="btn btn-primary" onClick={() => handlePurchase(p)}>
                구매하기
              </button>
            </div>
          </article>
        ))}
      </div>
    </Layout>
  );
}
