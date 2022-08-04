<template>
  <div id="sidebar-menu">
    <button id="menu-toggle-btn" class="btn btn-secondary position-fixed top-0 start-0 m-1" data-bs-toggle="offcanvas" data-bs-target="#sidemenuOffcanvas" aria-controls="sidemenuOffcanvas">
      <font-awesome-icon icon="fa-solid fa-bars" />
    </button>
    <div class="offcanvas offcanvas-start" tabindex="-1" id="sidemenuOffcanvas" aria-labelledby="sideMenu">
      <div class="offcanvas-body">
          <div class="user-inf p-2">
            <div v-if="user.data.avatar" class="side-menu-avatar">
                <img :src="user.data.avatar" referrerpolicy="no-referrer" />
            </div>
            Hello, <b>{{ user.data.displayName }}</b><br>
          </div>
          <hr>
          <ul class="nav nav-pills flex-column" data-bs-dismiss="offcanvas">
            <li class="nav-item">
                <router-link class="nav-link" active-class="active" exact to="/">
                  <font-awesome-icon icon="fa-solid fa-house" />&nbsp;
                  Мои заметки
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" active-class="active" exact to="/notes/add">
                  <font-awesome-icon icon="fa-solid fa-note-sticky" />&nbsp;
                  Новая заметка
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" active-class="active" exact to="/notes/add?type=shoppingList">
                  <font-awesome-icon icon="fa-solid fa-list-check" />&nbsp;
                  Новый список покупок
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" active-class="active" exact to="/notes/add?type=location">
                  <font-awesome-icon icon="fa-solid fa-location-dot" />&nbsp;
                  Новое место
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" active-class="active" to="/about">
                  <font-awesome-icon icon="fa-solid fa-circle-info" />&nbsp;
                  About
                </router-link>
            </li>
            <hr>
            <li class="nav-item">
              <button class="nav-link text-danger" @click="logout">
                <font-awesome-icon icon="fa-solid fa-right-from-bracket" />&nbsp;
                Выход
              </button>
            </li>
          </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { getAuth, signOut } from 'firebase/auth'

export default {
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    logout () {
      const auth = getAuth()
      signOut(auth)
        .then(() => {
          this.$store.commit('SET_LOGGED_IN', false)
        })
    }
  }
}
</script>
<style>
.side-menu-avatar img {
    border-radius: 50%;
    width: 64px;
    height: 64px;
    margin: 5px;
    border: 4px solid #ccc;
}
.user-inf {
    text-align: center;
    min-width: 200px;
}

#menu-toggle-btn {
  z-index: 1050;
}
</style>
