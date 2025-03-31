import { Plus_Jakarta_Sans } from 'next/font/google';
import Navigation from '@/components/Navigation';
import Sidebar from '@/components/Sidebar';
import { Providers } from '@/components/Providers';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata = {
  title: '1000 Headlines',
  description: 'A collection of 1000 great headlines',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={plusJakartaSans.className} suppressHydrationWarning>
        <Providers>
          <div className="min-h-screen bg-white">
            <Navigation />
            <div className="flex">
              <Sidebar />
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
