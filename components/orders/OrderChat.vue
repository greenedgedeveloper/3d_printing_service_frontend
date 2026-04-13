<template>

      <!-- Chat Area -->
      <div class="flex-1 bg-white dark:bg-secondary-900 rounded-3xl border border-secondary-200 dark:border-secondary-800 flex flex-col overflow-hidden shadow-sm min-h-0">
        <header class="p-4 lg:p-6 border-b border-secondary-100 dark:border-secondary-800 flex items-center justify-between">
          <div class="flex items-center gap-3 lg:gap-4">
<!--            <div class="relative">-->
<!--              <img src="https://picsum.photos/seed/emma/48/48" class="w-10 h-10 lg:w-12 lg:h-12 rounded-full" referrerPolicy="no-referrer" />-->
<!--              <div class="absolute bottom-0 right-0 w-2.5 h-2.5 lg:w-3 lg:h-3 bg-green-500 border-2 border-white dark:border-secondary-900 rounded-full"></div>-->
<!--            </div>-->
            <div>
              <h3 class="font-bold text-sm lg:text-base text-secondary-900 dark:text-white">Chat Session</h3>
              <p class="text-[10px] lg:text-xs text-secondary-500 dark:text-secondary-400">Support Online</p>
            </div>
          </div>
<!--          <div class="flex items-center gap-1 lg:gap-2">-->
<!--            <UButton color="secondary" variant="ghost" square icon="i-lucide-info" />-->
<!--            <UButton color="secondary" variant="ghost" square icon="i-lucide-more-vertical" />-->
<!--          </div>-->
        </header>

        <div class="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6 lg:space-y-8" ref="chatContainer">
          <div v-if="orderMessagesResponse.meta.currentPage < orderMessagesResponse.meta.pageCount" class="flex items-center justify-center p-4">
            <UButton :loading="getOrderMessagesLoading" :disabled="getOrderMessagesLoading" @click="getOrderMessages(orderMessagesResponse.meta.currentPage+1)">Load Older</UButton>
          </div>
          <div v-for="msg in displayMessages" :key="msg.id" class="flex gap-3 lg:gap-4" :class="{ 'flex-row-reverse': msg.senderId == userId }">
            <img v-if="msg.senderId != userId" src="https://picsum.photos/seed/emma/40/40" class="w-8 h-8 lg:w-10 lg:h-10 rounded-full shrink-0" referrerPolicy="no-referrer" />
            <div class="max-w-[85%] lg:max-w-[70%] space-y-1">
              <div class="flex items-center gap-2" :class="{ 'flex-row-reverse': msg.senderId == userId }">
                <span class="font-bold text-[10px] lg:text-xs dark:text-secondary-300">{{ msg.senderName }}</span>
                <span class="text-[9px] lg:text-[10px] text-secondary-400 dark:text-secondary-500">{{ msg.createdAt }}</span>
              </div>
              <div 
                class="p-3 lg:p-4 rounded-2xl text-xs lg:text-sm leading-relaxed shadow-sm"
                :class="msg.senderId === userId ? 'bg-primary-600 text-white rounded-tr-none' : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-200 rounded-tl-none'"
              >
                {{ msg.message }}
                <div v-if="msg.attachments && msg.attachments.length > 0" class="flex gap-4 mb-4">
                  <div v-for="item in msg.attachments" :key="item" class="w-[4em] h-[4em]">
                    <AttachmentPreview hide-delete-action="true" :atachment-link="item" @on-remove-click="handRemoveAttachment(item)">
                    </AttachmentPreview>
                  </div>
                </div>
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

          <div v-if="order.totalAmount > 0 && !order.isPaid "
               class="flex justify-between gap-4 mb-4 scrollbar-hide bg-secondary/20 rounded-2xl p-4 flex-wrap">
            <div class="text-sm">Congrats! Your order has been approved. Kindly pay now to start the process.</div>
            <PaymentAction :order="order" @completed="emits('paymentCompleted')" />
          </div>

          <div class="flex gap-4 mb-4">
            <div v-for="item in attachmentList" :key="item" class="w-[4em] h-[4em]">
              <AttachmentPreview  :atachment-link="item" @on-remove-click="handRemoveAttachment(item)">
              </AttachmentPreview>
            </div>
          </div>
          <form @submit.prevent="sendMessage" class="flex items-center gap-2 lg:gap-4">
            <input type="file" ref="fileInput" @change="handleFileSelect" class="hidden"
                   accept=".jpg, .jpeg, .pdf, .png, .webp, .stl,.obj,.3mf" />
            <UButton 
              type="button" 
              variant="ghost" 
              color="secondary" 
              square 
              icon="i-lucide-paperclip" 
              class="text-secondary-400 dark:text-secondary-500"
              @click="fileInput?.click()"
              :loading="uploadFileLoading"
              :disabled="uploadFileLoading"
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
</template>

<script setup lang="ts">
import { Box, Info, MoreVertical, Send, Paperclip, ChevronRight, ExternalLink } from 'lucide-vue-next';
import OrderSideDetail from "~/components/orders/OrderSideDetail.vue";
import AttachmentPreview from "~/components/dashboard/AttachmentPreview.vue";
import PaymentAction from "~/components/orders/PaymentAction.vue"

const props = defineProps<{
  order: any;
}>()

const emits = defineEmits(['paymentCompleted'])

const newMessage = ref('');

const chatContainer = ref<HTMLElement | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

const hints = ['What\'s the status of my order?', 'Can you provide more details on model XYZ?', 'I need help with an upload.', 'What are your support hours?', 'How do I request a quote?'];

const orderMessagesResponse = ref({data: [], meta:{perPage: 10, currentPage: 1, pageCount: 1, total: 10}});
const getOrderMessagesLoading = ref(false);
const sendMessageLoading = ref(false);

const attachmentList = ref([] as string[]);
const uploadFileLoading = ref(false);

const toast = useToast();

const messages = ref([] as Array<any>);
const displayMessages = computed(() => {
  return [...messages.value].reverse();
})

const userCookie = useCookie('auth_user');
const user = userCookie.value as any;

const userId = computed(() => user.id);

const getOrderMessages = async (pageNumber: number=1, resetMessageList=false) => {
  const perPage = 10
  try {
    getOrderMessagesLoading.value = true;
    const response = await $fetch('/api/order-message/get-order-messages', {
      query: {
        orderId: props.order.id,
        pageNumber,
        perPage,
        isDescending: true
      }
    }) as any;
    if(response.isSuccessful) {
      orderMessagesResponse.value = response;
      if(resetMessageList) {
        messages.value = response.data;
      } else {
        messages.value = [...messages.value, ...response.data];
      }
    } else {
      toast.add({
        title: 'Error',
        description: 'Something went wrong when getting order messages.',
        color: 'error',
      })
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
        attachments: attachmentList.value,
        orderId: props.order.id
      }
    }) as any;
    if (response.isSuccessful) {
      newMessage.value = '';
      attachmentList.value = [];

      await getOrderMessages(1, true);
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

let getMessagesInterval = 0;
onMounted(async() => {
  await getOrderMessages();
  scrollToBottom();

  getMessagesInterval = window.setInterval(async ()=>{
    await getOrderMessages(1, true);
  }, 5000)
});

onUnmounted(()=>{
  clearInterval(getMessagesInterval)
})

const handleFileSelect = (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  if (files && files.length > 0) {
    uploadFile(files[0] as File);
  }
};

const uploadFile = async (file: File) => {
  if (!file) return

  try {
    const base64 = await fileToBase64(file)

    uploadFileLoading.value = true;

    const response = await $fetch(`/api/file/uploadBase64`, {
      method: "POST",
      body: {
        fileName: file.name,
        base64Content: base64
      }
    }) as any;

    console.log({ response })

    if (response.isSuccessful) {
      attachmentList.value.push(response.data);
      toast.add({
        title: "Model file uploaded",
        description: "Your model has been uploaded successfully",
        color: 'success'
      })
    }
  } catch (e: any) {
    toast.add({
      title: "An error occurred during upload",
      description: e.message,
      color: 'error'
    })
  } finally {
    uploadFileLoading.value = false;
  }
}

const handRemoveAttachment = (itemToRemove: any) => {
  attachmentList.value = attachmentList.value.filter(item => {
    return item != itemToRemove;
  })
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = () => {
      const result = reader.result as string

      // remove "data:...;base64,"
      const base64 = result.split(",")[1] as any

      resolve(base64)
    }

    reader.onerror = error => reject(error)
  })
}
</script>
