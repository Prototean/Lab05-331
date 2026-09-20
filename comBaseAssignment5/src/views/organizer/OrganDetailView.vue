<script setup lang="ts">
  import { toRefs } from 'vue'
  import { type Organizer } from '@/types'

  const props = defineProps<{
    organizer: Organizer
  }>()

  const { organizer } = toRefs(props)


</script>

<template>
  <div class="flex flex-col items-center mt-4 gap-2">
    <h1>{{ organizer.organizer }}</h1>
    <p>Organizer ID: {{ organizer.id }}</p>
  </div>
</template>
