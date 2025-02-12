// src/app/components/TermsContent.tsx
import React from 'react';

const TermsContent = () => {
  return (
    <div className="p-6 max-w-3xl text-left border rounded-md shadow-md bg-white overflow-y-auto max-h-[500px]">
      <p className="text-lg font-semibold">1. 総則</p>
      <p className="mb-4">
        本利用規約は、本サービス（レンタルサイクルアプリ）の利用条件を定めるものです。本規約に同意しない場合、本サービスを利用できません。本規約は事前の通知なく変更されることがあります。
      </p>

      <p className="text-lg font-semibold">2. 定義</p>
      <ul className="list-disc pl-6 mb-4">
        <li>貸主（レンダー）：自転車を提供する個人。</li>
        <li>借主（ボロー）：自転車をレンタルする個人。</li>
        <li>サービス運営者：アプリを提供・管理する事業者。</li>
      </ul>

      <p className="text-lg font-semibold">3. アカウント登録</p>
      <p className="mb-4">
        利用者は、本サービスを利用するためにアカウント登録が必要です。虚偽の情報を登録した場合、アカウントを削除される可能性があります。18歳未満の利用は保護者の同意が必要です。
      </p>

      <p className="text-lg font-semibold">4. 自転車の貸し借り</p>
      <p className="font-semibold">（1）貸主の責任</p>
      <p className="mb-4">
        貸主は、安全に利用できる自転車を提供する義務があります。故障や不備がある場合、貸し出す前に修理してください。
      </p>
      <p className="font-semibold">（2）借主の責任</p>
      <p className="mb-4">
        借主は、自転車を適切に利用し、返却時に元の状態を維持する必要があります。利用中に破損や盗難が発生した場合、速やかに貸主・運営者に報告してください。
      </p>

      <p className="text-lg font-semibold">5. 料金・決済</p>
      <p className="mb-4">
        料金は貸主が設定し、借主はアプリを通じて支払います。返却確認後に決済が確定します。返却が正しく行われなかった場合、追加料金が発生する可能性があります。
      </p>

      <p className="text-lg font-semibold">6. 禁止事項</p>
      <ul className="list-disc pl-6 mb-4">
        <li>違法な目的での利用</li>
        <li>他人のアカウントの不正使用</li>
        <li>適切でない場所への放置や不法駐輪</li>
        <li>自転車の無断転貸</li>
      </ul>

      <p className="text-lg font-semibold">7. 免責事項</p>
      <p className="mb-4">
        貸主・借主間のトラブルについて、運営者は一切の責任を負いません。事故・盗難・故障について、運営者は責任を負いません。
      </p>

      <p className="text-lg font-semibold">8. 退会・アカウント削除</p>
      <p className="mb-4">
        利用者はいつでもアカウントを削除できます。不適切な行為があった場合、運営者はアカウントを停止する権利を持ちます。
      </p>

      <p className="text-lg font-semibold">9. 個人情報の取り扱い</p>
      <p className="mb-4">
        本サービスは、個人情報を適切に管理し、第三者に提供しません。
      </p>

      <p className="text-lg font-semibold">10. 準拠法・裁判管轄</p>
      <p>
        本規約は、日本国の法律に準拠します。紛争が生じた場合、運営者の所在地の裁判所を第一審の専属管轄とします。
      </p>
    </div>
  );
};

export default TermsContent;
