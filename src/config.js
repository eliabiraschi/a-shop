import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: ''
}

firebase.initializeApp(firebaseConfig)

export { firebase }
