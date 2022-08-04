<template>
  <div id="my-notes-list" class="mt-4" v-if="dataLoaded">
    <div v-if="notes">
      <p v-if="totalNotesCount > 0">Всего: {{ totalNotesCount }}</p>
      <div class="card mb-2 shadow-sm" v-for="(note,id) in notes" :key="id">
        <div class="card-body">
          <div class="dropstart float-end">
            <a class="btn btn-link text-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" />
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link class="dropdown-item small" :to="'/notes/edit/' + id">
                  <font-awesome-icon icon="fa-solid fa-pen" />&nbsp;
                  Редактировать
                </router-link>
              </li>
              <li>
                <a class="dropdown-item small text-danger" href="#" @click="removeNote(id)">
                  <font-awesome-icon icon="fa-solid fa-trash" />&nbsp;
                  Удалить
                </a>
              </li>
            </ul>
          </div>
          <h5 class="card-title col-10">
            <font-awesome-icon :icon="typeIcons[note.type]" />&nbsp;
            <router-link :to="'/notes/view/' + id">{{ note.title }}</router-link>
          </h5>
          <p class="card-subtitle small text-muted">
            <font-awesome-icon icon="fa-solid fa-clock" />&nbsp;
            {{ note.updated_at | formatDatetime }}
          </p>
          <pre v-if="note.type == 'textNote'" class="card-text mt-3">{{ note.body }}</pre>
          <p v-if="note.type == 'shoppingList'" class="card-text mt-3">
            Список из <b>{{ note.items.length }}</b> покупок
          </p>
          <p v-if="note.type == 'location'" class="card-text mt-3">
            Координаты: <b>{{ note.latLng }}</b>
          </p>
        </div>
      </div>
    </div>
    <div v-else class="alert alert-warning">
      <font-awesome-icon icon="fa-solid fa-circle-exclamation" class="float-start" />
      Нет сохраненных заметок
    </div>
  </div>
  <div v-else class="spinner-border text-secondary mt-4" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</template>
<script>
export default {
  data () {
    return {
      typeIcons: {
        textNote: 'fa-solid fa-note-sticky',
        location: 'fa-solid fa-location-dot',
        shoppingList: 'fa-solid fa-list-check'
      },
      dataLoaded: false
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    totalNotesCount () {
      return (this.notes) ? Object.keys(this.notes).length : 0
    },
    notes () {
      return this.$store.state.notes
    }
  },
  mounted () {
    this.getNotes()
  },
  methods: {
    getNotes () {
      this.$store.commit('GET_MY_NOTES')
      this.dataLoaded = true
    },
    removeNote (id) {
      this.$store.commit('DELETE_NOTE_BY_ID', id)
      this.getNotes()
    }
  }
}
</script>
