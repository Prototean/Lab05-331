<script setup lang="ts">
import AuctionItemCard from '@/components/AuctionItemCard.vue'
import type { AuctionItem } from '@/types'
import { ref, onMounted } from 'vue'
import AuctionItemService from '@/services/AuctionItemService'
import { useRouter } from 'vue-router'

const router = useRouter()

const auctionItems = ref<AuctionItem[] | null>(null)

onMounted(() => {
  AuctionItemService.getAuctionItems()
    .then((response) => {
      auctionItems.value = response.data
      console.log('auctionItems', auctionItems.value)
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
})
</script>

<template>
  <h1>Auction Items</h1>
  <main class="flex flex-col items-center">
    <AuctionItemCard
      v-for="(auctionItem, index) in auctionItems"
      :key="auctionItem.id ?? index"
      :auction-item="auctionItem"
    />
  </main>
</template>
