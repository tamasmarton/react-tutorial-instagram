import Firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

// import { seedDatabase } from '../seed'

const config = {
  apiKey: 'AIzaSyAeOWQNnz4KP6lcJkGyupXAM29k8KLvkm4',
  authDomain: 'instagram-clone-45a57.firebaseapp.com',
  projectId: 'instagram-clone-45a57',
  storageBucket: 'instagram-clone-45a57.appspot.com',
  messagingSenderId: '861412303182',
  appId: '1:861412303182:web:10ee884a9b485aa39a3e1f'
}

const firebase = Firebase.initializeApp(config)
const { FieldValue } = Firebase.firestore

// seedDatabase(firebase)

export { firebase, FieldValue }
