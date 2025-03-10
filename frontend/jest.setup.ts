import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    currentUser: { uid: 'test-uid' },
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
  })),
}));
