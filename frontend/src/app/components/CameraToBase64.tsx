//src/app/components/CameraUploader.tsx
//撮影 → Base64 変換 → ローカルストレージ保存(貸出自転車登録ページのみ適用)
//firebaseストレージの実装が完了した場合は削除

'use client';

import { useState } from 'react';
import Button from '@/app/components/Button';
import Image from 'next/image';

interface CameraToBase64Props {
  onCapture: (base64Image: string) => void;
  onCancel?: () => void;
  description?: string; // 説明用のテキスト
}

export default function CameraToBase64({
  onCapture,
  onCancel,
  description = '貸出自転車を撮影',
}: CameraToBase64Props) {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isConfirming, setIsConfirming] = useState(false); // 撮影後の確認画面用
  const [isRegistered, setIsRegistered] = useState(false); // 登録完了後の表示用

  const handlePhotoCapture = async () => {
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.capture = 'environment'; // スマホのカメラを起動！

      input.onchange = async (event) => {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files[0]) {
          const file = target.files[0];

          // Base64 に変換
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            if (typeof reader.result === 'string') {
              setCapturedImage(reader.result);
              setIsConfirming(true); // 撮影後に確認画面を表示
            }
          };
        }
      };
      input.click();
    } catch (error) {
      console.error('写真の選択中にエラーが発生しました:', error);
    }
  };

  // 登録処理
  const handleRegister = () => {
    if (capturedImage) {
      console.log('画像データ送信:', capturedImage);
      onCapture(capturedImage);
      setIsConfirming(false);
      setIsRegistered(true); // 登録完了画面に切り替え
    }
  };

  // 登録完了後の表示
  if (isRegistered && capturedImage) {
    return (
      <div className="flex flex-col items-center mt-6">
        <p className="text-lg font-bold text-orange-600">{description}</p>
        <Image
          src={capturedImage}
          alt="登録済みの写真"
          width={300}
          height={200}
        />
      </div>
    );
  }

  // 撮影後の確認画面
  if (isConfirming && capturedImage) {
    return (
      <div className="bg-white p-6 rounded-lg w-full max-w-md mt-6 shadow-md border">
        <div className="bg-white p-4 rounded-lg flex items-center justify-center">
          <Image src={capturedImage} alt="撮影画像" width={300} height={200} />
        </div>
        <p className="text-center my-4 font-bold text-orange-600">
          この写真を登録しますか？
        </p>
        <div className="flex flex-col items-center justify-center gap-4">
          <Button
            onClick={handleRegister}
            className="mt-4 border border-orange-600 text-orange-600"
          >
            登録する
          </Button>
          <Button
            onClick={() => {
              setCapturedImage(null);
              setIsConfirming(false);
              setIsRegistered(false);
              onCancel?.();
            }}
            className="mb-10 border border-gray-500 text-gray-500"
          >
            キャンセル
          </Button>
        </div>
      </div>
    );
  }

  // 撮影ボタンを表示（撮影前 or キャンセル後）
  return (
    <div className="flex flex-col items-center justify-center w-full h-auto mt-6">
      <p className="text-lg font-bold text-orange-600">{description}</p>
      <Button onClick={handlePhotoCapture} className="mt-4">
        📸 撮影
      </Button>
    </div>
  );
}
