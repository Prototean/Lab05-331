<script setup lang="ts">
  import { toRefs } from 'vue'
  import { type Event } from '@/types'
  import { useRouter } from 'vue-router';
  import { useMessageStore } from '@/stores/message'

  const props = defineProps<{
    event: Event
  }>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { event } = toRefs(props)
  const router = useRouter()
  const store = useMessageStore()
  const register = () => {
  store.updateMessage(`You are successfully registered for the ${props.event.title}!`)
  setTimeout(() => {
    store.resetMessage()
  }, 3000)
    router.push({ name: 'event-detail-view', params: { id: props.event.id }})
  }
</script>

<template>
  <div class="flex flex-col items-start mt-4 gap-4">
    <p>Register event here</p>
    <button class="px-3 py-1 border border-black rounded" @click="register">Register</button>
  </div> 
</template>