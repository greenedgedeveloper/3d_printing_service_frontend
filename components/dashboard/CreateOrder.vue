<template>
  <div>
    <div class="mb-8 lg:mb-12">
      <h2 class="text-lg font-bold mb-4 dark:text-white">Upload New Model</h2>
      <div 
        @dragover.prevent="isDragging = true" 
        @dragleave.prevent="isDragging = false" 
        @drop.prevent="handleDrop"
        class="border-2 border-dashed rounded-3xl p-6 lg:p-12 flex flex-col items-center justify-center transition-all"
        :class="isDragging ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-secondary-200 dark:border-secondary-800 bg-white dark:bg-secondary-900'"
      >
        <div class="w-12 h-12 lg:w-16 lg:h-16 bg-secondary-50 dark:bg-secondary-800 rounded-2xl flex items-center justify-center mb-6">
          <UploadCloud class="w-6 h-6 lg:w-8 lg:h-8 text-secondary-400 dark:text-secondary-500" />
        </div>
        <p class="text-base lg:text-lg font-semibold text-secondary-900 dark:text-white mb-2 text-center">Drag & drop your 3D model files here</p>
        <p class="text-xs lg:text-sm text-secondary-500 dark:text-secondary-400 mb-8 text-center">Supported formats: STL, OBJ, 3MF (Max 50MB)</p>
        <input type="file" ref="fileInput" @change="handleFileSelect" class="hidden" accept=".stl,.obj,.3mf" />
        <UButton 
          size="lg" 
          class="w-full sm:w-auto px-8 rounded-xl font-bold"
          @click="fileInput?.click()"
        >
          Choose Files
        </UButton>
      </div>
    </div>

    <!-- Models Grid -->
    <div>
      <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h2 class="text-lg font-bold dark:text-white">My Models</h2>
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div class="relative flex-1 sm:flex-none">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400 dark:text-secondary-500" />
            <input type="text" placeholder="Search your models..." class="w-full sm:w-64 pl-10 pr-4 py-2 bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-800 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:text-white" />
          </div>
          <UButton 
            variant="outline" 
            color="secondary" 
            class="rounded-lg font-medium"
            icon="i-lucide-filter"
          >
            Filter
          </UButton>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="model in models" :key="model.id" class="bg-white dark:bg-secondary-900 rounded-2xl border border-secondary-200 dark:border-secondary-800 overflow-hidden group hover:shadow-lg transition-all">
          <div class="aspect-square bg-secondary-100 dark:bg-secondary-800 relative overflow-hidden">
            <img :src="model.preview_url" :alt="model.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
            <div class="absolute top-4 right-4">
              <span 
                class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                :class="{
                  'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400': model.status === 'Printable',
                  'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400': model.status === 'Review Needed',
                  'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400': model.status === 'Issue Detected'
                }"
              >
                {{ model.status }}
              </span>
            </div>
          </div>
          <div class="p-5">
            <h3 class="font-bold text-secondary-900 dark:text-white mb-1 truncate">{{ model.name }}</h3>
            <div class="flex items-center gap-4 text-xs text-secondary-500 dark:text-secondary-400 mb-4">
              <span class="flex items-center gap-1"><Calendar class="w-3 h-3" /> {{ model.upload_date }}</span>
              <span class="flex items-center gap-1"><Database class="w-3 h-3" /> {{ model.file_size }}</span>
            </div>
            <div class="flex items-center gap-2 mb-6 p-2 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
              <Box class="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <span class="text-xs font-medium text-secondary-700 dark:text-secondary-300">Material: {{ model.material }}</span>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <UButton 
                variant="outline" 
                color="secondary" 
                size="xs" 
                class="rounded-lg font-bold justify-center"
                icon="i-lucide-eye"
                @click="navigateTo(`/model/${model.id}`)"
              >
                Preview
              </UButton>
              <UButton 
                variant="outline" 
                color="secondary" 
                size="xs" 
                class="rounded-lg font-bold justify-center"
                icon="i-lucide-message-square"
                @click="navigateTo('/chat')"
              >
                Request
              </UButton>
            </div>
            <UButton 
              block 
              size="xs" 
              class="mt-2 rounded-lg font-bold"
              icon="i-lucide-shopping-cart"
              @click="navigateTo('/checkout')"
            >
              Add to Cart
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UploadCloud, Search, Filter, Calendar, Database, Box, Eye, MessageSquare, ShoppingCart } from 'lucide-vue-next';

const isDragging = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

const { data: models, refresh } = await useFetch('/api/models');

const handleDrop = (e: DragEvent) => {
  isDragging.value = false;
  const files = e.dataTransfer?.files;
  if (files && files.length > 0) {
    uploadFile(files[0] as File);
  }
};

const handleFileSelect = (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  if (files && files.length > 0) {
    uploadFile(files[0] as File);
  }
};

const uploadFile = async (file: File) => {
  try {
    const newModel = {
      name: file.name,
      file_size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
      material: 'PLA White',
      volume: '250 cm³',
      preview_url: `https://picsum.photos/seed/${Math.random()}/400/400`
    };
    await $fetch('/api/models', {
      method: 'POST',
      body: newModel
    });
    refresh();
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};
</script>
