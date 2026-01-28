import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        maxWidth: 420,
        margin: '0 auto',
        padding: 16,
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ textAlign: 'center' }}>Advertiser Shop</h1>
      <hr />
      {children}
    </div>
  );
}
