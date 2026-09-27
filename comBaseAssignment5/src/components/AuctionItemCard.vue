<script setup lang="ts">
import type { AuctionItem } from '@/types'

defineProps<{
  auctionItem: AuctionItem
}>()
</script>

<template>
  <div class="flex justify-center">
    <div class="p-[20px] w-[320px] border border-[#39495c] mb-[18px] hover:shadow-sp transition-transform">
      <h2 class="text-[18px] font-bold">{{ auctionItem.description }}</h2>
      <span>type: {{ auctionItem.type }}</span>

      <h5 class="mt-2 font-bold">Bids</h5>
      <ul v-if="auctionItem.bids.length">
        <li v-for="bid in auctionItem.bids" :key="bid.id">
          {{ bid.amount }} @ {{ bid.datetime }}
        </li>
      </ul>
      <span v-else>No bids</span>

      <h5 class="mt-2 font-bold">Successful Bid</h5>
      <span v-if="auctionItem.successfulBid">
        {{ auctionItem.successfulBid.amount }} @ {{ auctionItem.successfulBid.datetime }}
      </span>
      <span v-else>No successful bid</span>
    </div>
  </div>
</template>
