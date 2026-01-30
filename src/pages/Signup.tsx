import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { sendToNative, setupNativeMessageListener } from '../bridge/nativeBridge';

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const cleanup = setupNativeMessageListener((data) => {
      if (data.type === 'SIGN_UP_RESPONSE') {
        if (data.success) {
          alert('회원가입이 완료되었습니다.');
          navigate('/');
        } else {
          alert(data.message || '회원가입에 실패했습니다.');
        }
      }
    });

    return cleanup;
  }, [navigate]);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    sendToNative({
      type: 'SIGN_UP',
      name,
      email,
      password,
    });
  };

  return (
    <Layout>
      <div className="auth-card card">
        <h2 className="auth-title">회원가입</h2>
        <form className="auth-form" onSubmit={handleSignup}>
          <input
            type="text"
            className="input"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className="input"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="input"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            회원가입
          </button>
        </form>
        <p className="auth-footer">
          이미 계정이 있으신가요? <Link to="/">로그인</Link>
        </p>
      </div>
    </Layout>
  );
}
