<template>
  <div class="login-form position-absolute top-50 start-50 translate-middle">
    <div v-if="authStateChecked && !user.loggedIn">
      <h1 class="mb-5">Вход в Personal Notes</h1>
      <button class="btn btn-primary btn-lg" @click="login">
        <font-awesome-icon icon="fa-brands fa-google" />&nbsp;
        Войти через Google
      </button>
    </div>
    <div class="spinner-border" style="width: 5rem; height: 5rem;" role="status" v-else>
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

export default {
  computed: {
    user () {
      return this.$store.state.user
    },
    authStateChecked () {
      return this.$store.state.authStateChecked
    }
  },
  methods: {
    login () {
      this.$store.commit('AUTH_STATE_CHECKED', false)
      const provider = new GoogleAuthProvider()
      const auth = getAuth()
      auth.languageCode = 'ru'

      signInWithPopup(auth, provider)
        .then((result) => {
          // console.log(result.user)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
<style>
.login-form {
    text-align: center;
}
</style>
