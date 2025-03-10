import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from '@/app/auth/register/page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(), // router.push をモック
  }),
}));

describe('Register Component', () => {
  test('名前のバリデーションが正しく行われるか', async () => {
    render(<Register />);

    const lastNameInput = screen.getByPlaceholderText('姓を入力して下さい');
    const firstNameInput = screen.getByPlaceholderText('名を入力して下さい');
    const submitButton = screen.getByText('登録');

    // 不正な名前（数字を含む）を入力
    fireEvent.change(lastNameInput, { target: { value: '田中123' } });
    fireEvent.change(firstNameInput, { target: { value: '太郎' } });
    fireEvent.click(submitButton);

    // エラーメッセージの表示を待つ
    await waitFor(() => {
      expect(
        screen.getByText((content) =>
          content.includes(
            '姓と名はアルファベットまたは日本語のみ使用できます。',
          ),
        ),
      ).toBeInTheDocument();
    });
  });

  test('パスワード確認が一致しない場合のバリデーション', async () => {
    render(<Register />);

    const passwordInput =
      screen.getByPlaceholderText('パスワードを入力してください');
    const confirmPasswordInput =
      screen.getByPlaceholderText('もう一度パスワードを入力してください');
    const submitButton = screen.getByText('登録');

    // 異なるパスワードを入力
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'different123' },
    });
    fireEvent.click(submitButton);

    // エラーメッセージの表示を待つ
    await waitFor(() => {
      expect(
        screen.getByText((content) =>
          content.includes('パスワードが一致しません。'),
        ),
      ).toBeInTheDocument();
    });
  });
});
