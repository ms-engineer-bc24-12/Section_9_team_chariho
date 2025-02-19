// src/app/mypage/terms/page.tsx
// ③-② 利用規約ページ
import Link from 'next/link';
import TermsContent from '@/app/components/TermsContent';
import Button from '@/app/components/Button';

export default function TermsPage() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-20 pt-16">
      <div className="flex flex-col items-center justify-center">
        <p className="text-2xl font-bold mt-6">利用規約</p>
        <br />
        <TermsContent />
      </div>
      <Link href="/mypage">
        <Button>マイページへ戻る</Button>
      </Link>
    </div>
  );
}

//ページ確認
//http://localhost:3000/mypage/terms
