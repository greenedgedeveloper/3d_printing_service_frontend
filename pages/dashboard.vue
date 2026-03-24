<template>
  <AppLayout title="Place Order">
    <CreateOrder></CreateOrder>
  </AppLayout>
</template>

<script setup lang="ts">
import CreateOrder from '~/components/dashboard/CreateOrder.vue';

useHead({
  title: 'PrintFlow 3D',
})

</script>
