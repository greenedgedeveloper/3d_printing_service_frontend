
<template>
    <div class="bg-white dark:bg-secondary-900 rounded-3xl border border-secondary-200 dark:border-secondary-800 p-6 shadow-sm">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-2 text-primary-600 dark:text-primary-400">
          <Box class="w-5 h-5" />
          <h4 class="font-bold text-sm">Active Project Context</h4>
        </div>
        <ChevronRight class="w-4 h-4 text-secondary-400 dark:text-secondary-500" />
      </div>
      <div class="flex gap-4 mb-6">
        <img src="https://picsum.photos/seed/model/80/80" class="w-20 h-20 rounded-xl object-cover" referrerPolicy="no-referrer" />
        <div>
          <h5 class="font-bold text-sm mb-1 dark:text-white">Modular Sci-Fi Corridor</h5>
          <p class="text-[10px] text-secondary-400 dark:text-secondary-500 mb-2">ID: 7890</p>
          <div class="flex items-center gap-1">
            <div class="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
            <span class="text-[10px] font-bold text-amber-600 dark:text-amber-400">Pending Texture</span>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-2">
        <UButton
            variant="outline"
            color="secondary"
            size="xs"
            class="rounded-lg font-bold justify-center"
            icon="i-lucide-external-link"
        >
          Preview
        </UButton>
        <UButton
            variant="outline"
            color="secondary"
            size="xs"
            class="rounded-lg font-bold justify-center"
        >
          Details
        </UButton>
      </div>
    </div>

    <div class="bg-white dark:bg-secondary-900 rounded-3xl border border-secondary-200 dark:border-secondary-800 p-6 shadow-sm">
      <h4 class="font-bold text-sm mb-6 dark:text-white">Associated Order</h4>
      <div class="space-y-4 mb-6">
        <div class="flex justify-between text-xs">
          <span class="text-secondary-400 dark:text-secondary-500">Order ID:</span>
          <span class="font-bold dark:text-white">ORD-2023-11223</span>
        </div>
        <div class="flex justify-between text-xs">
          <span class="text-secondary-400 dark:text-secondary-500">Status:</span>
          <span class="font-bold text-primary-600 dark:text-primary-400">Pending</span>
        </div>
        <div class="flex justify-between text-xs">
          <span class="text-secondary-400 dark:text-secondary-500">Total:</span>
          <span class="font-bold dark:text-white">$249.99</span>
        </div>
      </div>
      <UButton
          block
          variant="outline"
          color="secondary"
          size="md"
          class="rounded-xl font-bold"
          @click="navigateTo('/order')"
      >
        View Order Details
      </UButton>
    </div>
</template>

<script setup lang="ts">

import {Box, ChevronRight} from "lucide-vue-next";
</script>

<style scoped>

</style>