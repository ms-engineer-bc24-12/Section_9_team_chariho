//src/app/components/CameraUploader.tsx
'use client';

import { useEffect, useState } from 'react';
import Button from '../components/Button';
import Image from 'next/image';
import { auth } from '../../lib/firebase'; // Firebaseの初期化をインポート
import { getIdToken } from 'firebase/auth'; // Firebase AuthのgetIdTokenメソッドをインポート

interface CameraUploaderProps {
  onPhotoSelect: (file: File) => void;
  onCancel?: () => void;
  description?: string; // 説明用のテキスト
  initialImage?: File | null;
  initialRegistered?: boolean;
  initialConfirming?: boolean;
}

export default function CameraUploader({
  onPhotoSelect,
  onCancel,
  description = '返却場所で貸出自転車を撮影',
  initialImage,
  initialRegistered = false,
  initialConfirming = false,
}: CameraUploaderProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(
    initialImage ?? null,
  );
  const [isConfirming, setIsConfirming] = useState(initialConfirming ?? false);
  const [isRegistered, setIsRegistered] = useState(initialRegistered ?? false); // 登録完了後に画像を表示するための状態
  const [showConfirmation, setShowConfirmation] = useState(false); // 画像アップロード成功時に表示

  // 修正: `showConfirmation` はアップロード完了後にのみ true にする
  useEffect(() => {
    if (showConfirmation) {
      console.log('画像のアップロードが完了しました！');
    }
  }, [showConfirmation]);

  const handlePhotoSelect = async () => {
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.capture = 'environment';

      input.onchange = function (event) {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files[0]) {
          const file = target.files[0];
          const reader = new FileReader();
          reader.onloadend = () => {
            if (typeof reader.result === 'string') {
              setSelectedImage(file);
              setIsConfirming(true); // 撮影後すぐに確認画面を表示
            }
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    } catch (error) {
      console.error('写真の選択中にエラーが発生しました:', error);
    }
  };

  // Firebase tokenを取得する関数
  const getFirebaseToken = async (): Promise<string> => {
    const user = auth.currentUser; // Firebase Auth から現在のユーザーを取得
    if (!user) {
      throw new Error('ユーザーが認証されていません');
    }
    return await getIdToken(user); // FirebaseのIDトークンを取得
  };

  // 画像をアップロードし、Firebase StorageのURLを取得
  const handleRegister = async () => {
    if (selectedImage) {
      try {
        const token = await getFirebaseToken(); // Firebase Auth から ID トークンを取得
        const formData = new FormData();
        formData.append('file', selectedImage);

        // バックエンドのエンドポイントに画像を送信
        const response = await fetch('http://localhost:8000/upload-image/', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error('画像のアップロードに失敗しました');
        }

        const data = await response.json();
        console.log('アップロード完了:', data.image_url);
        onPhotoSelect(selectedImage); // 親コンポーネントに画像ファイルを渡す
        setIsConfirming(false);
        setIsRegistered(true);
        setShowConfirmation(true); // ここでアップロード完了フラグを true にする
      } catch (error) {
        console.error('アップロードエラー:', error);
      }
    }
  };

  // 撮影した写真を登録後、画像を表示
  if (isRegistered && selectedImage) {
    return (
      <div
        className="flex flex-col items-center mt-6"
        data-testid="camera-to-base64"
      >
        <p className="text-lg font-bold text-orange-600">{description}</p>
        <Image
          src={URL.createObjectURL(selectedImage)}
          alt="登録済みの写真"
          width={300}
          height={200}
        />
      </div>
    );
  }

  // 撮影後の確認画面
  if (isConfirming && selectedImage) {
    return (
      <div className="bg-lightBlue-200 p-4 rounded-lg w-full max-w-md mt-6 pb-16 overflow-auto">
        <div className="aspect-square bg-lightBlue-200 mb-4 flex items-center justify-center">
          <Image
            src={URL.createObjectURL(selectedImage)}
            alt="選択した写真"
            width={300}
            height={200}
          />
        </div>
        <p className="text-center mb-4 text-customBlue font-bold">
          この写真を登録しますか？
        </p>
        <div className="flex flex-col items-center justify-center gap-4">
          <Button onClick={handleRegister} className="mt-4">
            はい
          </Button>
          <Button
            onClick={() => {
              setSelectedImage(null);
              setIsConfirming(false);
              setIsRegistered(false);
              onCancel?.();
            }}
            className="mb-10"
          >
            いいえ
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-auto mt-6">
      {/* 説明文（色を返却ページと統一） */}
      <p className="text-lg font-bold text-orange-600">{description}</p>

      {/* 撮影ボタン */}
      <Button onClick={handlePhotoSelect} className="mt-4">
        📸 撮影
      </Button>
    </div>
  );
}
