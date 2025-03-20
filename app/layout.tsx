import { Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';
import Sidebar from '@/components/Sidebar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'HeadlineFolio - The Best Advertising Headlines Collection',
  description: 'Discover and get inspired by the most compelling headlines across different platforms and industries.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <Sidebar />
        <main>{children}</main>
      </body>
    </html>
  );
} 