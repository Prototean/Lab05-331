<script setup lang="ts">
  import EventCard from '@/components/EventCard.vue'
  import EventInfo from '@/components/EventInfo.vue'
  import type { Event } from '@/types'
  import { ref, onMounted, computed, watchEffect } from 'vue'
  import EventService from '@/services/EventService'
  import BaseInput from '@/components/BaseInput.vue'
  // import '../assets/main.css'
   import { useRouter } from 'vue-router'

   const router = useRouter()

  const events = ref<Event[] | null>(null)

  const totalEvents = ref<number>(0)

  const hasNextPage = computed (() => {
    const totalPages = Math.ceil(totalEvents.value / props.pageSize)
    return page.value < totalPages 
  })

  const props = defineProps({
    page: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      default: 3
    }
  })

  const page = computed(() => props.page)

  onMounted(() => {
    watchEffect(() => {
      EventService.getEvents(props.pageSize, page.value)
        .then((response) => {
          events.value = response.data
          totalEvents.value = response.headers['x-total-count']
        })
        .catch ((error) => {
          console.error('There was an error!', error)
        })
    })
  })
const keyword = ref('')
function updateKeyword() {
  let queryFunction;
  if (keyword.value === ''){
    queryFunction = EventService.getEvents(3, page.value)
  } else{
    queryFunction = EventService.getEventByKeyword(keyword.value, 3,page.value)
  }
  queryFunction.then((response) => {
    events.value = response.data
    console.log('event',events.value)
    totalEvents.value = response.headers['x-total-count']
    console.log('totalEvent',totalEvents.value)
  }).catch(() =>{
    router.push({ name: 'network-error-view'})
  })
}
</script>

<template>

  <h1>Event For Good</h1>
  <main class="flex flex-col items-center">
    <div class="w-64">
          <BaseInput
          v-model="keyword"
          label="Search..."
          @input="updateKeyword"
          class="w-full"
          />
    </div>
    <EventCard v-for="(event, index) in events" :key="event.id ?? index" :event="event" />
    <EventInfo v-for="(event, index) in events" :key="event.id ?? index" :event="event" />
    <div class="flex w-[290px]">
      <RouterLink
        class="flex-1 text-left no-underline text-[#2c3e50]"
        :to="{ name: 'event-list-view', query: { page: page - 1} }"
        rel="prev"
        v-if="page != 1"
        >&#60; | Prev Page | </RouterLink>

      <RouterLink
        class="flex-1 text-right no-underline text-[#2c3e50]"
        :to="{name: 'event-list-view', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        > | Next Page | &#62;</RouterLink>
    </div>
  </main>
</template>

<style scoped>
/* .events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
} */
</style>