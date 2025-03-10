import { render, screen, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import LendPage from '@/app/rental/lend/page';

fetchMock.enableMocks(); // fetch をモックする準備

beforeEach(() => {
  fetchMock.resetMocks();
  fetchMock.mockResponseOnce(
    JSON.stringify([
      {
        id: 1,
        bikename: 'マウンテンバイク',
        image_url: '/dummy.jpg',
        rental_price_per_hour: 500,
      },
    ]),
  );
});

describe('LendPage Integration Test', () => {
  test('データベースから自転車一覧を取得し、正しく表示する', async () => {
    render(<LendPage />);

    // ここで fetchMock のログを出力
    console.log(fetchMock.mock.calls);

    await waitFor(() => {
      expect(screen.getByText('🚲My Chari 一覧')).toBeInTheDocument();
    });

    console.log(screen.debug()); // ここで再確認

    const bikeItems = await screen.findAllByTestId('bike-item');
    expect(bikeItems.length).toBeGreaterThan(0);
  });

  test('データベースに自転車が登録されていない場合、適切なメッセージを表示する', async () => {
    // データベースをクリアするか、テスト用の空の状態を用意する
    // ここでは、バックエンドが空のレスポンスを返すことを想定

    // コンポーネントをレンダリング
    render(<LendPage />);

    // ローディングが終わるまで待機
    await waitFor(() => {
      // メッセージが表示されることを確認
      expect(
        screen.getByText('登録された自転車はありません'),
      ).toBeInTheDocument();
    });
  });
});
