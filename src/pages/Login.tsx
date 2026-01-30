import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
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
      <div className="auth-card card">
        <h2 className="auth-title">로그인</h2>
        <form className="auth-form" onSubmit={handleLogin}>
          <input
            type="email"
            className="input"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <input
            type="password"
            className="input"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <button type="submit" className="btn btn-primary btn-submit">
            로그인
          </button>
        </form>
        <p className="auth-footer">
          계정이 없으신가요? <Link to="/signup">회원가입</Link>
        </p>
      </div>
    </Layout>
  );
}
