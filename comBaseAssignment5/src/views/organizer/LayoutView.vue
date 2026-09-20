<script setup lang="ts">
  import { useOrganizerStore } from '@/stores/organizer'
  import { storeToRefs } from 'pinia'

  const store = useOrganizerStore()
  const { organizer } = storeToRefs(store)

</script>

<template>
  <div v-if="organizer">
    <RouterView :organizer="organizer" />
  </div>
</template>
