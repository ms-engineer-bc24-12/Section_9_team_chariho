//src/app/rental/borrow/reserve/confirm/page.tsx
//②-①-①-①予約確定ページ (予約の最終確認)→ 完了アラート表示　 (②借りる/貸す/返すへ自動遷移？)
import Button from '@/app/components/Button';

export default function ReserveConfirmPage() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <div className="flex flex-col items-center justify-center flex-grow">
        <p className="text-2xl font-bold">登録が完了しました！</p>
        <br />
        <Button>Homeへ戻る</Button>
      </div>
    </div>
  );
}
