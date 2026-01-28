import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function Login() {
  const navigate = useNavigate();

  return (
    <Layout>
      <h2>로그인</h2>

      <input
        placeholder="이메일"
        style={{ width: '100%', padding: 8, marginBottom: 8 }}
      />
      <input
        type="password"
        placeholder="비밀번호"
        style={{ width: '100%', padding: 8, marginBottom: 12 }}
      />

      <button
        style={{ width: '100%', padding: 10 }}
        onClick={() => navigate('/')}
      >
        로그인
      </button>

      <p style={{ marginTop: 12 }}>
        계정이 없으신가요? <a href="/signup">회원가입</a>
      </p>
    </Layout>
  );
}
