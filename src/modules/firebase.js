import store from '../store'

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import firebaseConfig from './config/firebase'

initializeApp(firebaseConfig)

const auth = getAuth()
auth.onAuthStateChanged(user => {
  store.dispatch('fetchUser', user)
  store.commit('AUTH_STATE_CHECKED', true)
})
