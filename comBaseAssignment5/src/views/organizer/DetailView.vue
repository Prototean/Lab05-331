<script setup lang="ts">
  import { useOrganizerStore } from '@/stores/organizer'
  import { storeToRefs } from 'pinia'

  const store = useOrganizerStore()
  const { organizer } = storeToRefs(store)

</script>

<template>
  <div v-if="organizer" class="flex flex-col items-center mt-4 gap-2">
    <h1>{{ organizer.name }}</h1>
    <p>Organizer ID: {{ organizer.id }}</p>
  </div>
</template>
