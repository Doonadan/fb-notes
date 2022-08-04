<template>
    <div class="my-notes-actions d-flex flex-wrap gap-2 justify-content-center">
        <router-link to="/notes/add" class="btn btn-primary py-3">
          <font-awesome-icon icon="fa-solid fa-note-sticky" />&nbsp;
          Добавить заметку
        </router-link>
        <router-link to="/notes/add?type=shoppingList" class="btn btn-info py-3">
          <font-awesome-icon icon="fa-solid fa-list-check" />&nbsp;
          Добавить список покупок
        </router-link>
        <router-link to="/notes/add?type=location" class="btn btn-secondary py-3">
          <font-awesome-icon icon="fa-solid fa-location-dot" />&nbsp;
          Добавить место
        </router-link>
    </div>
</template>
<style>
#my-notes-list {
  text-align: justify;
}
</style>
