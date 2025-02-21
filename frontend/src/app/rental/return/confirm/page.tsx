//src/app/rental/return/confirm/pape.tsx
//②-③-①自転車返却確認ページ (時間/金額/決済情報)　→ 完了アラート表示(②借りる/貸す/返す選択ページへ自動遷移？)
import Button from '@/app/components/Button';

export default function ReturnConfirmPage() {
  return (
    <div className="flex flex-col items-center justify-between min-h-[170vh] pt-16">
      <div className="flex flex-col items-center flex-grow">
        <h2 className="text-4xl font-bold mt-6">返却フォーム</h2>

        <div className="mt-4 w-full max-w-md">
          <p className="border p-2 rounded-md w-full">利用日時: ○○/○○～○○/○○</p>
          <p className="border p-2 rounded-md w-full">利用時間: ○○時間</p>
          <p className="border p-2 rounded-md w-full">料金: ○○円</p>
          <p className="border p-2 rounded-md w-full">写真の認証？</p>
        </div>
        <br />
        <Button>完了する</Button>
      </div>
    </div>
  );
}
