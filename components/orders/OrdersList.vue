<template>
    <div class="max-w-7xl mx-auto grid lg:grid-cols-4 gap-8 transition-colors duration-300">
      <!-- Orders List -->
      <div class="lg:col-span-4 space-y-6">
        <div class="bg-white dark:bg-secondary-900 rounded-3xl border border-secondary-200 dark:border-secondary-800 overflow-hidden shadow-sm">
          <div class="p-4 lg:p-8 border-b border-secondary-100 dark:border-secondary-800">
            <h2 class="text-xl lg:text-2xl font-bold mb-6 lg:mb-8 dark:text-white">Orders</h2>
            <div class="flex flex-col lg:flex-row lg:items-center gap-4">
<!--              <div class="relative flex-1">-->
<!--                <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400 dark:text-secondary-500" />-->
<!--                <input type="text" placeholder="Search order..." class="w-full pl-12 pr-4 py-3 bg-secondary-50 dark:bg-secondary-800 border border-secondary-100 dark:border-secondary-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:text-white" />-->
<!--              </div>-->
              <div class="flex overflow-x-auto gap-2 pb-2 lg:pb-0 scrollbar-hide " style="max-width: calc(100vw - 5rem);">
                <UButton
                    v-for="f in filters"
                    :key="f"
                    @click="()=>{activeFilter = f; getOrders();}"
                    size="xs"
                    class="whitespace-nowrap rounded-lg font-bold"
                    :variant="activeFilter === f ? 'solid' : 'soft'"
                    :color="activeFilter === f ? 'primary' : 'secondary'"
                >
                  {{ f }}
                </UButton>
              </div>
<!--              <div class="flex gap-2">-->
<!--                <UButton-->
<!--                    variant="outline"-->
<!--                    color="secondary"-->
<!--                    size="xs"-->
<!--                    class="flex-1 lg:flex-none rounded-lg font-bold"-->
<!--                    icon="i-lucide-download"-->
<!--                >-->
<!--                  Export-->
<!--                </UButton>-->
<!--              </div>-->
            </div>
          </div>

          <div class="overflow-x-auto scrollbar-hide" style="max-width: calc(100vw - 2rem);">
<!--            <div v-if="getOrderListLoading" class="px-6 py-8">-->
<!--              <UProgress />-->
<!--            </div>-->
<!--            {{orderListResponse}}-->
            <UTable :loading="getOrderListLoading" :data="orderListResponse.data" :columns="columns" @select="(event, row)=>{onSelectOrder(event, row)}">

            </UTable>
          </div>

          <div class="p-6 lg:p-8 border-t border-secondary-50 dark:border-secondary-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-secondary-400 dark:text-secondary-500">
            <span>Total: {{orderListResponse.meta.total}}</span>
            <span>[Showing page {{orderListResponse.meta.currentPage}} of {{orderListResponse.meta.pageCount}}]</span>

            <div class="flex gap-2 sm:w-auto">
              <UButton
                  variant="outline"
                  color="secondary"
                  size="xs"
                  class="flex-1 sm:flex-none rounded-lg font-bold"
                  icon="i-lucide-chevron-left"
                  :disabled="orderListResponse.meta.currentPage === 1"
                  @click="getOrders(orderListResponse.meta.currentPage - 1)"
              >
                Previous
              </UButton>
              <UButton
                  variant="outline"
                  color="secondary"
                  size="xs"
                  class="flex-1 sm:flex-none rounded-lg font-bold"
                  trailing-icon="i-lucide-chevron-right"
                  :disabled="orderListResponse.meta.currentPage === orderListResponse.meta.pageCount"
                  @click="getOrders(orderListResponse.meta.currentPage + 1)"
              >
                Next
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { Search, Download, XCircle, ArrowRight, ChevronLeft, ChevronRight, Headphones, MessageSquare } from 'lucide-vue-next';
import type {TableColumn} from "#ui/components/Table.vue";
import {UBadge} from "#components";

const filters = ['All', 'Pending', 'InReview', 'Processing', 'Shipped', 'Completed', 'Cancelled'];
const activeFilter = ref('All');
const selectedOrder = ref<any>(null);

const orderListResponse = ref({data: [], meta:{perPage: 10, currentPage: 1, pageCount: 1, total: 10}});
const getOrderListLoading = ref(false);

// const pageMeta = ref({perPage: 10, pageNumber: 1, total: 10});

const statusClass = (status: string) => {
  switch (status) {
    case 'Processing': return 'bg-blue-50 text-blue-600';
    case 'Shipped': return 'bg-indigo-50 text-indigo-600';
    case 'Completed': return 'bg-green-50 text-green-600';
    case 'Cancelled': return 'bg-red-50 text-red-600';
    default: return 'bg-slate-50 text-slate-600';
  }
};

const toast = useToast();

const getOrders = async (pageNumber:number=1) => {
  try {
    getOrderListLoading.value = true;
    const response = await $fetch(`/api/order/orders?pageNumber=${pageNumber}&perPage=${10}&isDescending=true`, {
      query: activeFilter.value === 'All' ? undefined : {
        'filters[Status]':  activeFilter.value,
      }
    });
    if(response.isSuccessful) {
      orderListResponse.value = response;
    }

    getOrderListLoading.value = false;
  } catch (error) {
    console.error('Error fetching order:', error);
    getOrderListLoading.value = false;
    toast.add({
      title: 'Error',
      description: 'Failed to fetch order. Please try again later.',
      color: 'error',
    });
  }
}

const columns: TableColumn<any>[] = [
  {
    accessorKey: 'orderInstruction',
    header: 'Order Description',
    cell: ({ row }) => truncate(row.getValue('orderInstruction'), 50)
  },

  {
    accessorKey: 'status',
    header: 'Status',
    // cell: ({ row }) => row.getValue('status')
    cell: ({row})=>{
      return h(UBadge, { class: statusClass(row.getValue('status')), variant: 'subtle', }, () =>
          row.getValue('status'))
    }
  },

  {
    accessorKey: 'orderType',
    header: 'Order Type',
    cell: ({ row }) => row.getValue('orderType')
  },

  {
    accessorKey: 'id',
    header: 'Order ID',
    cell: ({ row }) => `${row.getValue('id')}`
  },

  {
    accessorKey: 'createdAt',
    header: 'Order Date',
    cell: ({ row }) => {
      const dateTime = new Date(row.getValue('createdAt'))
      return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`
    }
  }
]

const onSelectOrder = (event: any, row: any) => {
  // console.log('Selected order:', row, event);
  selectedOrder.value = row;
  const orderId = row.getValue('id');
  // console.log('Selected order ID:', orderId);
  navigateTo(`/order/${orderId}`);
}

onMounted(async () => {
  await getOrders();
});

const truncate = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
}
</script>
