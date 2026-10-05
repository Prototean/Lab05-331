<script setup lang="ts">
import type { Organizer } from '@/types'

defineProps<{
  organizer: Organizer
  imageUrl?: string
}>()
</script>

<template>
  <div class="flex justify-center">
    <RouterLink class="no-underline text-[#2c3e50]" :to="{ name: 'organizer-detail-view', params: { id: organizer.id }}">
      <div class="p-[20px] w-[250px] cursor-pointer border border-[#39495c] mb-[18px] hover:scale-[1.01] hover:shadow-sp transition-transform">
        <h2 class="text-[18px] font-bold">{{ organizer.name }}</h2>
        <img
          v-if="imageUrl"
          :src="imageUrl"
          alt="organizer image"
          class="border-solid border-gray-200 border-2 rounded p-1 m-1 w-40
          hover:shadow-lg"/>
        <span v-else>No image</span>
      </div>
    </RouterLink>
  </div>
</template>
