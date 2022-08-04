<template>
  <div class="home">
    <h1>Мои заметки</h1>
    <hr>
    <NotesListActions />
    <NotesList />
  </div>
</template>

<script>
import NotesList from '@/components/notes/NotesList.vue'
import NotesListActions from '@/components/notes/NotesListActions.vue'

export default {
  name: 'HomeView',
  components: {
    NotesList,
    NotesListActions
  }
}
</script>
