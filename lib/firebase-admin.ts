let _app: import('firebase-admin/app').App | null = null

function getAdminApp() {
  // Return cached app
  if (_app) return _app

  // Lazy import to avoid module-level execution during build
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const admin = require('firebase-admin') as typeof import('firebase-admin')

  if (admin.apps.length) {
    _app = admin.apps[0]!
    return _app
  }

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n')

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      'Missing Firebase Admin env vars: FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, FIREBASE_ADMIN_PRIVATE_KEY'
    )
  }

  _app = admin.initializeApp({
    credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
  })

  return _app
}

export function getAuth() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const admin = require('firebase-admin') as typeof import('firebase-admin')
  getAdminApp()
  return admin.auth()
}

export function getFirestore() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const admin = require('firebase-admin') as typeof import('firebase-admin')
  getAdminApp()
  return admin.firestore()
}
