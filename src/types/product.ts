/** 백엔드 ProductResponse와 동일 */
export interface ProductResponse {
  id: number;
  name: string;
  price: number;
  description: string;
}

/** 백엔드 ApiResponse 래퍼 (Spring 공통 응답 형식 가정) */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  code?: string;
}
