// src/app/mypage/terms/page.tsx
// ③-② 利用規約ページ
import Link from 'next/link';
import TermsContent from '@/app/components/TermsContent';

export default function TermsPage() {
  return (
    <div className="flex flex-col items-center min-h-screen p-20">
      <div className="flex flex-col items-center justify-center w-full">
        <p className="text-2xl font-bold mb-6">利用規約</p>
        <TermsContent />
      </div>
      <div className="mt-6">
        <Link
          href="/mypage"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 text-center"
        >
          マイページへ戻る
        </Link>
      </div>
    </div>
  );
}

//ページ確認
//http://localhost:3000/mypage/terms
