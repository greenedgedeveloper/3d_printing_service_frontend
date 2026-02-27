<template>
  <AppLayout :title="model?.name || 'Model Detail'">
    <div v-if="model" class="grid lg:grid-cols-3 gap-6 lg:gap-8">
      <!-- Left: 3D Preview -->
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm relative aspect-[4/3] sm:aspect-video">
          <img :src="model.preview_url" alt="3D Preview" class="w-full h-full object-cover" referrerPolicy="no-referrer" />
          
          <!-- View Controls -->
          <div class="absolute top-4 right-4 flex flex-col gap-2">
            <button class="bg-white/90 backdrop-blur px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg text-[10px] lg:text-xs font-bold shadow-sm hover:bg-white">Top</button>
            <button class="bg-white/90 backdrop-blur px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg text-[10px] lg:text-xs font-bold shadow-sm hover:bg-white">Front</button>
            <button class="bg-white/90 backdrop-blur px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg text-[10px] lg:text-xs font-bold shadow-sm hover:bg-white">ISO</button>
          </div>

          <!-- Interaction Bar -->
          <div class="absolute bottom-4 lg:bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur p-1.5 lg:p-2 rounded-xl lg:rounded-2xl shadow-xl border border-slate-200 flex items-center gap-2 lg:gap-4">
            <button class="p-1.5 lg:p-2 hover:bg-slate-100 rounded-lg"><RotateCcw class="w-4 h-4 lg:w-5 lg:h-5 text-slate-600" /></button>
            <button class="p-1.5 lg:p-2 hover:bg-slate-100 rounded-lg"><Hand class="w-4 h-4 lg:w-5 lg:h-5 text-slate-600" /></button>
            <button class="p-1.5 lg:p-2 hover:bg-slate-100 rounded-lg"><Search class="w-4 h-4 lg:w-5 lg:h-5 text-slate-600" /></button>
            <div class="w-px h-5 lg:h-6 bg-slate-200"></div>
            <button class="p-1.5 lg:p-2 hover:bg-slate-100 rounded-lg"><Scale class="w-4 h-4 lg:w-5 lg:h-5 text-slate-600" /></button>
          </div>
        </div>

        <div class="flex flex-wrap gap-2 lg:gap-3">
          <span class="px-3 lg:px-4 py-1.5 lg:py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] lg:text-xs font-bold">STL File</span>
          <span class="px-3 lg:px-4 py-1.5 lg:py-2 bg-slate-100 text-slate-600 rounded-full text-[10px] lg:text-xs font-bold">Industrial Grade</span>
          <span class="px-3 lg:px-4 py-1.5 lg:py-2 bg-green-50 text-green-600 rounded-full text-[10px] lg:text-xs font-bold">Verified Geometry</span>
        </div>

        <!-- Printability Analysis -->
        <div class="bg-white rounded-3xl border border-slate-200 p-6 lg:p-8">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-base lg:text-lg font-bold">Printability Analysis</h3>
            <ChevronDown class="w-5 h-5 text-slate-400" />
          </div>
          <div class="space-y-4">
            <div class="p-4 bg-red-50 border border-red-100 rounded-2xl flex gap-3 lg:gap-4">
              <AlertCircle class="w-5 h-5 lg:w-6 lg:h-6 text-red-500 shrink-0" />
              <div>
                <p class="font-bold text-red-900 text-xs lg:text-sm">Thin Walls Detected</p>
                <p class="text-[10px] lg:text-xs text-red-700 leading-relaxed">Minimum wall thickness (0.8mm) detected in outer gears. Consider increasing for durability.</p>
              </div>
            </div>
            <div class="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3 lg:gap-4">
              <Info class="w-5 h-5 lg:w-6 lg:h-6 text-blue-500 shrink-0" />
              <div>
                <p class="font-bold text-blue-900 text-xs lg:text-sm">Supports Recommended</p>
                <p class="text-[10px] lg:text-xs text-blue-700 leading-relaxed">Overhangs > 45° identified. Auto-supports required for central axle.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Annotations -->
        <div class="bg-white rounded-3xl border border-slate-200 p-6 lg:p-8">
          <h3 class="text-base lg:text-lg font-bold mb-6">Annotations & Comments (2)</h3>
          <div class="space-y-6">
            <div class="flex gap-3 lg:gap-4">
              <img src="https://picsum.photos/seed/alice/40/40" class="w-8 h-8 lg:w-10 lg:h-10 rounded-full" referrerPolicy="no-referrer" />
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="font-bold text-xs lg:text-sm">Alice Smith</span>
                  <span class="text-[9px] lg:text-[10px] text-slate-400">2 hours ago</span>
                </div>
                <p class="text-xs lg:text-sm text-slate-600">Consider adding a fillet to the sharp edges for better aesthetics and printability.</p>
              </div>
            </div>
            <div class="flex gap-3 lg:gap-4">
              <img src="https://picsum.photos/seed/bob/40/40" class="w-8 h-8 lg:w-10 lg:h-10 rounded-full" referrerPolicy="no-referrer" />
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="font-bold text-xs lg:text-sm">Bob Johnson</span>
                  <span class="text-[9px] lg:text-[10px] text-slate-400">1 hour ago</span>
                </div>
                <p class="text-xs lg:text-sm text-slate-600">The tolerance for the mating parts seems a bit tight, recommend increasing it by 0.1mm.</p>
              </div>
            </div>
          </div>
          <div class="mt-8 flex flex-col sm:flex-row gap-3 lg:gap-4">
            <input type="text" placeholder="Add a comment..." class="flex-1 px-4 py-2.5 lg:py-3 rounded-xl border border-slate-200 text-xs lg:text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            <button class="bg-slate-900 text-white px-6 py-2.5 lg:py-3 rounded-xl font-bold text-xs lg:text-sm hover:bg-slate-800">Post</button>
          </div>
        </div>
      </div>

      <!-- Right: Estimates & Options -->
      <div class="space-y-6">
        <div class="bg-white rounded-3xl border border-slate-200 p-6 lg:p-8 shadow-sm">
          <div class="flex items-center gap-2 mb-6 text-blue-600">
            <Box class="w-5 h-5" />
            <h3 class="font-bold text-sm lg:text-base">Print Estimates</h3>
          </div>
          <div class="grid grid-cols-2 gap-6 lg:gap-8 mb-8">
            <div>
              <p class="text-[9px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Volume</p>
              <p class="text-base lg:text-lg font-bold">{{ model.volume }}</p>
            </div>
            <div>
              <p class="text-[9px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Layer Height</p>
              <p class="text-base lg:text-lg font-bold">0.2 mm</p>
            </div>
          </div>
          <div class="pt-6 border-t border-slate-100 flex items-end justify-between">
            <div>
              <p class="text-[9px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Estimated Cost</p>
              <p class="text-2xl lg:text-3xl font-bold text-blue-600">$50.00</p>
            </div>
            <div class="text-right">
              <p class="text-[9px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Print Time</p>
              <p class="text-sm lg:text-base font-bold">8h 30m</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-3xl border border-slate-200 p-6 lg:p-8">
          <h3 class="font-bold text-sm lg:text-base mb-6">Material Variants</h3>
          <div class="grid grid-cols-5 gap-2 mb-8">
            <div v-for="i in 5" :key="i" class="aspect-square rounded-xl bg-slate-100 border-2 transition-all cursor-pointer" :class="i === 1 ? 'border-blue-500' : 'border-transparent hover:border-slate-200'">
              <img :src="`https://picsum.photos/seed/mat${i}/64/64`" class="w-full h-full object-cover rounded-lg" referrerPolicy="no-referrer" />
            </div>
          </div>
          <div class="space-y-3">
            <button @click="navigateTo('/chat')" class="w-full bg-blue-600 text-white py-3 lg:py-4 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 text-xs lg:text-sm">
              <MessageSquare class="w-4 h-4 lg:w-5 lg:h-5" /> Request Service
            </button>
            <button @click="navigateTo('/checkout')" class="w-full bg-white border border-slate-200 text-slate-900 py-3 lg:py-4 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-xs lg:text-sm">
              <ShoppingCart class="w-4 h-4 lg:w-5 lg:h-5" /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { Box, RotateCcw, Hand, Search, Scale, ChevronDown, AlertCircle, Info, MessageSquare, ShoppingCart } from 'lucide-vue-next';

const route = useRoute();
const { data: models } = await useFetch('/api/models');
const model = computed(() => models.value?.find((m: any) => m.id == route.params.id));
</script>
