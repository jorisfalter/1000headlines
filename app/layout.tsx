import { Plus_Jakarta_Sans } from 'next/font/google';
import Navigation from '@/components/Navigation';
import Sidebar from '@/components/Sidebar';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
});

export const metadata = {
  title: '1000Headlines - 1000 Curated Headlines',
  description: 'Discover and get inspired by the most compelling headlines across different platforms and industries.',
  icons: {
    icon: '/favicon.ico',
    // Optional additional sizes
    // apple: '/apple-icon.png',
    // shortcut: '/favicon-16x16.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={jakarta.className}>
        <Navigation />
        <Sidebar />
        <main>{children}</main>
      </body>
    </html>
  );
}
