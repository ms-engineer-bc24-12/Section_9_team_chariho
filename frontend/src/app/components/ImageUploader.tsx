//src/app/cpmponents/ImageUploader.tsx
//画像アップロードコンポーネント

'use client';

import { useState } from 'react';
import Image from 'next/image';
import heic2any from 'heic2any';

interface ImageUploaderProps {
  onFileSelect: (file: File | null) => void; // 選択した画像を親コンポーネントへ渡す
}

export default function ImageUploader({ onFileSelect }: ImageUploaderProps) {
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false); // アップロード中の状態管理

  // 📌 ファイル選択時の処理
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files || event.target.files.length === 0) return;
    const file = event.target.files[0];

    setIsUploading(true); // アップロード開始

    let processedFile = file;

    // HEICなら JPG/PNG に変換
    if (
      file.type === 'image/heic' ||
      file.name.toLowerCase().endsWith('.heic')
    ) {
      try {
        const convertedBlob = await heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: 0.8, // 画質 80%
        });

        if (Array.isArray(convertedBlob)) {
          processedFile = new File(
            [convertedBlob[0]],
            file.name.replace(/\.heic$/i, '.jpg'),
            {
              type: 'image/jpeg',
            },
          );
        } else if (convertedBlob instanceof Blob) {
          processedFile = new File(
            [convertedBlob],
            file.name.replace(/\.heic$/i, '.jpg'),
            {
              type: 'image/jpeg',
            },
          );
        }
      } catch (error) {
        console.error('HEIC変換エラー:', error);
        setIsUploading(false); // エラー時はアップロード状態を解除
        return;
      }
    }

    setPreviewURL(URL.createObjectURL(processedFile));
    onFileSelect(processedFile); // 親コンポーネントへ渡す

    setIsUploading(false); // アップロード完了
  };

  return (
    <div className="mt-6 flex flex-col items-center">
      <p className="text-lg font-semibold">
        返却場所で貸出自転車の画像をアップロード
      </p>

      {/* 画像選択 */}
      <input
        type="file"
        accept=".heic, .jpg, .jpeg, .png"
        onChange={handleFileChange}
        className="mt-2 border p-2 rounded-md"
      />

      {/* アップロード中の表示 */}
      {isUploading && (
        <p className="text-lg font-semibold text-orange-600">
          🚲アップロード中🚲
        </p>
      )}

      {/* 画像プレビュー */}
      {previewURL && !isUploading && (
        <Image
          src={previewURL}
          alt="アップロード画像"
          width={160} // 明示的に幅を指定（px単位）
          height={120} // 明示的に高さを指定（px単位）
          className="mt-4 rounded-md border"
        />
      )}
    </div>
  );
}
