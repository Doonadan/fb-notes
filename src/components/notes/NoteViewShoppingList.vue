<template>
  <div class="mt-3 list-group list-group-flush">
    <div :class="'list-group-item' + (item.completed ? ' list-group-item-success' : '')" v-for="(item, k) in note.items" :key="k">
      <div class="float-start">
        {{ k+1 }}.&nbsp;
        <font-awesome-icon icon="fa-solid fa-circle-check" class="text-success" v-if="item.completed" />
      </div>
      <div class="float-end">
        <button v-if="!item.completed" class="btn btn-link text-primary" @click="pickUpItem(k)">
          <font-awesome-icon icon="fa-solid fa-cart-arrow-down" />
        </button>
        <button v-else class="btn btn-link text-danger" @click="removeItem(k)">
          <font-awesome-icon icon="fa-solid fa-delete-left" />
        </button>
      </div>
      <span :class="(item.completed ? 'text-decoration-line-through' : '')">{{ item.title }} &ndash; {{ item.quantity }} {{ item.unit }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['id'],
  computed: {
    user () {
      return this.$store.state.user
    },
    note () {
      return this.$parent.note
    }
  },
  methods: {
    pickUpItem (k) {
      this.note.items[k].completed = true
      this.updateItem(k)
    },
    removeItem (k) {
      this.note.items[k].completed = false
      this.updateItem(k)
    },
    updateItem (k) {
      this.$store.commit('UPDATE_SHOPING_LIST_ITEM_COMPLETED', {
        id: this.id,
        value: this.note.items[k].completed,
        key: k
      })
    }
  }
}
</script>
