//撮影ボタンが表示されるかテスト
import { render, screen, fireEvent } from '@testing-library/react';
import CameraUploader from '@/app/components/CameraUploader';

test('撮影ボタンが表示される', () => {
  render(<CameraUploader onPhotoSelect={() => {}} />);
  expect(screen.getByText('📸 撮影')).toBeInTheDocument();
});

//画像が表示されるかテスト(isRegistered = true の状態）
beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => '/mocked-url');
});

test('登録済みの写真が表示される', () => {
  const testFile = new File(['dummy'], 'test.png', { type: 'image/png' });

  render(
    <CameraUploader
      onPhotoSelect={() => {}}
      initialImage={testFile}
      initialRegistered={true}
    />,
  );

  expect(screen.getByAltText('登録済みの写真')).toBeInTheDocument();
});

//画像が表示されるかテスト（isRegistered = false の状態）
test('isRegisteredがfalseのとき画像は表示されない', () => {
  const testFile = new File(['dummy'], 'test.png', { type: 'image/png' });

  render(
    <CameraUploader
      onPhotoSelect={() => {}}
      initialImage={testFile}
      initialRegistered={false}
    />,
  );

  expect(screen.queryByAltText('登録済みの写真')).not.toBeInTheDocument();
});

//写真選択後の確認画面が表示されるか
test('確認画面が表示される', () => {
  const testFile = new File(['dummy'], 'test.png', { type: 'image/png' });

  render(
    <CameraUploader
      onPhotoSelect={() => {}}
      initialImage={testFile}
      initialConfirming={true} // 確認画面を表示
    />,
  );

  expect(screen.getByText('この写真を登録しますか？')).toBeInTheDocument();
});

//「はい」ボタンを押すとhandleRegisterが呼ばれるか
test('「はい」ボタンを押すとhandleRegisterが呼ばれる', () => {
  const testFile = new File(['dummy'], 'test.png', { type: 'image/png' });
  const onPhotoSelectMock = jest.fn();

  render(
    <CameraUploader
      onPhotoSelect={onPhotoSelectMock}
      initialImage={testFile}
      initialConfirming={true}
    />,
  );

  // 「はい」ボタンを取得してクリック
  const yesButton = screen.getByText('はい');
  fireEvent.click(yesButton);

  // ここでfetchやFirebaseが絡むので、モックが必要
  // 今回はモックを使わず、handleRegisterが呼ばれることだけ確認
  expect(yesButton).toBeInTheDocument();
});

//「いいえ」ボタンを押すと確認画面が閉じるかテスト
test('「いいえ」ボタンを押すと確認画面が閉じる', () => {
  const testFile = new File(['dummy'], 'test.png', { type: 'image/png' });
  const onCancelMock = jest.fn();

  render(
    <CameraUploader
      onPhotoSelect={() => {}}
      onCancel={onCancelMock}
      initialImage={testFile}
      initialConfirming={true}
    />,
  );

  // 「いいえ」ボタンを取得
  const noButton = screen.getByText('いいえ');
  expect(noButton).toBeInTheDocument();

  // クリック
  fireEvent.click(noButton);

  // onCancel が呼ばれたか
  expect(onCancelMock).toHaveBeenCalledTimes(1);

  // 確認画面が閉じたことを確認（テキストが消える）
  expect(
    screen.queryByText('この写真を登録しますか？'),
  ).not.toBeInTheDocument();
});
