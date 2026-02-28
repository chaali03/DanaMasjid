import { initializeApp, getApps } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// Initialize Auth
const auth = getAuth(app)

// Set device language for better UX
if (typeof window !== 'undefined') {
  auth.useDeviceLanguage()
}

const db = getFirestore(app)

// Enable offline persistence
if (typeof window !== 'undefined') {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled in one tab at a time
      console.warn('Firebase persistence failed: Multiple tabs open')
    } else if (err.code === 'unimplemented') {
      // The current browser doesn't support persistence
      console.warn('Firebase persistence not supported in this browser')
    }
  })
}

const googleProvider = new GoogleAuthProvider()

// Suppress console errors for Google API loading issues
if (typeof window !== 'undefined') {
  const originalError = console.error
  console.error = (...args) => {
    // Filter out Google API loading errors that don't affect functionality
    const firstArg = args[0]
    if (typeof firstArg === 'string') {
      // Use exact string matching instead of substring check
      if (
        firstArg === 'Failed to load https://apis.google.com/js/api.js' ||
        firstArg.startsWith('ERR_CONNECTION_CLOSED:') ||
        firstArg.includes('Failed to get document because the client is offline')
      ) {
        return
      }
    }
    originalError.apply(console, args)
  }
}

export { auth, db, googleProvider }
