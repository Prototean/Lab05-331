<script setup lang="ts">
import AuctionItemCard from '@/components/AuctionItemCard.vue'
import BaseInput from '@/components/BaseInput.vue'
import type { AuctionItem } from '@/types'
import { ref, computed, onMounted, watchEffect } from 'vue'
import AuctionItemService from '@/services/AuctionItemService'
import { useRouter } from 'vue-router'

const router = useRouter()

const auctionItems = ref<AuctionItem[] | null>(null)
const allTypes = ref<string[]>([])

const description = ref('')
const type = ref('')

const noItemFound = computed(() => auctionItems.value !== null && auctionItems.value.length === 0)

onMounted(() => {
  AuctionItemService.getAuctionItems()
    .then((response) => {
      allTypes.value = [...new Set(response.data.map((item: AuctionItem) => item.type))] as string[]
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })

  watchEffect(() => {
    updateSearch()
  })
})

// keeps a slow response from an older keystroke from overwriting a newer result
let latestRequest = 0

function updateSearch() {
  const currentRequest = ++latestRequest
  let queryFunction
  if (description.value === '' && type.value === '') {
    queryFunction = AuctionItemService.getAuctionItems()
  } else {
    queryFunction = AuctionItemService.getAuctionItemsBySearch(description.value, type.value)
  }
  queryFunction
    .then((response) => {
      if (currentRequest !== latestRequest) return
      auctionItems.value = response.data
      console.log('auctionItems', auctionItems.value)
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
}
</script>

<template>
  <h1>Auction Items</h1>
  <main class="flex flex-col items-center">
    <div class="w-64 flex flex-col items-center">
      <BaseInput
        v-model="description"
        label="Search by description..."
        class="w-full"
      />
      <label class="block text-gray-500 font-bold">Type</label>
      <div class="relative w-full mb-6 mx-auto">
        <select
          class="h-13 w-full pl-2.5 pr-6 text-xl algin-middle appearance-none rounded-none
          border border-gray-400 focus:border-emerald-500 focus:outline-none"
          v-model="type"
        >
          <option value="">All types</option>
          <option v-for="option in allTypes" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
        <svg
          class="pointer-event-none absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2.5 fill-gray-700"
          viewBox="0 0 4 5"
        >
          <path d="M2 0L0 2h4zm0 5L0 3h4z" />
        </svg>
      </div>
    </div>

    <AuctionItemCard
      v-for="(auctionItem, index) in auctionItems"
      :key="auctionItem.id ?? index"
      :auction-item="auctionItem"
    />
    <p v-if="noItemFound" class="font-bold">No auction items found</p>
  </main>
</template>
