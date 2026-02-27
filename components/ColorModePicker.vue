<template>
  <div class="flex items-center gap-1 bg-secondary-100 dark:bg-secondary-800 p-1 rounded-xl border border-secondary-200 dark:border-secondary-700">
    <UButton 
      v-for="mode in modes" 
      :key="mode.id"
      @click="colorMode.preference = mode.id"
      variant="ghost"
      square
      size="sm"
      class="rounded-lg transition-all relative group"
      :color="colorMode.preference === mode.id ? 'primary' : 'secondary'"
      :class="colorMode.preference === mode.id ? 'bg-white dark:bg-secondary-700 shadow-sm' : ''"
      :title="mode.name"
    >
      <component :is="mode.icon" class="w-4 h-4" />
      <span class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-secondary-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {{ mode.name }}
      </span>
    </UButton>
  </div>
</template>

<script setup lang="ts">
import { Sun, Moon, Monitor } from 'lucide-vue-next';

const colorMode = useColorMode();

const modes = [
  { id: 'light', name: 'Light', icon: Sun },
  { id: 'dark', name: 'Dark', icon: Moon },
  { id: 'system', name: 'System', icon: Monitor }
];
</script>
