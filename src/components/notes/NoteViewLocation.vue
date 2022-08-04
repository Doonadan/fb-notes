<template>
<div>
  <yandex-map ref="map" :coords="note.latLng.split(',', 2)" zoom="15" :controls="['zoomControl', 'fullscreenControl']"
    style="width: 100%; height: 480px;">
    <ymap-marker :coords="note.latLng.split(',', 2)" :balloon="{ header: note.title, body: note.latLng }" marker-id="current"></ymap-marker>
  </yandex-map>
  <div class="mt-3">
    <label>Координаты</label>
    <div class="input-group mb-3">
      <input type="text" class="form-control" ref="noteLatLang" :value="note.latLng" aria-describedby="button-copy" readonly>
      <button class="btn btn-outline-primary" id="button-copy" @click="copyLatLng">
        <font-awesome-icon icon="fa-solid fa-clone" />
      </button>
    </div>
    <div class="toast align-items-center text-success position-fixed m-2 bottom-0 end-0" data-bs-delay="2500" role="alert" aria-live="assertive" aria-atomic="true" id="latLngCopyToast">
      <div class="d-flex">
        <div class="toast-body">
          Координаты скопированы
        </div>
        <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import bootstrap from 'bootstrap/dist/js/bootstrap.min.js'

export default {
  props: ['note'],
  methods: {
    copyLatLng () {
      this.$refs.noteLatLang.focus()
      this.$refs.noteLatLang.select()
      document.execCommand('copy')
      this.$refs.noteLatLang.blur()

      const latLngCopyToast = document.getElementById('latLngCopyToast')
      const toast = new bootstrap.Toast(latLngCopyToast)
      toast.show()
    }
  }
}
</script>
