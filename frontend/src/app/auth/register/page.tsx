//src/app/auth/register/page.tsx
//①-①　新規登録ページ
import Button from '@/app/components/Button';

export default function Register() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">新規登録</h1>
      <p className="mt-2">必要な情報を入力してください。</p>

      <form className="flex flex-col gap-4 mt-4 w-80">
        <input
          type="text"
          placeholder="名前"
          className="border p-2 rounded-md w-full"
        />
        <input
          type="text"
          placeholder="住所"
          className="border p-2 rounded-md w-full"
        />
        <input
          type="tel"
          placeholder="電話番号"
          className="border p-2 rounded-md w-full"
        />
        <input
          type="email"
          placeholder="メール"
          className="border p-2 rounded-md w-full"
        />
        <input
          type="password"
          placeholder="パスワード"
          className="border p-2 rounded-md w-full"
        />

        {/* クレジットカード情報 */}
        <h2 className="text-lg font-semibold mt-4">決済情報</h2>
        <input
          type="text"
          placeholder="カード番号"
          className="border p-2 rounded-md w-full"
        />
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="有効期限 (MM/YY)"
            className="border p-2 rounded-md w-1/2"
          />
          <input
            type="text"
            placeholder="CVC"
            className="border p-2 rounded-md w-1/2"
          />
        </div>
        <input
          type="text"
          placeholder="カード名義"
          className="border p-2 rounded-md w-full"
        />
        <a
          href="/mypage/terms"
          className="text-blue-500 underline text-sm text-center mt-4"
        >
          利用規約
        </a>
        <Button className="bg-blue-500 text-white hover:bg-blue-700">
          登録
        </Button>
      </form>
    </div>
  );
}

//ページ確認
//http://localhost:3000/auth/register
