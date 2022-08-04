import Vue from 'vue'
import Vuex from 'vuex'
import { getDatabase, ref, onValue, query, update, get, remove, push, set, orderByChild, serverTimestamp }
  from 'firebase/database'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null
    },
    authStateChecked: false,
    notes: false,
    viewNote: false,
    noteForEdit: false
  },
  getters: {
    user (state) {
      return state.user
    },
    notes (state) {
      return state.user
    }
  },
  mutations: {
    SET_LOGGED_IN (state, value) {
      state.user.loggedIn = value
    },
    SET_USER (state, data) {
      state.user.data = data
    },
    AUTH_STATE_CHECKED (state, data) {
      state.authStateChecked = data
    },
    CLEAR_EDIT_NOTE (state, type) {
      state.noteForEdit = {
        title: '',
        type: type,
        items: [],
        latLng: ''
      }
    },
    GET_MY_NOTES (state, data) {
      const db = getDatabase()
      const notes = query(ref(db, 'notes/' + state.user.data.id), orderByChild('updated_at'))
      if (notes) {
        state.notes = {}
        onValue(notes, (snapshot) => {
          snapshot.forEach((child) => {
            const note = child.val()
            state.notes[child.key] = note
          })

          state.notes = Object.fromEntries(Object.entries(state.notes).reverse())
        }, { onlyOnce: true })
      } else {
        state.notes = false
      }
    },
    UPDATE_SHOPING_LIST_ITEM_COMPLETED (state, data) {
      const db = getDatabase()

      const itemUrl = 'notes/' + state.user.data.id + '/' + data.id + '/items/' + data.key
      const updates = {}

      updates[itemUrl + '/completed'] = data.value
      update(ref(db), updates)
    },
    GET_NOTE_BY_ID (state, id) {
      const db = getDatabase()
      const note = ref(db, 'notes/' + state.user.data.id + '/' + id)

      get(note).then((snapshot) => {
        if (snapshot.exists()) {
          state.viewNote = snapshot.val()
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    GET_NOTE_FOR_EDIT_BY_ID (state, id) {
      const db = getDatabase()
      const note = ref(db, 'notes/' + state.user.data.id + '/' + id)

      get(note).then((snapshot) => {
        if (snapshot.exists()) {
          state.noteForEdit = snapshot.val()
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    DELETE_NOTE_BY_ID (state, id) {
      const db = getDatabase()
      const note = ref(db, 'notes/' + state.user.data.id + '/' + id)

      if (note) {
        remove(note)
      }
    },
    ADD_NEW_NOTE (state, data) {
      const db = getDatabase()
      const userNotes = ref(db, 'notes/' + state.user.data.id)
      const note = push(userNotes)

      data.created_at = data.updated_at = serverTimestamp()

      set(note, data)
    },
    UPDATE_NOTE (state, data) {
      const db = getDatabase()
      const noteUrl = 'notes/' + state.user.data.id + '/' + data.id

      const updates = {}

      updates[noteUrl + '/title'] = data.title

      switch (data.type) {
        case 'textNote':
          updates[noteUrl + '/body'] = data.body
          break
        case 'shoppingList':
          updates[noteUrl + '/items'] = data.shoppingListItems
          break
        case 'location':
          updates[noteUrl + '/latLng'] = data.latLng
          break
      }

      updates[noteUrl + '/updated_at'] = serverTimestamp()

      update(ref(db), updates)
    }
  },
  actions: {
    fetchUser ({ commit }, user) {
      commit('SET_LOGGED_IN', user !== null)
      if (user) {
        commit('SET_USER', {
          id: user.uid,
          displayName: user.displayName,
          email: user.email,
          avatar: user.photoURL
        })
      } else {
        commit('SET_USER', null)
      }
    }
  },
  modules: {
  }
})
