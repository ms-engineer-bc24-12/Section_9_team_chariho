//src/app/rental/register/page.tsx
//②-②-①　自転車情報登録ページ　(画像/場所/金額/期間/鍵情報) →　完了アラート表示 (②-②がめんへ自動遷移)

import React from 'react';

export default function RegisterBikePage() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen px-4">
      <div className="flex flex-col items-center justify-center flex-grow w-full max-w-lg">
        <p className="text-2xl font-bold mb-4">
          ヘッダーの右上にアカウント設定を追加
        </p>
        <p className="text-2xl font-bold mb-4">自転車登録</p>

        <p>🚲 保管場所</p>
        <p>💰 1hあたりの料金設定</p>
        <p>📅 貸出可能期間</p>
        <p>🔑 鍵タイプ</p>

        <p>🔘 ダイヤル式</p>
        <p>🔘 鍵式</p>

        <p> 登録</p>
        <p>登録ボタンを押したら、完了アラート表示(登録が完了しました！)</p>
        <p>
          完了アラートのOKボタンを押したら②-②貸すページ(登録ボタン/自転車情報一覧)に自動遷移？
        </p>
      </div>

      <div className="w-full">
        <div className="flex justify-around bg-gray-100 p-4">
          <p>🏠 ホーム</p>
          <p>👤 マイページ</p>
        </div>
      </div>
    </div>
  );
}

//ページ確認
// http://localhost:3000/rental/lend/register
