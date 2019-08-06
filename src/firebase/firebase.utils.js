import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyCZ6ZuUXPYlmA0KRQ7o9uYou9iSzLPVKfU",
    authDomain: "crwn-db-a6228.firebaseapp.com",
    databaseURL: "https://crwn-db-a6228.firebaseio.com",
    projectId: "crwn-db-a6228",
    storageBucket: "",
    messagingSenderId: "333093329286",
    appId: "1:333093329286:web:eb781cf3b09193b6"
  }

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return

  const userRef =  firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get()

  if(!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }catch(e){
      console.log('error creating user', e.message)
    }
  }

  return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({'prompt': 'select_account'})

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase