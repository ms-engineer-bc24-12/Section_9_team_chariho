//src/app/auth/login/page.tsx
//①-②　ログインページ
import Button from '@/app/components/Button';

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">ログイン</h1>

      <form className="flex flex-col gap-4 mt-4 w-80">
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

        {/* ログインボタン */}
        <Button className="bg-blue-500 text-white hover:bg-blue-700">
          ログイン
        </Button>
      </form>

      {/* 新規登録ページへのリンク */}
      <p className="mt-4 text-sm">
        アカウントをお持ちでない方は{' '}
        <a href="/auth/register" className="text-blue-500 underline">
          新規登録
        </a>
      </p>
    </div>
  );
}

//ページ確認
//http://localhost:3000/auth/login
