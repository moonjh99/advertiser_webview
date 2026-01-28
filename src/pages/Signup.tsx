import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const handleSignup = () => {
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
      <h2>회원가입</h2>

      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 8 }}
      />
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

      <button style={{ width: '100%', padding: 10 }} onClick={handleSignup}>
        회원가입
      </button>
    </Layout>
  );
}
