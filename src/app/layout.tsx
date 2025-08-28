import type { Metadata } from 'next';
import './globals.css';
import { MenuProvider } from '@/context/MenuContext';
import SiteHeader from '@/components/layout/SiteHeader';
import Footer from '@/components/layout/Footer';
import FooterTab from '@/components/layout/FooterTab';
import FullscreenMenu from '@/components/layout/FullscreenMenu';
import PWARegister from '@/components/layout/PWARegister';

export const metadata: Metadata = {
  title: 'Cafecterapia',
  description: '',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0a0a" />
        <link rel="icon" href="/svgs/vintage-tv.svg" />
      </head>
      <body suppressHydrationWarning>
        <MenuProvider>
          <div className="min-h-screen flex flex-col">
            {/* Header: fixed on most pages, normal flow on ebook reader pages */}
            <SiteHeader />
            <FullscreenMenu />
            <PWARegister />
            {/* Main content now renders beneath the fixed header so hero can appear behind it */}
            <main className="flex-1">{children}</main>
            {/* Decorative tab just above the footer */}
            <FooterTab className="-mb-8" />
            <Footer />
          </div>
        </MenuProvider>
      </body>
    </html>
  );
}
