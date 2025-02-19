//src/app/layout.tsx
//レイアウト設定
'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import '@/app/globals.css';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname(); // 現在のURLパスを取得
  const hideHeaderFooter = pathname === '/' || pathname.startsWith('/auth/'); // トップページかどうか判定

  return (
    <html lang="ja">
      <body className="flex flex-col min-h-auto bg-[#e0f7fa] text-orange-600">
        {!hideHeaderFooter && <Header />}
        {/* トップページ以外でヘッダーを表示 */}
        <main>{children}</main>
        {!hideHeaderFooter && <Footer />}
        {/* トップページ以外でフッターを表示 */}
      </body>
    </html>
  );
}
