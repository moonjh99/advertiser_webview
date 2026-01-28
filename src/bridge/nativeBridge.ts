export const sendToNative = (payload: any) => {
  if ((window as any).ReactNativeWebView) {
    (window as any).ReactNativeWebView.postMessage(
      JSON.stringify(payload),
    );
  }
};

// 네이티브에서 메시지를 받는 리스너 설정
export const setupNativeMessageListener = (callback: (data: any) => void) => {
  // 중복 호출 방지를 위한 플래그
  let isProcessing = false;
  let lastProcessedMessage: string | null = null;

  const handleMessage = (event: MessageEvent) => {
    try {
      // 네이티브에서 MessageEvent로 보낼 때 event.data는 이미 객체입니다
      const data = event.data;
      
      // data가 유효한 객체인지 확인
      if (data === null || data === undefined) {
        console.warn('Received null or undefined data from native');
        return;
      }
      
      // 중복 호출 방지: 같은 메시지를 짧은 시간 내에 두 번 처리하지 않음
      const messageKey = JSON.stringify(data);
      if (isProcessing && lastProcessedMessage === messageKey) {
        return; // 이미 처리 중인 같은 메시지는 무시
      }
      
      // 객체가 아닌 경우 (문자열 등) JSON 파싱 시도
      let parsedData = data;
      if (typeof data === 'string') {
        try {
          parsedData = JSON.parse(data);
        } catch (parseError) {
          console.warn('Failed to parse string data as JSON:', data);
          return;
        }
      }
      
      // 객체인 경우 처리
      if (typeof parsedData === 'object' && parsedData !== null) {
        isProcessing = true;
        lastProcessedMessage = messageKey;
        
        callback(parsedData);
        
        // 짧은 시간 후 플래그 리셋 (100ms)
        setTimeout(() => {
          isProcessing = false;
          lastProcessedMessage = null;
        }, 100);
      } else {
        console.warn('Unexpected data type from native:', typeof parsedData, parsedData);
      }
    } catch (error) {
      console.error('Failed to handle message from native:', error, 'Event:', event);
      isProcessing = false;
      lastProcessedMessage = null;
    }
  };

  // window 이벤트만 사용 (네이티브에서 window.dispatchEvent를 호출하므로)
  // document 이벤트는 제거하여 중복 방지
  window.addEventListener('message', handleMessage);
  
  // cleanup 함수 반환
  return () => {
    window.removeEventListener('message', handleMessage);
  };
};
