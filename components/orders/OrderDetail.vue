<template>
    <div>
<!--      {{order}}-->
      <div>
         <OrderChat :order="order"></OrderChat>
      </div>
    </div>
</template>

<script setup lang="ts">
import OrderChat from "~/components/orders/OrderChat.vue";

const params = useRoute().params;

const order = ref({})
const getOrderLoading = ref(false)

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