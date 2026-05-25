import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { Toast } from '@/components/Toast';

export const metadata: Metadata = {
  title: 'Weverse Shop | BTS Official Merchandise',
  description: 'Official BTS Tour and Solo Merchandise - Exclusive Limited Items',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-white">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <CartDrawer />
        <Toast />
      </body>
    </html>
  );
}
