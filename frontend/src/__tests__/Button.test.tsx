//ボタンコンポーネントのテスト

import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/app/components/Button';

test('ボタンが表示される', () => {
  render(<Button>クリック</Button>);
  expect(screen.getByText('クリック')).toBeInTheDocument();
});

test('クリックイベントが呼ばれる', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>押す</Button>);

  fireEvent.click(screen.getByText('押す'));

  expect(handleClick).toHaveBeenCalledTimes(1);
});
