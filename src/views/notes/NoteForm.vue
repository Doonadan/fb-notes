<template>
    <div class="add-note">
        <h1>{{ ($route.name == 'editNote' ? 'Редактировать' : 'Добавить') }}
         {{ (noteType == 'location' ? 'место' : (noteType == 'shoppingList' ? 'список покупок' : 'заметку')) }}</h1>
        <div v-if="validationRunned && errors.common" class="alert alert-danger">
          {{ errors.common }}
        </div>
        <div class="mb-3">
          <label for="noteTitle" class="form-label">Название</label>
          <input type="text" placeholder="Введите название" name="noteTitle" v-model="note.title"
            :class="'form-control'+ (validationRunned ? (errors.title ? ' is-invalid' : ' is-valid') : '')" required>
          <div v-if="errors.title" class="invalid-feedback">
            {{ errors.title }}
          </div>
        </div>
        <div class="mb-3" v-if="noteType == 'textNote'">
          <label for="noteBody" class="form-label">Содержимое</label>
          <textarea placeholder="Введите текст" name="noteBody" v-model="note.body"
            :class="'form-control'+ (validationRunned ? (errors.body ? ' is-invalid' : ' is-valid') : '')"
            rows="12"></textarea>
          <div v-if="errors.body" class="invalid-feedback">
            {{ errors.body }}
          </div>
        </div>
        <div v-if="noteType == 'location'">
          <div class="mb-3">
            <label for="noteLatLng">Координаты</label>
            <input placeholder="XX.XXXXXX,YY.YYYYYY" type="text" name="noteLatLng" v-model="note.latLng"
              :class="'form-control'+ (validationRunned ? (errors.latLng ? ' is-invalid' : ' is-valid') : '')">
            <div v-if="errors.latLng" class="invalid-feedback">
              {{ errors.latLng }}
            </div>
          </div>
          <div class="mb-4">
            <yandex-map ref="map" :coords="currentPlace" zoom="12" :controls="['zoomControl', 'fullscreenControl']"
              style="width: 100%; height: 480px;" @click="onClick">
              <!-- markers -->
              <ymap-marker v-if="marker" :coords="marker" :balloon="{ header: note.title, body: note.latLng }"
                marker-id="current"></ymap-marker>
            </yandex-map>
          </div>
        </div>
        <div v-if="noteType == 'shoppingList'">
          <button class="btn btn-link btn-lg text-primary float-end" data-bs-target="#shoppingListItemModal"
            data-bs-toggle="modal" @click="addShoppingListItem()">
            <font-awesome-icon icon="fa-solid fa-plus" />
          </button>
          <h3>Покупки</h3>
          <hr>
          <div class="mb-3" id="shoppingListItems">
            <ul v-if="note && note.items.length > 0" class="list-group">
              <li v-for="(item, k) in note.items" :key="k" class="list-group-item">
                <div class="float-start">{{ k+1 }}.</div>
                {{ item.title }}, {{ item.quantity }} {{ item.unit }}
                <div class="float-end">
                  <button class="btn text-primary btn-link btn-sm ms-1" data-bs-target="#shoppingListItemModal"
                    data-bs-toggle="modal" @click="editShoppingListItem(k)">
                    <font-awesome-icon icon="fa-solid fa-pen" />
                  </button>
                  <button class="btn text-danger btn-link btn-sm ms-1" @click="deleteShoppingListItem(k)">
                    <font-awesome-icon icon="fa-solid fa-trash" />
                  </button>
                </div>
              </li>
            </ul>
            <div v-else class="alert alert-warning">
              <font-awesome-icon icon="fa-solid fa-circle-exclamation" class="float-start" />&nbsp;Список покупок пуст
            </div>
          </div>
          <ShoppingListItemForm
            :modalHeaderTitle="(shoppingListItemFormMode == 'add' ? 'Добавить покупку' : 'Редактировать покупку')"
            :items="note.items" :editItemKey="editItemKey" :shoppingListItemFormMode="shoppingListItemFormMode" />
        </div>
        <div class="d-flex justify-content-center gap-2 mt-3 border-top p-4">
          <button class="btn btn-primary col-4" @click="saveNote()">
            <font-awesome-icon icon="fa-solid fa-floppy-disk" />&nbsp;
            Сохранить
          </button>
          <button class="btn btn-danger col-4" @click="cancel()">
            <font-awesome-icon icon="fa-solid fa-ban" />&nbsp;
            Отмена
          </button>
        </div>
    </div>
</template>
<script>
import ShoppingListItemForm from '@/components/notes/ShoppingListItemForm.vue'

export default {
  data () {
    return {
      errors: {},
      validationRunned: false,
      noteType: 'textNote',
      defaultPlace: [53.895886814247774, 27.54440702595093],
      editItemKey: 0,
      shoppingListItemFormMode: false
    }
  },
  components: {
    ShoppingListItemForm
  },
  computed: {
    currentPlace () {
      return (this.note.latLng && this.isValidLatLng(this.note.latLng))
        ? this.note.latLng.replace(', ', ',').split(',', 2)
        : this.defaultPlace
    },
    marker () {
      return (this.note.latLng && this.isValidLatLng(this.note.latLng))
        ? this.note.latLng.replace(', ', ',').split(',', 2)
        : false
    },
    note () {
      return this.$store.state.noteForEdit
    }
  },
  watch: {
    note (val) {
      if (val.type) {
        this.noteType = val.type
      }
    },
    $route (to) {
      this.noteType = to.query.type || 'textNote'
    }
  },
  mounted () {
    if (this.$route.name === 'editNote') {
      this.$store.commit('GET_NOTE_FOR_EDIT_BY_ID', this.$route.params.id)
      this.noteType = this.note.type
    } else {
      this.noteType = (this.$route.name === 'addNote' && this.$route.query.type) ? this.$route.query.type : 'textNote'
      this.$store.commit('CLEAR_EDIT_NOTE', this.noteType)
    }
  },
  methods: {
    isValidLatLng (value) {
      const items = value.replace(', ', ',').split(',', 2)
      return !(isNaN(items[0]) || isNaN(items[1]))
    },
    onClick (event) {
      this.note.latLng = event.get('coords').join()
    },
    addShoppingListItem () {
      this.shoppingListItemFormMode = 'add'
    },
    editShoppingListItem (key) {
      this.editItemKey = key
      this.shoppingListItemFormMode = 'edit'
    },
    deleteShoppingListItem (key) {
      this.note.items.splice(key, 1)
    },
    validateForm () {
      this.validationRunned = true
      this.errors = {}

      if (!this.note.title) {
        this.errors.title = 'Требуется указать название'
      }

      if (this.noteType === 'textNote' && !this.note.body) {
        this.errors.body = 'Требуется указать содержимое'
      }

      if (this.noteType === 'shoppingList' && this.note.items.length < 1) {
        this.errors.common = 'Не добалено ни одной покупки'
      }

      if (this.noteType === 'location' && !this.note.latLng) {
        this.errors.latLng = 'Не указаны координаты'
      }

      return Object.keys(this.errors).length < 1
    },
    addNote () {
      const noteData = {
        title: this.note.title,
        type: this.noteType
      }

      switch (this.noteType) {
        case 'textNote':
          noteData.body = this.note.body
          break
        case 'shoppingList':
          noteData.items = this.note.items
          break
        case 'location':
          noteData.latLng = this.note.latLng
          break
      }

      this.$store.commit('ADD_NEW_NOTE', noteData)
    },
    updateNote () {
      const noteData = {
        id: this.$route.params.id,
        title: this.note.title,
        type: this.noteType
      }

      switch (this.noteType) {
        case 'textNote':
          noteData.body = this.note.body
          break
        case 'shoppingList':
          noteData.shoppingListItems = this.note.items
          break
        case 'location':
          noteData.latLng = this.note.latLng
          break
      }

      this.$store.commit('UPDATE_NOTE', noteData)
    },
    saveNote () {
      if (this.validateForm()) {
        if (this.$route.name === 'editNote') {
          this.updateNote()
        } else {
          this.addNote()
        }

        this.$router.replace({
          name: 'home'
        })
      }
    },
    cancel () { this.$router.go(-1) }
  }
}
</script>
