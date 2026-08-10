<template>
  <div class="networkError">
    <h1>Uh-Oh!</h1>

    <h3 class="text-lg font-medium">
      It looks like you're experiencing some network issues, please take a breath and
      <a class="underline text-blue-600 hover:text-blue-800" href="#" @click="$router.go(-1)">click here</a> to try again.
    </h3>
  </div>
</template>