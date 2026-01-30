import { useEffect } from 'react';
import './App.css';
import Router from './router';
import { setupNativeMessageListener } from './bridge/nativeBridge';

export default function App() {
  // 네이티브 뒤로가기 버튼: GO_BACK 메시지 받으면 이전 페이지로 이동
  // 단, 메인 페이지(/)에서는 아무 동작도 하지 않음
  useEffect(() => {
    const cleanup = setupNativeMessageListener((data) => {
      if (data.type === 'GO_BACK') {
        const pathname = window.location.pathname;
        const isMainPage = pathname === '/products' || pathname === '/products/';

        if (isMainPage) {
          // 제품 화면(메인)에서는 무시 — 로그인 화면으로 뒤로가기 막음
          return;
        }

        if (window.history.length > 1) {
          window.history.back();
        } else {
          if ((window as any).ReactNativeWebView) {
            (window as any).ReactNativeWebView.postMessage(
              JSON.stringify({ type: 'WEBVIEW_CANNOT_GO_BACK' }),
            );
          }
        }
      }
    });
    return cleanup;
  }, []);

  return (
    <div className="app">
      <Router />
    </div>
  );
}