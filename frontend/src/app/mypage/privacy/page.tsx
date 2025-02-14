//src/app/mypage/privacy/page.tsx
//③-④プライバシーポリシーページ
import Button from '@/app/components/Button';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col items-center min-h-screen p-20">
      <div className="flex flex-col items-center justify-center w-full">
        <p className="text-2xl font-bold mb-6">プライバシーポリシー</p>
        <div className="p-6 max-w-3xl text-left border rounded-md shadow-md bg-white overflow-y-auto max-h-[500px]">
          <p className="text-lg font-semibold">1. はじめに</p>
          <p className="mb-4">
            本プライバシーポリシーは、本サービス（レンタルサイクルアプリ）におけるユーザーの個人情報の取り扱いについて定めるものです。
            本サービスを利用することにより、本ポリシーに同意したものとみなされます。
          </p>

          <p className="text-lg font-semibold">2. 収集する情報</p>
          <ul className="list-disc pl-6 mb-4">
            <li>氏名、住所、電話番号、メールアドレス</li>
            <li>位置情報（自転車の貸出・返却時に利用）</li>
            <li>支払い情報（Stripe等の決済サービスを通じて処理）</li>
            <li>利用履歴（貸出・返却、決済情報など）</li>
            <li>デバイス情報、ログデータ（アクセス日時、IPアドレスなど）</li>
          </ul>

          <p className="text-lg font-semibold">3. 利用目的</p>
          <ul className="list-disc pl-6 mb-4">
            <li>レンタルサイクルサービスの提供および管理</li>
            <li>ユーザーの本人確認、アカウント管理</li>
            <li>決済処理および請求対応</li>
            <li>貸主・借主間の円滑な取引のための情報提供</li>
            <li>サービス向上のための分析、マーケティング</li>
            <li>法令遵守およびトラブル対応</li>
          </ul>

          <p className="text-lg font-semibold">4. 情報の共有・提供</p>
          <p className="mb-4">
            当サービスは、以下の場合を除き、ユーザーの個人情報を第三者に提供しません。
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>ユーザーの同意がある場合</li>
            <li>決済処理のため、Stripe等の外部決済サービスを利用する場合</li>
            <li>法令に基づく要請がある場合</li>
            <li>
              不正行為や違反の調査のため、関係機関へ提供する必要がある場合
            </li>
          </ul>

          <p className="text-lg font-semibold">5. 位置情報の利用</p>
          <p className="mb-4">
            本サービスでは、自転車の貸出・返却時に位置情報を利用します。
            位置情報の取得は、ユーザーの許可を得た上で行われます。
          </p>

          <p className="text-lg font-semibold">6. クッキー（Cookie）について</p>
          <p className="mb-4">
            本サービスでは、利便性向上のためにクッキーを使用する場合があります。
            クッキーの利用を希望しない場合は、ブラウザの設定を変更することで拒否することが可能です。
          </p>

          <p className="text-lg font-semibold">7. 情報の管理</p>
          <p className="mb-4">
            当サービスは、ユーザーの個人情報を適切に管理し、不正アクセス、紛失、漏洩等の防止に努めます。
          </p>

          <p className="text-lg font-semibold">8. ユーザーの権利</p>
          <p className="mb-4">
            ユーザーは、自身の個人情報に関して、開示、訂正、削除を求めることができます。
            これらの請求は、運営者までお問い合わせください。
          </p>

          <p className="text-lg font-semibold">9. プライバシーポリシーの変更</p>
          <p className="mb-4">
            本ポリシーは、事前の通知なしに変更されることがあります。
            重要な変更がある場合は、サービス内で通知します。
          </p>

          <p className="text-lg font-semibold">10. お問い合わせ</p>
          <p>
            本プライバシーポリシーに関するお問い合わせは、マイページの問い合わせフォームまでお願いします。
          </p>
        </div>
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
//http://localhost:3000/mypage/privacy
