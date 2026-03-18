<template>
    <div class="max-w-6xl mx-auto h-[calc(100vh-8rem)] lg:h-[calc(100vh-12rem)] flex flex-col lg:flex-row gap-6 lg:gap-8 transition-colors duration-300">
      <!-- Chat Area -->
      <div class="flex-1 bg-white dark:bg-secondary-900 rounded-3xl border border-secondary-200 dark:border-secondary-800 flex flex-col overflow-hidden shadow-sm min-h-0">
        <header class="p-4 lg:p-6 border-b border-secondary-100 dark:border-secondary-800 flex items-center justify-between">
          <div class="flex items-center gap-3 lg:gap-4">
            <div class="relative">
              <img src="https://picsum.photos/seed/emma/48/48" class="w-10 h-10 lg:w-12 lg:h-12 rounded-full" referrerPolicy="no-referrer" />
              <div class="absolute bottom-0 right-0 w-2.5 h-2.5 lg:w-3 lg:h-3 bg-green-500 border-2 border-white dark:border-secondary-900 rounded-full"></div>
            </div>
            <div>
              <h3 class="font-bold text-sm lg:text-base text-secondary-900 dark:text-white">Agent Emma</h3>
              <p class="text-[10px] lg:text-xs text-secondary-500 dark:text-secondary-400">Support Online</p>
            </div>
          </div>
          <div class="flex items-center gap-1 lg:gap-2">
            <UButton color="secondary" variant="ghost" square icon="i-lucide-info" />
            <UButton color="secondary" variant="ghost" square icon="i-lucide-more-vertical" />
          </div>
        </header>

        <div class="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6 lg:space-y-8" ref="chatContainer">
          <div v-for="msg in messages" :key="msg.id" class="flex gap-3 lg:gap-4" :class="{ 'flex-row-reverse': msg.sender === 'You' }">
            <img v-if="msg.sender !== 'You'" src="https://picsum.photos/seed/emma/40/40" class="w-8 h-8 lg:w-10 lg:h-10 rounded-full shrink-0" referrerPolicy="no-referrer" />
            <div class="max-w-[85%] lg:max-w-[70%] space-y-1">
              <div class="flex items-center gap-2" :class="{ 'flex-row-reverse': msg.sender === 'You' }">
                <span class="font-bold text-[10px] lg:text-xs dark:text-secondary-300">{{ msg.sender }}</span>
                <span class="text-[9px] lg:text-[10px] text-secondary-400 dark:text-secondary-500">{{ msg.timestamp }}</span>
              </div>
              <div 
                class="p-3 lg:p-4 rounded-2xl text-xs lg:text-sm leading-relaxed shadow-sm"
                :class="msg.sender === 'You' ? 'bg-primary-600 text-white rounded-tr-none' : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-200 rounded-tl-none'"
              >
                {{ msg.content }}
              </div>
            </div>
          </div>
        </div>

        <footer class="p-4 lg:p-6 border-t border-secondary-100 dark:border-secondary-800">
          <div class="flex flex-nowrap overflow-x-auto gap-2 mb-4 pb-2 scrollbar-hide">
            <UButton 
              v-for="hint in hints" 
              :key="hint" 
              @click="newMessage = hint" 
              variant="soft" 
              color="secondary" 
              size="xs" 
              class="whitespace-nowrap rounded-full font-medium"
            >
              {{ hint }}
            </UButton>
          </div>
          <form @submit.prevent="sendMessage" class="flex items-center gap-2 lg:gap-4">
            <UButton 
              type="button" 
              variant="ghost" 
              color="secondary" 
              square 
              icon="i-lucide-paperclip" 
              class="text-secondary-400 dark:text-secondary-500"
            />
            <div class="flex-1 relative">
              <UTextarea
                type="text" 
                v-model="newMessage"
                placeholder="Type your message..."
                :ui="{
                  base: 'w-full px-4 lg:px-6 py-3 lg:py-4 bg-secondary-50 dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 rounded-xl lg:rounded-2xl text-xs lg:text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:text-white transition-all',
                }"
                class="w-full"
                :loading="sendMessageLoading"
              />
            </div>
            <UButton 
              type="submit" 
              size="lg" 
              square 
              icon="i-lucide-send" 
              class="rounded-xl lg:rounded-2xl shadow-lg shadow-primary-200 dark:shadow-none"
              :loading="sendMessageLoading"
            />
          </form>
        </footer>
      </div>

      <!-- Context Sidebar -->
      <div class="hidden lg:block lg:w-80 space-y-6">
        <OrderSideDetail ></OrderSideDetail>
      </div>
    </div>
</template>

<script setup lang="ts">
import { Box, Info, MoreVertical, Send, Paperclip, ChevronRight, ExternalLink } from 'lucide-vue-next';
import OrderSideDetail from "~/components/orders/OrderSideDetail.vue";

const props = defineProps<{
  order: any;
}>()

const newMessage = ref('');
const chatContainer = ref<HTMLElement | null>(null);
const hints = ['What\'s the status of my order?', 'Can you provide more details on model XYZ?', 'I need help with an upload.', 'What are your support hours?', 'How do I request a quote?'];

const orderMessagesResponse = ref({data: [], meta:{perPage: 10, currentPage: 1, pageCount: 1, total: 10}});
const getOrderMessagesLoading = ref(false);
const sendMessageLoading = ref(false);

const toast = useToast();

const getOrderMessages = async () => {
  try {
    getOrderMessagesLoading.value = true;
    const response = await $fetch('/api/order-message/get-order-messages', {
      method: 'POST',
      body: {
        orderId: props.order.id
      }
    }) as any;
    if(response.isSuccessful) {
      orderMessagesResponse.value = response;
    }
  } catch (error) {
    console.error('Error fetching order messages:', error);
    toast.add({
      title: 'Error',
      description: 'Failed to fetch order messages.',
      color: 'error',
    });
  } finally {
    getOrderMessagesLoading.value = false;
  }
}

const sendMessage = async () => {
  if (!newMessage.value.trim()) return;
  
  const content = newMessage.value;

  try {
    sendMessageLoading.value = true;
    const response = await $fetch('/api/order-message/send-message', {
      method: 'POST',
      body: {
        message: content,
        attachments: [],
        orderId: props.order.id
      }
    }) as any;
    if (response.isSuccessful) {
      newMessage.value = '';
      await getOrderMessages();
      scrollToBottom();
    } else {
      toast.add({
        title: 'Error',
        description: "Couldn't send message. " + response.message + "",
        color: 'error',
      });
    }
  } catch (error) {
    console.error('Error sending message:', error);
    toast.add({
      title: 'Error',
      description: 'Failed to send message.',
      color: 'error',
    });
  } finally {
    sendMessageLoading.value = false;
  }
};

const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
};

onMounted(() => {
  getOrderMessages();
  scrollToBottom();
});
</script>
