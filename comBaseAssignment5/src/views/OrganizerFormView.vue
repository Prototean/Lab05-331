<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import OrganizerService from '@/services/OrganizerService'
import { useMessageStore } from '@/stores/message'
import BaseInput from '@/components/BaseInput.vue'
import ImageUpload from '@/components/ImageUpload.vue'

const name = ref('')
// only 1 image is allowed for an organizer, so the uploader is capped at 1
const images = ref<string[]>([])

const router = useRouter()
const store = useMessageStore()

function saveOrganizer() {
  OrganizerService.saveOrganizer({
    name: name.value,
    images: images.value
  })
    .then((response) => {
      router.push({ name: 'organizer-detail-view', params: { id: response.data.id } })
      store.updateMessage('You are successfully add a new organizer   ' + response.data.name)
      setTimeout(() => {
        store.resetMessage()
      }, 3000)
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
}
</script>

<template>
  <div>
    <h1>Create an organizer</h1>
    <form @submit.prevent="saveOrganizer">
      <h3>Name your organizer</h3>
      <BaseInput v-model="name" type="text" label="Name" />

      <h3>The image of the Organizer</h3>
      <ImageUpload v-model="images" :max="1" />

      <button
        class="flex w-fit mx-auto items-center justify-center h-13 px-10 rounded-md font-semibold whitespace-nowrap border border-gray-400 focus : border-emerald-500 transition-all duration-200 ease-linear hover: scale-105 hover: border-emerald-500 hover: shadow-lg active: scale-100 focus : outline-none"
        type="submit"
      >
        Submit
      </button>
    </form>
  </div>
</template>
