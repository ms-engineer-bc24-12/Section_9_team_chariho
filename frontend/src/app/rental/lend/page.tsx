//src/app/rental/lend/page.tsx
//②-②　貸すページ(登録ボタン/自転車情報一覧)

import Link from 'next/link';
import Button from '@/app/components/Button';

export default function LendPage() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <div className="flex flex-col items-center justify-center flex-grow">
        <p className="text-5xl font-bold">🤝My Chari</p>
        <br />
        <br />
        <div className="mt-6">
          <Link href="/rental/lend/register">
            <Button className="border p-4 rounded-md w-60 text-center">
              自転車を登録する
            </Button>
          </Link>
        </div>
        <br />
        <p className="text-3xl font-semibold mt-6">My Chari 一覧</p>
        <div className="flex flex-col gap-2 mt-4">
          <p className="border p-4 rounded-md w-60">自転車1</p>
          <p className="border p-4 rounded-md w-60">自転車2</p>
          <p className="border p-4 rounded-md w-60">自転車3</p>
        </div>
      </div>
    </div>
  );
}

//ページ確認
// http://localhost:3000/rental/lend
