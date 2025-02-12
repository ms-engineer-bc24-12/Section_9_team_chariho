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
      className={`px-6 py-2 rounded-md transition ${className}`}
    >
      {children}
    </button>
  );
}
