<script setup lang="ts">
// const props = withDefaults (
withDefaults (
    defineProps<{
        resource: string
    }>(),
    {
        resource: 'page'
    }
)
</script>

<template>
    <h1>Oops!</h1>
    <h3 class="text-lg font-medium">The page you're looking for is not here.</h3>
    <h3 class="text-lg font-medium">The {{ resource }} page you're looking for is not here.</h3>
    <router-link class="text-blue-600 hover:underline" :to="{ name: 'event-list-view' }">Back to the home page</router-link>
</template>
