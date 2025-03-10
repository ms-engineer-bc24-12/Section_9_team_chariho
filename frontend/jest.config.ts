import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './', // Next.jsのルートディレクトリを指定
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // jest-domを使うためのセットアップファイル
  testEnvironment: 'jsdom', // React向けのテスト環境
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest', // TypeScriptの変換にはbabel-jestを使用
  },
  testMatch: ['**/__tests__/**/*.test.tsx'], // テストファイルのパターン設定
  transformIgnorePatterns: [
    'node_modules/(?!firebase)', // Firebaseを変換対象に含める
  ],
};

export default createJestConfig(customJestConfig);
