import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDPhLALDOEFlS-JhsJbqs8lvp-bkSwaWwc',
  authDomain: 'chariho.firebaseapp.com',
  projectId: 'chariho',
  storageBucket: 'chariho.firebasestorage.app',
  messagingSenderId: '121623712517',
  appId: '1:121623712517:web:3d2d83c61b3f9296791d6c',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
