<template>
    <div>
<!--      {{order}}-->
      <div v-if="getOrderLoading" class="px-6 py-8">
        <div class="text-center py-6">Loading...</div>
        <UProgress />
      </div>
      <div v-else-if="order.id">
        <div class="lg:hidden bg-white dark:bg-gray-900 p-4 rounded-lg my-4">
          <div class="">
            <div @click="()=>{showDetails=!showDetails}" class="flex items-center cursor-pointer">
              <UIcon :name="showDetails ? `i-lucide-chevron-down` : 'i-lucide-chevron-up'" class="size-5"></UIcon>
              <span class="font-bold">Details</span>
            </div>
          </div>
          <div v-show="showDetails" class="pt-4">
            <OrderSideDetail :order="order"></OrderSideDetail>
            <div class="mt-8">Order Items</div>
            <OrderItemsList :order-id="order.id"></OrderItemsList>
          </div>
        </div>

        <div class="max-w-6xl mx-auto h-[calc(100vh-8rem)] lg:h-[calc(100vh-12rem)] flex flex-col lg:flex-row gap-6 lg:gap-8 transition-colors duration-300">
         <OrderChat :order="order"></OrderChat>
          <!-- Context Sidebar -->
          <div class="hidden lg:block lg:w-80 space-y-6">
            <OrderSideDetail :order="order" ></OrderSideDetail>
            <OrdersOrderItemsList :order-id="order.id" ></OrdersOrderItemsList>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import OrderChat from "~/components/orders/OrderChat.vue";
import OrderSideDetail from "~/components/orders/OrderSideDetail.vue";
import OrderItemsList from "~/components/orders/OrderItemsList.vue";
import CreateDesignOrder from "~/components/dashboard/CreateDesignOrder.vue";

const params = useRoute().params;

const order = ref({} as any)
const getOrderLoading = ref(false)

const showDetails = ref(false)

console.log(params)

const toast = useToast();

const getOrderById = async ()=>{
  try {
    getOrderLoading.value = true;
    const response = await $fetch(`/api/order/by-id?id=${params.id}`) as any;
    if(response.isSuccessful) {
      order.value = response.data;
    }
    console.log(response)
  } catch (e: any) {
    console.log(e)
    toast.add({
      title: "An error occurred",
      description: e.message,
      color: "error"
    })
  } finally {
    getOrderLoading.value = false;
  }
}

onMounted(()=>{
  getOrderById();
})
</script>