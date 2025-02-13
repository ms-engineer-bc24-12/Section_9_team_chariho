//src/app/components/Button.tsx
//再利用可能なボタン
import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset'; // type を追加
};

export default function Button({
  children,
  onClick,
  className,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-2 rounded-md transition border border-orange-600 text-orange-600 bg-white hover:bg-orange-100 ${className}`}
    >
      {children}
    </button>
  );
}
