<script setup lang="ts">
  import { ref, toRefs, watchEffect } from 'vue'
  import { type Event } from '@/types'
  import EventService from '@/services/EventService'

  const props = defineProps<{
    event: Event
  }>()

  const { event } = toRefs(props)

  const imageUrls = ref<string[]>([])

  watchEffect(() => {
    const images = event.value.images
    if (!images || images.length === 0) {
      imageUrls.value = []
      return
    }
    EventService.getEventImages(images)
      .then((urls) => {
        imageUrls.value = urls
      })
      .catch((error) => {
        console.log('cannot load the event images', error)
        imageUrls.value = []
      })
  })
</script>

<template>
  <div class="flex flex-col items-start mt-4 gap-4">
    <p>{{ event.title }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
      <div class="flex flex-row flex-warp justify-center">
        <img
        v-for="image in imageUrls"
        :key="image"
        :src="image"
        alt="events image"
        class="border-solid border-gray-200 border-2 rounded p-1 m-1 w-40
        hover:shadow-lg"/>
      </div>
  </div>
</template>
