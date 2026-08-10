<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/vue'
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'
const store = useMessageStore()
const { message } = storeToRefs(store)
// import HelloWorld from './components/EventCard.vue/index.js'

import { ref } from 'vue'

const pageSize = ref(3)

</script>

<template>
  <div class="flex flex-col items-center w-full font-sans text-gray-700 antialiased">
    <header>
      <div id="flashMessage" class="animate-fade" v-if="message">
        <h4 class="text-xl font-bold">{{ message }}</h4>
      </div>
      <h1>Deploy with Vercel</h1>
      <div class="wrapper flex flex-col items-center">
        <nav class="py-6">
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500"
          :to="{ name: 'event-list-view' }">Event</RouterLink> |
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500"
          :to="{ name: 'about' }">About</RouterLink>
        </nav>

        <div class="page-size">
          <span>Page Size: </span>
          <button class="mx-2" @click="pageSize = 1">1</button>
          <button class="mx-2" @click="pageSize = 2">2</button>
          <button class="mx-2" @click="pageSize = 3">3</button>
          <button class="mx-2" @click="pageSize = 4">4</button>
        </div>

      </div>
    </header>
    <RouterView :page-size="pageSize" />
  </div>
  <SpeedInsights />
</template>

<style>
/* 
#layout {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} 

nav {
  padding: 30px;
} 

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} 

h2 {
  font-size: 20px;
}

.page-size button {
  margin: 0 4px;
}

@keyframes yellowFade {
  from {
    background-color: yellow;
  }
  to {
    background-color: transparent;
  }
} 

#flashMessage {
  animation: yellowFade 3s ease-in-out;
} */
</style>