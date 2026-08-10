<script setup lang="ts">
  import { useEventStore } from '@/stores/event'
  import { storeToRefs } from 'pinia'

  const store = useEventStore()
  const { event } = storeToRefs(store)

</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <nav class="flex justify-center items-center gap-2">
      <RouterLink class="px-3 py-1 border border-black" :to="{ name: 'event-detail-view' }">Details</RouterLink>
      |
      <RouterLink class="px-3 py-1 border border-black" :to="{ name: 'event-register-view' }">Register</RouterLink>
      |
      <RouterLink class="px-3 py-1 border border-black" :to="{ name: 'event-edit-view' }">Edit</RouterLink>
    </nav>
    <RouterView :event="event" />
  </div>
</template>