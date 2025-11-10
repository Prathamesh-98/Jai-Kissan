// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "REDACTED",
  authDomain: "jai-kissan-d412b.firebaseapp.com",
  projectId: "jai-kissan-d412b",
  storageBucket: "jai-kissan-d412b.firebasestorage.app",
  messagingSenderId: "102085405609",
  appId: "1:102085405609:web:69ee20ae05fd64377db2b8",
  measurementId: "G-DWXPLX3Y51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const provider = new GoogleAuthProvider();
provider.addScope('email');
provider.addScope('profile');
provider.setCustomParameters({
  'prompt': 'select_account'
});

export default app;