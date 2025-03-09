import { renderHook, act } from '@testing-library/react';
import { useLocation } from '@/hooks/useLocation';

const originalGeolocation = navigator.geolocation;

const mockGeolocation = {
  getCurrentPosition: jest.fn(),
};

describe('useLocation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.navigator as any).geolocation = mockGeolocation;
  });

  afterAll(() => {
    (global.navigator as any).geolocation = originalGeolocation;
  });

  //正常系
  test('正常に位置情報を取得できる', async () => {
    const mockPosition = {
      coords: {
        latitude: 35.6895,
        longitude: 139.6917,
      },
    };

    mockGeolocation.getCurrentPosition.mockImplementationOnce(
      (successCallback) => {
        successCallback(mockPosition);
      },
    );

    const { result } = renderHook(() => useLocation());

    await act(async () => {
      result.current.getLocation();
    });

    expect(result.current.userLocation).toEqual({
      lat: 35.6895,
      lng: 139.6917,
    });
    expect(result.current.error).toBeNull();
  });

  //異常系
  test('位置情報取得に失敗した場合、エラーメッセージを設定する', async () => {
    mockGeolocation.getCurrentPosition.mockImplementationOnce(
      (_success, errorCallback) => {
        errorCallback({
          code: 1, // PERMISSION_DENIED
        });
      },
    );

    const { result } = renderHook(() => useLocation());

    await act(async () => {
      result.current.getLocation();
    });

    expect(result.current.userLocation).toBeNull();
    expect(result.current.error).toBe(
      '位置情報の取得に失敗しました（エラーコード: 1）',
    );
  });
});
