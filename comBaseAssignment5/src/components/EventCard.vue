<script setup lang="ts">
import type {Event} from '@/types'

defineProps<{
  event: Event
}>()
</script>

<template>
  <div class="flex justify-center">
    <RouterLink class="no-underline text-[#2c3e50]" :to="{ name: 'event-detail-view', params: { id: event.id}}">
      <div class="p-[20px] w-[250px] cursor-pointer border border-[#39495c] mb-[18px] hover:scale-[1.01] hover:shadow-sp transition-transform">
        <h2 class="text-[18px] font-bold">{{ event.title }}</h2>
        <span>@{{ event.time }} on {{ event.date }}</span>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
  /* .event-class {
    display: flex;
    justify-content: center;
  }

  .event-card {
    padding: 20px;
    width: 250px;
    cursor: pointer;
    border: 1px solid #39495c;
    margin-bottom: 18px;
    margin-inline: auto;
  }

  .event-card:hover {
    transform: scale(1.01);
    box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
  }

  .event-link {
    text-decoration: none;
    color: #2c3e50;
  } */
</style>