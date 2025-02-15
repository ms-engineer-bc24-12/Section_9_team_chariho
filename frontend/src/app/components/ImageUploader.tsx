//src/app/cpmponents/ImageUploader.tsx
//画像アップロードコンポーネント

'use client';

import { useState } from 'react';
import Image from 'next/image';
import heic2any from 'heic2any';

interface ImageUploaderProps {
  onFileSelect: (file: File | null) => void;
}

export default function ImageUploader({ onFileSelect }: ImageUploaderProps) {
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files || event.target.files.length === 0) return;
    const file = event.target.files[0];

    let processedFile = file;

    //HEICなら JPG/PNG に変換
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
        return;
      }
    }

    setPreviewURL(URL.createObjectURL(processedFile));
    onFileSelect(processedFile);
  };

  return (
    <div className="mt-6 flex flex-col items-center">
      <p className="text-lg font-semibold">返却時の画像をアップロード</p>
      <input
        type="file"
        accept=".heic, .jpg, .jpeg, .png"
        onChange={handleFileChange}
        className="mt-2 border p-2 rounded-md"
      />

      {/* 画像プレビュー */}
      {previewURL && (
        <Image
          src={previewURL}
          alt="アップロード画像"
          className="mt-4 w-40 h-auto rounded-md border"
        />
      )}
    </div>
  );
}
