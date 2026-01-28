export const sendToNative = (payload: any) => {
    if ((window as any).ReactNativeWebView) {
      (window as any).ReactNativeWebView.postMessage(
        JSON.stringify(payload),
      );
    }
  };
  