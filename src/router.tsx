import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductList from './pages/ProductList';
import PurchaseSuccess from './pages/PurchaseSuccess';

export default function Router() {
    return (
        <BrowserRouter>
          <Routes>
            {/* 첫 진입 = 로그인 */}
            <Route path="/" element={<Login />} />
    
            <Route path="/signup" element={<Signup />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/purchase-success" element={<PurchaseSuccess />} />
    
            {/* 없는 경로는 로그인으로 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      );
}
