import { request } from './client';
import type { ApiResponse, ProductResponse } from '../types/product';

/** 상품 목록 조회 - GET /api/products */
export function fetchProductList(): Promise<ApiResponse<ProductResponse[]>> {
  return request<ApiResponse<ProductResponse[]>>('/api/products');
}

/** 상품 단건 조회 - GET /api/products/{id} */
export function fetchProduct(id: number): Promise<ApiResponse<ProductResponse>> {
  return request<ApiResponse<ProductResponse>>(`/api/products/${id}`);
}
