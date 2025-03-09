import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterBikePage from '@/app/rental/lend/register/page';

beforeEach(() => {
  jest.resetAllMocks(); // モックをリセット
});

describe('RegisterBikePage', () => {
  test('貸出自転車登録フォームが正しく表示される', () => {
    render(<RegisterBikePage />);

    expect(screen.getByText(/My Chari 登録/)).toBeInTheDocument();
    expect(screen.getByLabelText(/自転車の名前/)).toBeInTheDocument();
    expect(screen.getByLabelText(/1時間あたりの料金/)).toBeInTheDocument();
    expect(screen.getByText(/貸出可能期間/)).toBeInTheDocument();
    expect(screen.getByText(/鍵タイプ/)).toBeInTheDocument();
    expect(screen.getByText(/保管場所（現在地）位置情報/)).toBeInTheDocument();
    expect(screen.getByText(/貸出自転車を撮影/)).toBeInTheDocument();
  });

  test('各項目に入力できる', async () => {
    render(<RegisterBikePage />);

    const user = userEvent.setup();

    const bikeNameInput = screen.getByLabelText(/自転車の名前/);
    await user.type(bikeNameInput, 'クロスバイク');
    expect(bikeNameInput).toHaveValue('クロスバイク');

    const priceInput = screen.getByLabelText(/1時間あたりの料金/);
    await user.type(priceInput, '500');
    expect(priceInput).toHaveValue(500);

    const startDateInput = screen.getByPlaceholderText('開始日');
    await user.type(startDateInput, '2025/03/10');
    expect(startDateInput).toHaveValue('2025/03/10');

    const endDateInput = screen.getByPlaceholderText('終了日');
    await user.type(endDateInput, '2025/03/15');
    expect(endDateInput).toHaveValue('2025/03/15');
  });

  test('料金が100円未満の場合エラーが表示される', async () => {
    render(<RegisterBikePage />);

    const user = userEvent.setup();

    const priceInput = screen.getByLabelText(/1時間あたりの料金/);
    await user.type(priceInput, '99');

    expect(
      await screen.findByText(/1時間あたりの料金は100円以上にしてください。/),
    ).toBeInTheDocument();
  });

  test('開始日が未入力で終了日を入力するとエラーメッセージが表示される', async () => {
    render(<RegisterBikePage />);

    const user = userEvent.setup();

    const endDateInput = screen.getByPlaceholderText('終了日');
    await user.type(endDateInput, '2025/03/10');

    expect(
      await screen.findByText(/先に開始日を選択してください。/),
    ).toBeInTheDocument();
  });
});
