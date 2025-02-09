# コーディング規約

**1.コードスタイル**

- インデントは 2 スペース
- シングルクォートを使用
- 関数はキャメルケース(`getUserData`)
- データベースのカラムはスネークケース(`user_id`)

**2.Lint とフォーマット**

- Frontend 　 ESLint と prettier
- Backend 　.flake8 　と　 Black
- Typescript の型定義 → strict モードの有効化

**3.Git 運用ルール**

- ブランチ名: `TaskName_Name`
- コミットメッセージ: `fix: バグ修正`

**4.エラーハンドリング**

- 必ず try-catch **/** try-except を使用
- エラーメッセージはログに記録
- クライアントに適切なレスポンスを返す
- API → 400/500 ステータスコード + エラーメッセージ
- UI → ユーザー向けエラーメッセージを表示

  Typescript

  ```tsx
  try {
    const user = await getUser(id);
    if (!user) throw new Error("User not found");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
  ```

  Python

  ```python
  try:
      user = get_user(id)
      if not user:
          raise ValueError("User not found")
  except Exception as e:
      print(f"Error: {e}")
      return {"error": "Internal Server Error"}, 500
  ```

**5.ファイル・ディレクトリ命名規則**

- ディレクトリはケバブケース (user-management/)

- ファイルはスネークケース (user_controller.ts)

- React コンポーネントはパスカルケース (UserProfile.tsx)

- 環境変数ファイルは \*\*\*\*.env
