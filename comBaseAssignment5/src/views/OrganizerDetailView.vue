<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useOrganizerStore } from '@/stores/organizer'
import { storeToRefs } from 'pinia'
import OrganizerService from '@/services/OrganizerService'

const store = useOrganizerStore()
const { organizer } = storeToRefs(store)

const imageUrl = ref('')

watchEffect(() => {
  const images = organizer.value?.images
  if (!images || images.length === 0) {
    imageUrl.value = ''
    return
  }
  OrganizerService.getOrganizerImages(images)
    .then((urls) => {
      imageUrl.value = urls[0] ?? ''
    })
    .catch((error) => {
      console.log('cannot load the organizer image', error)
      imageUrl.value = ''
    })
})
</script>

<template>
  <div v-if="organizer" class="flex flex-col items-start mt-4 gap-4">
    <h1>Organizer #{{ organizer.id }}</h1>
    <p>{{ organizer.name }}</p>
    <img
      v-if="imageUrl"
      :src="imageUrl"
      alt="organizer image"
      class="border-solid border-gray-200 border-2 rounded p-1 m-1 w-40
      hover:shadow-lg"
    />
    <p v-else>No image</p>
  </div>
</template>
