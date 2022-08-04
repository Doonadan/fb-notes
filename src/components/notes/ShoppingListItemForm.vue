<template>
  <div id="shoppingListItemModal" class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ modalHeaderTitle }}</h5>
          <button type="button" class="btn-close" aria-label="Close" @click="hideForm()"></button>
        </div>
        <div class="modal-body text-start">
          <div class="mb-3 row">
            <label class="col-sm-3" for="shoppingListItemTitle">Наименование</label>
            <div class="col-sm-9">
              <input type="text"
                :class="'form-control'+ (validationRunned ? (errors.title ? ' is-invalid' : ' is-valid') : '')"
                v-model="title" id="shoppingListItemTitle">
              <div v-if="errors.title" class="invalid-feedback">
                {{ errors.title }}
              </div>
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-sm-3" for="shoppingListItemQuantity">Количество</label>
            <div class="col-sm-auto">
              <input type="number"
                :class="'form-control'+ (validationRunned ? (errors.quantity ? ' is-invalid' : ' is-valid') : '')"
                v-model="quantity" id="shoppingListItemQuantity" min="1">
              <div v-if="errors.quantity" class="invalid-feedback">
                {{ errors.quantity }}
              </div>
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-sm-3" for="shoppingListItemUnit">Единица</label>
            <div class="col-sm-auto">
              <select v-model="unit" id="shoppingListItemUnit"
                :class="'form-select'+ (validationRunned ? (errors.unit ? ' is-invalid' : ' is-valid') : '')">
                <option v-for="(v, k) in units" :key="k">{{ v }}</option>
                <option value="ololo">ololo</option>
              </select>
              <div v-if="errors.unit" class="invalid-feedback">
                {{ errors.unit }}
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" @click="hideForm()">Отмена</button>
          <button type="button" class="btn btn-primary" @click="addItem()"
            v-if="shoppingListItemFormMode == 'add'">Добавить</button>
          <button type="button" class="btn btn-primary" @click="updateItem()"
            v-if="shoppingListItemFormMode == 'edit'">Обновить</button>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import bootstrap from 'bootstrap/dist/js/bootstrap.min.js'

export default {
  data () {
    return {
      errors: {},
      validationRunned: false,
      title: '',
      quantity: 0,
      unit: '',
      units: ['шт', 'пач', 'упак', 'бут', 'л', 'мл', 'кг', 'г', 'дес', 'м'],
      currentItems: []
    }
  },
  props: ['modalHeaderTitle', 'items', 'editItemKey', 'shoppingListItemFormMode'],
  watch: {
    shoppingListItemFormMode (mode, oldMode) {
      if (mode === 'edit' && this.items[this.editItemKey]) {
        const item = this.items[this.editItemKey]
        this.title = item.title
        this.quantity = item.quantity
        this.unit = item.unit
      } else {
        this.clearFrom()
      }
    }
  },
  methods: {
    validateItem () {
      this.validationRunned = true
      this.errors = {}

      if (!this.title || this.title.length < 3) {
        this.errors.title = 'Название не заполнено (мин. 3 символа)'
      }

      if (isNaN(this.quantity)) {
        this.errors.quantity = 'Количество должно быть числом'
      } else if (!this.quantity || this.quantity <= 0) {
        this.errors.quantity = 'Количество должно быть больше нуля'
      }

      if (!this.unit || this.unit.length < 1) {
        this.errors.unit = 'Не заполнена единица измерения'
      } else if (!this.units.includes(this.unit)) {
        this.errors.unit = 'Значение `' + this.unit + '` не является допустимым'
      }

      return Object.keys(this.errors).length < 1
    },
    clearFrom () {
      this.validationRunned = false
      this.title = this.unit = ''
      this.quantity = 0
    },
    hideForm () {
      const addItemModalEl = document.querySelector('#shoppingListItemModal')
      const modal = bootstrap.Modal.getInstance(addItemModalEl)
      modal.hide()
    },
    addItem () {
      if (this.validateItem() && this.$parent.note.items) {
        this.$parent.note.items.push({
          title: this.title,
          quantity: parseFloat(this.quantity),
          unit: this.unit,
          completed: false
        })

        this.clearFrom()
        this.hideForm()
      }
    },
    updateItem () {
      if (this.validateItem()) {
        this.$parent.note.items[this.editItemKey] = {
          title: this.title,
          quantity: parseFloat(this.quantity),
          unit: this.unit,
          completed: false
        }

        this.clearFrom()
        this.hideForm()
      }
    }
  }
}
</script>
