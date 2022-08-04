<template>
  <div>
    <div v-if="note">
      <div class="float-start">
        <button class="btn btn-link text-secondary" @click="goBack">
          <font-awesome-icon icon="fa-solid fa-angle-left btn-lg" />
        </button>
      </div>
      <div class="float-end dropstart">
        <a class="btn btn-link btn-lg text-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" />
        </a>
        <ul class="dropdown-menu">
          <li>
            <router-link class="dropdown-item small" :to="'/notes/edit/' + noteId">
              <font-awesome-icon icon="fa-solid fa-pen" />&nbsp;
              Редактировать
            </router-link>
          </li>
          <li>
            <a class="dropdown-item small text-danger" href="#" @click="removeNote(noteId)">
              <font-awesome-icon icon="fa-solid fa-trash" />&nbsp;
              Удалить
            </a>
          </li>
        </ul>
      </div>
      <h1>
        <font-awesome-icon :icon="typeIcons[note.type]" />&nbsp;
        {{ note.title }}
      </h1>
      <hr>
      <div v-if="note.type == 'textNote'">
        <pre class="note-text mt-3">{{ note.body }}</pre>
      </div>
      <NoteViewLocation v-if="note.type == 'location'" :note="note" />
      <NoteViewShoppingList v-if="note.type == 'shoppingList'" :note="note" :id="noteId" />
    </div>
  </div>
</template>
<script>
import NoteViewLocation from '@/components/notes/NoteViewLocation.vue'
import NoteViewShoppingList from '@/components/notes/NoteViewShoppingList.vue'

export default {
  data () {
    return {
      typeIcons: {
        textNote: 'fa-solid fa-note-sticky',
        location: 'fa-solid fa-location-dot',
        shoppingList: 'fa-solid fa-list-check'
      }
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    noteId () {
      return this.$route.params.id || false
    },
    note () {
      return this.$store.state.viewNote
    }
  },
  components: {
    NoteViewLocation, NoteViewShoppingList
  },
  mounted () {
    this.$store.commit('GET_NOTE_BY_ID', this.$route.params.id)
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    removeNote (id) {
      this.$store.commit('DELETE_NOTE_BY_ID', id)
      this.goBack()
    }
  }
}
</script>
<style>
.note-text {
  text-align: justify;
  font-size: 1.5em;
  white-space: pre-wrap;
}
</style>
