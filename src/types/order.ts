/** 주문 생성 요청 - POST /api/orders */
export interface CreateOrderRequest {
  items: CreateOrderItem[];
}

export interface CreateOrderItem {
  productId: number;
  quantity: number;
}

/** 주문 응답 - OrderResponse */
export interface OrderResponse {
  id: number;
  userId: number;
  totalAmount: number;
  createdAt: string; // ISO 8601 형식
  items: OrderLine[];
}

export interface OrderLine {
  productId: number;
  unitPrice: number;
  quantity: number;
  amount: number;
}
