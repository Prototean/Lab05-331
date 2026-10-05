<script setup lang="ts">
import OrganizerCard from '@/components/OrganizerCard.vue'
import type { Organizer } from '@/types'
import { ref, computed, onMounted, watchEffect } from 'vue'
import OrganizerService from '@/services/OrganizerService'
import { useRouter } from 'vue-router'

const router = useRouter()

const organizers = ref<Organizer[] | null>(null)
const totalOrganizers = ref<number>(0)
// the image of an organizer is a supabase storage key, the presigned
// urls are kept here by organizer id
const imageUrls = ref<Record<number, string>>({})

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

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalOrganizers.value / props.pageSize)
  return page.value < totalPages
})

onMounted(() => {
  watchEffect(() => {
    updateOrganizers()
  })
})

function updateOrganizers() {
  OrganizerService.getOrganizersPage(props.pageSize, page.value)
    .then((response) => {
      organizers.value = response.data
      totalOrganizers.value = response.headers['x-total-count']
      updateImageUrls(response.data)
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
}

function updateImageUrls(list: Organizer[]) {
  const withImage = list.filter((organizer) => organizer.images && organizer.images.length)
  if (withImage.length === 0) {
    imageUrls.value = {}
    return
  }
  OrganizerService.getOrganizerImages(withImage.map((organizer) => organizer.images[0] as string))
    .then((urls) => {
      const output: Record<number, string> = {}
      withImage.forEach((organizer, index) => {
        output[organizer.id] = urls[index] as string
      })
      imageUrls.value = output
    })
    .catch((error) => {
      console.log('cannot load the organizer images', error)
      imageUrls.value = {}
    })
}
</script>

<template>
  <h1>Organizers</h1>
  <main class="flex flex-col items-center">
    <OrganizerCard
      v-for="organizer in organizers"
      :key="organizer.id"
      :organizer="organizer"
      :image-url="imageUrls[organizer.id]"
    />
    <div class="flex w-[290px]">
      <RouterLink
        class="flex-1 text-left no-underline text-[#2c3e50]"
        :to="{ name: 'organizer', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        >&#60; | Prev Page | </RouterLink>

      <RouterLink
        class="flex-1 text-right no-underline text-[#2c3e50]"
        :to="{ name: 'organizer', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        > | Next Page | &#62;</RouterLink>
    </div>
  </main>
</template>
