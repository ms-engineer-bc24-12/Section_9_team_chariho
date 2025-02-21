import { useState } from 'react';

interface FormData {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  address: string;
}

interface UserFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  initialData?: FormData;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, initialData }) => {
  const [lastName, setLastName] = useState(initialData?.lastName || '');
  const [firstName, setFirstName] = useState(initialData?.firstName || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(
    initialData?.phoneNumber || '',
  );
  const [address, setAddress] = useState(initialData?.address || '');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // ユーザー名のバリデーション（日本語とアルファベットのみ）
    const nameRegex = /^[A-Za-zぁ-んァ-ン一-龯]+$/;
    if (!nameRegex.test(lastName) || !nameRegex.test(firstName)) {
      setError('ユーザー名は日本語とアルファベットのみ使用可能です。');
      return;
    }

    // 住所のバリデーション（日本語、英数字、ハイフンのみ）
    const addressRegex = /^[A-Za-z0-9ぁ-んァ-ン一-龯ー-]+$/;
    if (!addressRegex.test(address)) {
      setError('住所は日本語とハイフン、英数字のみ使用可能です。');
      return;
    }

    // 電話番号のバリデーション（最大11桁の数字、ハイフン不可）
    const phoneRegex = /^\d{1,11}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError('電話番号は最大11桁で、ハイフンなしで入力してください。');
      return;
    }

    // パスワードの一致チェック
    if (password !== confirmPassword) {
      setError('パスワードと確認用パスワードが一致しません。');
      return;
    }

    const formData = {
      lastName,
      firstName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      address,
    };

    try {
      await onSubmit(formData); // フォームのデータを親コンポーネントに渡して処理を委譲
    } catch (err) {
      setError('送信中にエラーが発生しました。');
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="flex flex-col gap-4 mt-4 w-80 overflow-h-auto"
    >
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-2">
        <div className="w-1/2">
          <label className="text-sm font-semibold">名前</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="姓を入力して下さい"
            className="border p-2 rounded-md w-full text-black"
            required
          />
        </div>
        <div className="w-1/2">
          <label className="text-sm font-semibold">　</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="名を入力して下さい"
            className="border p-2 rounded-md w-full text-black"
            required
          />
        </div>
      </div>

      <label className="text-sm font-semibold">住所</label>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="住所を入力してください"
        className="border p-2 rounded-md w-full text-black"
        required
      />

      <label className="text-sm font-semibold">電話番号</label>
      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="電話番号を入力してください"
        className="border p-2 rounded-md w-full text-black"
        maxLength={11}
        required
      />

      <label className="text-sm font-semibold">メールアドレス</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="メールアドレスを入力してください"
        className="border p-2 rounded-md w-full text-black"
        required
      />

      <label className="text-sm font-semibold">パスワード</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="パスワードを入力してください"
        className="border p-2 rounded-md w-full text-black"
        required
      />

      <label className="text-sm font-semibold">パスワード確認</label>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="もう一度パスワードを入力してください"
        className="border p-2 rounded-md w-full text-black"
        required
      />
    </form>
  );
};

export default UserForm;
