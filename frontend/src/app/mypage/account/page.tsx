//src/app/mypage/account/page.tsx
//⑦　アカウント設定ページ
import Button from '@/app/components/Button';

export default function AccountPage() {
  return (
    <div className="flex flex-col items-center justify-between min-h-[120vh] pt-16">
      <div className="flex flex-col items-center flex-grow">
        <p className="text-2xl font-bold mt-6">アカウント情報</p>
        <br />
        <p>以下の情報を確認・編集できます。</p>
        <br />
        <form className="flex flex-col gap-4 w-80">
          {/* 姓と名（横並び） */}
          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="text-sm font-semibold">名前</label>
              <input
                type="text"
                placeholder="姓"
                className="border p-2 rounded-md w-full text-black"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="text-sm font-semibold">　</label>
              <input
                type="text"
                placeholder="名"
                className="border p-2 rounded-md w-full text-black"
                required
              />
            </div>
          </div>

          <label className="text-sm font-semibold">住所</label>
          <input
            type="text"
            placeholder="住所"
            className="border p-2 rounded-md w-full text-black"
            required
          />

          <label className="text-sm font-semibold">電話番号</label>
          <input
            type="text"
            placeholder="電話番号"
            className="border p-2 rounded-md w-full text-black"
            maxLength={15}
            required
          />

          <label className="text-sm font-semibold">メールアドレス</label>
          <input
            type="email"
            placeholder="メールアドレス"
            className="border p-2 rounded-md w-full text-black"
            required
          />

          <label className="text-sm font-semibold">パスワード</label>
          <input
            type="password"
            placeholder="パスワード"
            className="border p-2 rounded-md w-full text-black"
            required
          />

          <label className="text-sm font-semibold">パスワード確認</label>
          <input
            type="password"
            placeholder="もう一度パスワードを入力してください"
            className="border p-2 rounded-md w-full text-black"
            required
          />

          <br />
          <Button type="submit">変更</Button>
          <br />
        </form>
      </div>
    </div>
  );
}

//ページ確認
//http://localhost:3000/mypage/account
