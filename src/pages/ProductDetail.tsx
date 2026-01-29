import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { fetchProduct } from '../api/products';
import type { ProductResponse } from '../types/product';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const numId = Number(id);
    if (Number.isNaN(numId)) {
      setError('잘못된 상품 ID입니다.');
      setLoading(false);
      return;
    }

    let cancelled = false;

    fetchProduct(numId)
      .then((res) => {
        if (!cancelled) setProduct(res.data);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : '상품 정보를 불러오지 못했습니다.');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const handlePurchase = () => {
    if (product) navigate('/purchase-success', { state: { product } });
  };

  if (loading) {
    return (
      <Layout>
        <h2>상품 상세</h2>
        <p>로딩 중...</p>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <h2>상품 상세</h2>
        <p style={{ color: 'red' }}>{error ?? '상품을 찾을 수 없습니다.'}</p>
        <Link to="/products">상품 목록으로</Link>
      </Layout>
    );
  }

  return (
    <Layout>
      <h2>{product.name}</h2>
      <p><strong>{product.price.toLocaleString()}원</strong></p>
      {product.description && <p>{product.description}</p>}
      <button onClick={handlePurchase}>구매하기</button>
      <p style={{ marginTop: 12 }}>
        <Link to="/products">← 상품 목록</Link>
      </p>
    </Layout>
  );
}
