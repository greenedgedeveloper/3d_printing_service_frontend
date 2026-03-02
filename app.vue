<script setup lang="ts">
const toaster = { position: "top-right" };
</script>

<template>
  <UApp :toaster="{ position: 'top-center'}">
    <NuxtPage />
  </UApp>
</template>

