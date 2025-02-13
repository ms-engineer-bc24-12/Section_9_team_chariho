// src/app/mypage/terms/page.tsx
// ③-② 利用規約ページ
import Link from 'next/link';
import TermsContent from '@/app/components/TermsContent';
import Button from '@/app/components/Button';

export default function TermsPage() {
  return (
    <div className="flex flex-col items-center min-h-screen p-20">
      <div className="flex flex-col items-center justify-center w-full">
        <p className="text-2xl font-bold mb-6">利用規約</p>
        <TermsContent />
      </div>
      <div className="mt-6">
        <Link href="/mypage">
          <Button>マイページへ戻る</Button>
        </Link>
      </div>
    </div>
  );
}

//ページ確認
//http://localhost:3000/mypage/terms
