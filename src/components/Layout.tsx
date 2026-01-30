import { Link } from 'react-router-dom';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="app-header">
        <Link to="/products">DU SHOP</Link>
      </header>
      <main className="app-main">{children}</main>
    </>
  );
}
