import Layout from '../components/Layout';
import { sendToNative } from '../bridge/nativeBridge';

export default function Signup() {
  const signup = () => {
    const userId = `user_${Date.now()}`;

    sendToNative({
      type: 'SIGN_UP',
      userId,
    });

    alert('회원가입 완료');
    window.location.href = '/';
  };

  return (
    <Layout>
      <h2>회원가입</h2>

      <input
        placeholder="이메일"
        style={{ width: '100%', padding: 8, marginBottom: 8 }}
      />
      <input
        type="password"
        placeholder="비밀번호"
        style={{ width: '100%', padding: 8, marginBottom: 12 }}
      />

      <button style={{ width: '100%', padding: 10 }} onClick={signup}>
        회원가입
      </button>
    </Layout>
  );
}
