// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth()

export const handleLogin = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password).catch((error) => {
    const errorMessage = error.message
    return errorMessage
  })
}

export const registration = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
    // We can use the name to create a database user or update the authentication user object.
  } catch (error: any) {
    const errorMessage = error.message
    return errorMessage
  }
}

export const passwordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email)
    return {
      message: 'Password reset email sent!',
    }
  } catch (error: any) {
    return {
      error: error.message,
    }
  }
}
