

<template>
 <div>
    <div class="bg-white dark:bg-gray-900 p-4 rounded-lg my-4">
        <div class="">
            <div @click="()=>{showDesignService=!showDesignService}" class="flex items-center cursor-pointer">
                <UIcon :name="showDesignService ? `i-lucide-chevron-down` : 'i-lucide-chevron-up'" class="size-5"></UIcon>
                <span class="font-bold">Request For Design Service</span>
            </div>
        </div>
        <div v-show="showDesignService" class="pt-4"> 
            <CreateDesignOrder ></CreateDesignOrder>
        </div>
    </div>
    <div class="bg-white dark:bg-gray-900 p-4 rounded-lg my-4">
        <div class="">
            <div @click="()=>{show3DPrintingService=!show3DPrintingService}" class="flex items-center cursor-pointer">
                <UIcon :name="show3DPrintingService ? `i-lucide-chevron-down` : 'i-lucide-chevron-up'" class="size-5"></UIcon>
                <span class="font-bold">Request For 3D Printing Service</span>
            </div>
        </div>
        <div v-show="show3DPrintingService" class="pt-4"> 
            <Create3DPrintingOrder ></Create3DPrintingOrder>
        </div>
    </div>
 </div>
</template>


<script setup lang="ts">
import Create3DPrintingOrder from './Create3DPrintingOrder.vue';
import CreateDesignOrder from './CreateDesignOrder.vue';

const showDesignService = ref(false)
const show3DPrintingService = ref(false)

</script>

