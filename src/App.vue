<template>
  <div id="app">
    <div id="loginPage" v-if="!user.loggedIn">
      <AuthLogin />
    </div>
    <div id="appMain" v-else>
      <nav class="navbar navbar-dark bg-secondary fixed-top">
        <div class="container-fluid">
          <span class="navbar-brand mb-0 mx-auto h1">
            <font-awesome-icon icon="fa-solid fa-clipboard" />
            Personal Notes
          </span>
        </div>
      </nav>
      <SidebarMenu />
      <div class="position-fixed top-0 end-0 p-3">
      </div>
      <div id="content" class="mt-5 p-3 mx-auto">
        <transition name="bounce">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import AuthLogin from '@/components/auth/AuthLogin.vue'
import SidebarMenu from '@/components/auth/SidebarMenu.vue'

export default {
  components: {
    AuthLogin,
    SidebarMenu
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.bounce-enter-active {
  animation: bounce-in .3s;
}
.bounce-leave-active {
  animation: bounce-in .3s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0.);
    opacity: 0;
  }
  50% {
    transform: scale(1.25);
    opacity: .3;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

#content {
  text-align: center;
  max-width: 1024px;
}
</style>
