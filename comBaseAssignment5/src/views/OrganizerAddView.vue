<script setup lang="ts">
import type { Organizer as OrganizerType } from '@/types'
import { ref } from 'vue'
import OrganizerService from '@/services/OrganizerService';
import { useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/message';

const organizer = ref<OrganizerType>({
  id: null,
  organizer: ''
})
const router = useRouter()
const store = useMessageStore()
function saveOrganizer() {
    OrganizerService.saveOrganizer(organizer.value)
    .then((response) => {
        router.push({ name: 'organizer-detail-view', params: { id: response.data.id}})
        store.updateMessage('You are successfully add a new organizer name is  ' + response.data.organizer)
          setTimeout(() => {
            store.resetMessage()
          }, 3000)
      })
    .catch(() => {
        router.push({ name: 'network-error-view'})
    })
}
</script>

<template>
  <div>
    <h1>Create an organizer</h1>

    <form @submit.prevent="saveOrganizer">
      <h3>Name of your Organizer</h3>
      <label class="block text-gray-500 font-bold">Name</label>
      <input
        v-model="organizer.organizer"
        type="text"
        placeholder="Name"
        class="h-13 w-full px-2.5 text-xl border border-gray-400 focus:border-emerald-500 focus : outline-none mb-6"
      />
      <button
        class="flex w-fit mx-auto items-center justify-center h-13 px-10 rounded-md font-semibold whitespace-nowrap border border-gray-400 focus : border-emerald-500 transition-all duration-200 ease-linear hover: scale-105 hover: border-emerald-500 hover: shadow-lg active: scale-100 focus : outline-none"
        type="submit"
      >
        Submit
      </button>
    </form>

    <pre>{{ organizer }}</pre>
  </div>
</template>
