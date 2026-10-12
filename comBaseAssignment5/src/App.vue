<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/vue'
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { useAuthStore } from './stores/auth'
import { storeToRefs } from 'pinia'
// import { inject } from '@vercel/analytics'
import { useRouter } from 'vue-router'
const store = useMessageStore()
const authStore = useAuthStore()
const router = useRouter()
const { message } = storeToRefs(store)
// import HelloWorld from './components/EventCard.vue/index.js'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccount, mdiAccountPlus, mdiLogin, mdiLogout } from '@mdi/js'

import { ref } from 'vue'

const pageSize = ref(3)

function logout() {
  authStore.Logout()
  router.push({ name: 'login'})
}

</script>

<template>
  <!-- <inject mode="production"/> -->
  <div class="flex flex-col items-center w-full font-sans text-gray-700 antialiased">
    <header>
      <div id="flashMessage" class="animate-fade" v-if="message">
        <h4 class="text-xl font-bold">{{ message }}</h4>
      </div>
      <h1>Deploy with Vercel</h1>
      <div class="wrapper flex flex-col items-center">
        <nav class="py-6">
          <nav class="flex">
            <ul v-if="!authStore.currentUserName" class="flex navbar-nav ml-auto">
              <li class="nav-item px-2">
                <router-link to="/register" class="nav-link">
                  <div class="flex items-center">
                    <SvgIcon type="mdi" :path="mdiAccountPlus" /> <span class="ml-3">Sign Up</span>
                  </div>
                </router-link>
              </li>
              <li class="nav-item px-2">
                <router-link to="/login" class="nav-link">
                  <div class="flex items-center">
                    <SvgIcon type="mdi" :path="mdiLogin" /> <span class="ml-3">Login</span>
                  </div>
                </router-link>
              </li>
            </ul>
            <ul v-if="authStore.currentUserName" class="flex navbar-nav ml-auto">
              <li class="nav-item px-2">
                <router-link to="/profile" class="nav-link">
                  <div class="flex items-center">
                    <SvgIcon type="mdi" :path="mdiAccount" />
                    <span class="ml-3">{{ authStore.currentUserName }}</span>
                  </div>
                </router-link>
              </li>
              <li class="nav-item px-2">
                <a class="nav-link hover: cursor-pointer" @click="logout">
                  <div class="flex items-center">
                    <SvgIcon type="mdi" :path="mdiLogout" /> <span class="ml-3">
                      LogOut</span>
                  </div>
                </a>
              </li>
            </ul>
          </nav>
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500"
          :to="{ name: 'event-list-view' }">Event</RouterLink> |
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500"
          :to="{ name: 'about' }">About</RouterLink> |
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500"
          :to="{ name: 'add-event' }">New Event</RouterLink> |
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500"
          :to="{ name: 'auction-item-list-view' }">Auction Items</RouterLink> |
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500"
          :to="{ name: 'organizer' }">Organizer</RouterLink> |
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500"
          :to="{ name: 'add-organizer' }">New Organizer</RouterLink>
        </nav>

        <div class="page-size">
          <span>Page Size: </span>
          <button class="mx-2 hover:cursor-pointer" @click="pageSize = 1">1</button>
          <button class="mx-2 hover:cursor-pointer" @click="pageSize = 2">2</button>
          <button class="mx-2 hover:cursor-pointer" @click="pageSize = 3">3</button>
          <button class="mx-2 hover:cursor-pointer" @click="pageSize = 4">4</button>
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