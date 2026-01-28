import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { sendToNative, setupNativeMessageListener } from '../bridge/nativeBridge';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const cleanup = setupNativeMessageListener((data) => {
      if (data.type === 'LOGIN_RESPONSE') {
        if (data.success) {
          navigate('/products');
        } else {
          alert(data.message || '로그인에 실패했습니다.');
        }
      }
    });

    return cleanup;
  }, [navigate]);

  const handleLogin = () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    sendToNative({
      type: 'LOGIN',
      email,
      password,
    });
  };

  return (
    <Layout>
      <h2>로그인</h2>

      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 8 }}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 12 }}
      />

      <button
        style={{ width: '100%', padding: 10 }}
        onClick={handleLogin}
      >
        로그인
      </button>

      <p style={{ marginTop: 12 }}>
        계정이 없으신가요? <a href="/signup">회원가입</a>
      </p>
    </Layout>
  );
}
