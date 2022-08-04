import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/notes/add',
    name: 'addNote',
    component: () => import(/* webpackChunkName: "addNote" */ '../views/notes/NoteForm.vue')
  },
  {
    path: '/notes/edit/:id',
    name: 'editNote',
    component: () => import(/* webpackChunkName: "editNote" */ '../views/notes/NoteForm.vue')
  },
  {
    path: '/notes/view/:id',
    name: 'viewNote',
    component: () => import(/* webpackChunkName: "viewNote" */ '../views/notes/NoteView.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router
