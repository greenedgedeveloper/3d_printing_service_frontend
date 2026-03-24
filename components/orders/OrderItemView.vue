<template>
  <div class="p-4">
    <div class="w-full h-[4em]">
      <AttachmentPreview :hide-delete-action="true" :atachment-link="orderItem.modelUrl" ></AttachmentPreview>
    </div>
    <div>
      <div class="flex justify-between text-xs">
        <span class="text-secondary-400 dark:text-secondary-500">Name:</span>
        <span class="font-bold text-primary-600 dark:text-primary-400">{{orderItem.productName}}</span>
      </div>
      <div class="flex justify-between text-xs">
        <span class="text-secondary-400 dark:text-secondary-500">Material:</span>
        <span class="font-bold text-primary-600 dark:text-primary-400">{{orderItem.material}}</span>
      </div>
      <div class="flex justify-between text-xs">
        <span class="text-secondary-400 dark:text-secondary-500">Color:</span>
        <span class="font-bold text-primary-600 dark:text-primary-400">{{orderItem.color}}</span>
      </div>
      <div class="flex justify-between text-xs">
        <span class="text-secondary-400 dark:text-secondary-500">Description:</span>
        <span class="font-bold text-primary-600 dark:text-primary-400">{{orderItem.description}}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

import AttachmentPreview from "~/components/dashboard/AttachmentPreview.vue";

const props = defineProps(["orderItem"])
</script>
<style scoped>

</style>