<template>
  <div>
    <div v-if="getOrderItemsLoading" class="text-center">
      <UProgress ></UProgress>
    </div>
    <div v-else class="flex flex-wrap gap-4">
      <div v-for="item in orderItems" :key="item.id" class="bg-white dark:bg-gray-900 shadow-xl rounded-lg">
         <OrderItemView :order-item="item"></OrderItemView>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import AttachmentPreview from "~/components/dashboard/AttachmentPreview.vue";
import OrderItemView from "~/components/orders/OrderItemView.vue";

const props = defineProps(['orderId'])

const orderItems = ref([] as Array<any>)
const getOrderItemsLoading = ref(false)

const getOrderItems = async () => {
  try {
    getOrderItemsLoading.value = true

    const response = await $fetch('/api/order/get-order-items-by-orderId', {
      method: 'GET',
      query: {orderId: props.orderId}
    }) as any;

    if(response.isSuccessful) {
      orderItems.value = response.data
    }

  } catch (error: any) {
    console.error(error)
    alert(`Error getting order items: ${error.message}`)
  } finally {
    getOrderItemsLoading.value = false
  }
}

onMounted(() => {
  getOrderItems();
})

</script>
<style scoped>

</style>