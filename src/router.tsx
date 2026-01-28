import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductList from './pages/ProductList';
import PurchaseSuccess from './pages/PurchaseSuccess';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/purchase-success" element={<PurchaseSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}
