<template>
  <AppLayout title="Orders">
    <div class="max-w-7xl mx-auto grid lg:grid-cols-4 gap-8 transition-colors duration-300">
      <!-- Orders List -->
      <div class="lg:col-span-3 space-y-6">
        <div class="bg-white dark:bg-secondary-900 rounded-3xl border border-secondary-200 dark:border-secondary-800 overflow-hidden shadow-sm">
          <div class="p-4 lg:p-8 border-b border-secondary-100 dark:border-secondary-800">
            <h2 class="text-xl lg:text-2xl font-bold mb-6 lg:mb-8 dark:text-white">Orders</h2>
            <div class="flex flex-col lg:flex-row lg:items-center gap-4">
              <div class="relative flex-1">
                <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400 dark:text-secondary-500" />
                <input type="text" placeholder="Search orders..." class="w-full pl-12 pr-4 py-3 bg-secondary-50 dark:bg-secondary-800 border border-secondary-100 dark:border-secondary-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:text-white" />
              </div>
              <div class="flex overflow-x-auto gap-2 pb-2 lg:pb-0 scrollbar-hide">
                <UButton 
                  v-for="f in filters" 
                  :key="f" 
                  @click="activeFilter = f" 
                  size="xs" 
                  class="whitespace-nowrap rounded-lg font-bold"
                  :variant="activeFilter === f ? 'solid' : 'soft'"
                  :color="activeFilter === f ? 'primary' : 'secondary'"
                >
                  {{ f }}
                </UButton>
              </div>
              <div class="flex gap-2">
                <UButton 
                  variant="outline" 
                  color="secondary" 
                  size="xs" 
                  class="flex-1 lg:flex-none rounded-lg font-bold"
                  icon="i-lucide-download"
                >
                  Export
                </UButton>
              </div>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left min-w-[800px] lg:min-w-0">
              <thead>
                <tr class="bg-secondary-50 dark:bg-secondary-800/50 text-[10px] font-bold text-secondary-400 dark:text-secondary-500 uppercase tracking-widest">
                  <th class="px-6 lg:px-8 py-4">Order #</th>
                  <th class="px-6 lg:px-8 py-4 hidden sm:table-cell">Date</th>
                  <th class="px-6 lg:px-8 py-4">Customer</th>
                  <th class="px-6 lg:px-8 py-4 hidden md:table-cell">Model Name</th>
                  <th class="px-6 lg:px-8 py-4">Total</th>
                  <th class="px-6 lg:px-8 py-4">Status</th>
                  <th class="px-6 lg:px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-secondary-50 dark:divide-secondary-800">
                <tr v-for="order in orders" :key="order.id" @click="selectedOrder = order" class="hover:bg-secondary-50 dark:hover:bg-secondary-800/50 cursor-pointer transition-colors group" :class="{ 'bg-primary-50/50 dark:bg-primary-900/10': selectedOrder?.id === order.id }">
                  <td class="px-6 lg:px-8 py-6 font-bold text-sm text-primary-600 dark:text-primary-400">{{ order.order_number }}</td>
                  <td class="px-6 lg:px-8 py-6 text-sm text-secondary-500 dark:text-secondary-400 hidden sm:table-cell">{{ order.date }}</td>
                  <td class="px-6 lg:px-8 py-6 text-sm font-medium dark:text-secondary-200">{{ order.customer }}</td>
                  <td class="px-6 lg:px-8 py-6 text-sm text-secondary-500 dark:text-secondary-400 hidden md:table-cell">{{ order.model_name }}</td>
                  <td class="px-6 lg:px-8 py-6 text-sm font-bold text-secondary-900 dark:text-white">${{ order.total.toFixed(2) }}</td>
                  <td class="px-6 lg:px-8 py-6">
                    <span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" :class="statusClass(order.status)">
                      {{ order.status }}
                    </span>
                  </td>
                  <td class="px-6 lg:px-8 py-6 text-right">
                    <UButton 
                      variant="ghost" 
                      color="secondary" 
                      square 
                      icon="i-lucide-arrow-right" 
                      class="group-hover:text-primary-600 dark:group-hover:text-primary-400"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="p-6 lg:p-8 border-t border-secondary-50 dark:border-secondary-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-secondary-400 dark:text-secondary-500">
            <span>Showing 5 of 10 orders</span>
            <div class="flex gap-2 w-full sm:w-auto">
              <UButton 
                variant="outline" 
                color="secondary" 
                size="xs" 
                class="flex-1 sm:flex-none rounded-lg font-bold"
                icon="i-lucide-chevron-left"
                disabled
              >
                Previous
              </UButton>
              <UButton 
                variant="outline" 
                color="secondary" 
                size="xs" 
                class="flex-1 sm:flex-none rounded-lg font-bold"
                trailing-icon="i-lucide-chevron-right"
              >
                Next
              </UButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Details Sidebar -->
      <div class="space-y-6">
        <div v-if="selectedOrder" class="bg-white dark:bg-secondary-900 rounded-3xl border border-secondary-200 dark:border-secondary-800 p-6 lg:p-8 shadow-sm space-y-8">
          <h3 class="text-lg font-bold dark:text-white">Order Details</h3>
          
          <div class="space-y-6">
            <h4 class="text-[10px] font-bold text-secondary-400 dark:text-secondary-500 uppercase tracking-widest">Summary</h4>
            <div class="space-y-3">
              <div class="flex justify-between text-xs">
                <span class="text-secondary-400 dark:text-secondary-500">Order ID</span>
                <span class="font-bold dark:text-white">{{ selectedOrder.order_number }}</span>
              </div>
              <div class="flex justify-between text-xs">
                <span class="text-secondary-400 dark:text-secondary-500">Date</span>
                <span class="font-bold dark:text-white">{{ selectedOrder.date }}</span>
              </div>
              <div class="flex justify-between text-xs">
                <span class="text-secondary-400 dark:text-secondary-500">Customer</span>
                <span class="font-bold dark:text-white">{{ selectedOrder.customer }}</span>
              </div>
              <div class="flex justify-between text-xs">
                <span class="text-secondary-400 dark:text-secondary-500">Address</span>
                <span class="font-bold text-right dark:text-white">76 Main St, Anytown, CA 90210, USA</span>
              </div>
              <div class="flex justify-between text-xs">
                <span class="text-secondary-400 dark:text-secondary-500">Status</span>
                <span class="font-bold text-primary-600 dark:text-primary-400">{{ selectedOrder.status }}</span>
              </div>
              <div class="flex justify-between text-sm pt-3 border-t border-secondary-50 dark:border-secondary-800">
                <span class="font-bold dark:text-secondary-300">Total</span>
                <span class="font-bold text-primary-600 dark:text-primary-400">${{ selectedOrder.total.toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <h4 class="text-[10px] font-bold text-secondary-400 dark:text-secondary-500 uppercase tracking-widest">Items (3)</h4>
            <div class="space-y-4">
              <div v-for="i in 2" :key="i" class="flex items-center gap-4">
                <div class="w-10 h-10 bg-secondary-50 dark:bg-secondary-800 rounded-lg flex items-center justify-center">
                  <Headphones class="w-5 h-5 text-secondary-400 dark:text-secondary-500" />
                </div>
                <div class="flex-1">
                  <p class="text-xs font-bold dark:text-white">Noise-Cancelling Headphones</p>
                  <p class="text-[10px] text-secondary-400 dark:text-secondary-500">1 x $200.00</p>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <h4 class="text-[10px] font-bold text-secondary-400 dark:text-secondary-500 uppercase tracking-widest">Tracking</h4>
            <div class="flex justify-between text-xs">
              <span class="text-secondary-400 dark:text-secondary-500">Tracking #</span>
              <span class="font-bold dark:text-white">TRK-S2X6LXSX</span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="text-secondary-400 dark:text-secondary-500">Status</span>
              <span class="font-bold text-primary-600 dark:text-primary-400">{{ selectedOrder.status }}</span>
            </div>
          </div>

          <div class="space-y-6">
            <h4 class="text-[10px] font-bold text-secondary-400 dark:text-secondary-500 uppercase tracking-widest">Payment Status</h4>
            <div class="flex justify-between items-center">
              <span class="text-xs text-secondary-400 dark:text-secondary-500">Status</span>
              <span class="px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-[10px] font-bold uppercase tracking-wider">Paid</span>
            </div>
          </div>

          <UButton 
            block 
            size="xl" 
            class="rounded-2xl font-bold"
            icon="i-lucide-message-square"
            @click="navigateTo('/chat')"
          >
            Contact Support
          </UButton>
        </div>
        <div v-else class="bg-secondary-50 dark:bg-secondary-900/50 rounded-3xl border border-dashed border-secondary-200 dark:border-secondary-800 p-12 text-center">
          <p class="text-sm text-secondary-400 dark:text-secondary-500">Select an order to view details</p>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { Search, Download, XCircle, ArrowRight, ChevronLeft, ChevronRight, Headphones, MessageSquare } from 'lucide-vue-next';

const filters = ['all', 'pending', 'processing', 'shipped', 'completed', 'cancelled'];
const activeFilter = ref('all');
const selectedOrder = ref<any>(null);

const { data: ordersData } = await useFetch('/api/orders');
const orders = computed(() => ordersData.value || []);

const statusClass = (status: string) => {
  switch (status) {
    case 'processing': return 'bg-blue-50 text-blue-600';
    case 'shipped': return 'bg-indigo-50 text-indigo-600';
    case 'completed': return 'bg-green-50 text-green-600';
    case 'cancelled': return 'bg-red-50 text-red-600';
    default: return 'bg-slate-50 text-slate-600';
  }
};

onMounted(() => {
  if (orders.value.length > 0) {
    selectedOrder.value = orders.value[0];
  }
});
</script>
