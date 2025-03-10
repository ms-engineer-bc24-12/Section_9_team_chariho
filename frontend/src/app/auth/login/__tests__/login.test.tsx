// src/app/auth/login/__tests__/Login.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../page'; // Loginコンポーネントのインポート
import { useRouter } from 'next/navigation'; // useRouterのモック
import { signInWithEmailAndPassword } from 'firebase/auth'; // Firebase認証のモック

// useRouterをモックする
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// signInWithEmailAndPasswordをモックする
jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
}));

describe('Login Component', () => {
  const mockPush = jest.fn();
  const mockSignIn = signInWithEmailAndPassword as jest.Mock;

  beforeEach(() => {
    // useRouterのモックを設定
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('ログイン後に/rentalに遷移する', async () => {
    // モックされたsignInWithEmailAndPasswordが成功した場合
    mockSignIn.mockResolvedValueOnce({
      user: { getIdToken: jest.fn().mockResolvedValue('mock-token') },
    });

    render(<Login />);

    // メールとパスワードを入力
    fireEvent.change(screen.getByPlaceholderText('メール'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('パスワード'), {
      target: { value: 'password123' },
    });

    // フォーム送信をシミュレート
    fireEvent.submit(screen.getByRole('form'));

    // レスポンスを待つ
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/rental'));
  });

  it('ログイン失敗時にエラーメッセージが表示される', async () => {
    // モックされたsignInWithEmailAndPasswordが失敗した場合
    mockSignIn.mockRejectedValueOnce(new Error('ログイン失敗'));

    render(<Login />);

    // メールとパスワードを入力
    fireEvent.change(screen.getByPlaceholderText('メール'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('パスワード'), {
      target: { value: 'wrong-password' },
    });

    // フォーム送信をシミュレート
    fireEvent.submit(screen.getByRole('form'));

    // エラーメッセージの表示を確認
    await waitFor(() => {
      expect(screen.getByText('ログイン失敗')).toBeInTheDocument();
    });
  });
});
