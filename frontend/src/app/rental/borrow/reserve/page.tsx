//src/app/rental/borrow/reserve/page.tsx
//②-①-①予約確定ページ
import Button from '@/app/components/Button';
import Link from 'next/link';

export default function ReserveConfirmPage() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <div className="flex flex-col items-center justify-center flex-grow">
        <p className="text-2xl font-bold">予約が完了しました！</p>
        <br />
        <Link href="/rental">
          <Button>Homeへ戻る</Button>
        </Link>
      </div>
    </div>
  );
}
