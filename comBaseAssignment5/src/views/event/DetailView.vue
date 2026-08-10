<script setup lang="ts">
  import { toRefs } from 'vue'
  import { type Event } from '@/types'

  const props = defineProps<{
    event: Event
  }>()

  const { event } = toRefs(props)

</script>

<template>
  <div class="flex flex-col items-start mt-4 gap-4">
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>
