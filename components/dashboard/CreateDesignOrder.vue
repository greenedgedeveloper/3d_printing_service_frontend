<template>
    <div>
        <div class="grid md:grid-cols-2">
            <UFormField label="Description" class="w-full p-4">
                <UTextarea v-model="orderInstruction" placeholder="Kindly discribe your design here" class="w-full"></UTextarea>
            </UFormField>
            <div class="p-4">

                <div class="text-center">
                    <div class="flex gap-4 mb-4">
                        <div v-for="item in attachmentList" :key="item" class="w-[4em] h-[4em]">
                            <AttachmentPreview :atachment-link="item" @on-remove-click="handRemoveAttachment(item)">
                            </AttachmentPreview>
                        </div>
                    </div>

                    <template v-if="!uploadFileLoading">
                        <div>Add descriptive files (Images, PDFs, 3D models, etc)</div>
                        <input type="file" ref="fileInput" @change="handleFileSelect" class="hidden"
                            accept=".jpg, .jpeg, .pdf, .png, .stl,.obj,.3mf" />
                        <UButton size="lg" class="w-auto px-8 rounded-xl font-bold my-2" @click="fileInput?.click()">
                            Choose Files
                        </UButton>
                    </template>
                    <div v-if="uploadFileLoading" class="px-6 py-8">
                        <div class="text-center py-6">Uploading...</div>
                        <UProgress />
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center">
            <UButton :loading="sendRequestOrderLoading" :disabled="sendRequestOrderLoading || !orderInstruction" size="xl" class="w-auto px-8 rounded-xl font-bold" @click="sendOrderRequestAction">
                   Send Request
                </UButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import AttachmentPreview from './AttachmentPreview.vue';

const orderInstruction = ref('')

const attachmentList = ref([] as Array<any>)
const uploadFileLoading = ref(false)

const sendRequestOrderLoading = ref(false)

const fileInput = ref<HTMLInputElement | null>(null);


const handleFileSelect = (e: Event) => {
    const files = (e.target as HTMLInputElement).files;
    if (files && files.length > 0) {
        uploadFile(files[0] as File);
    }
};

const handRemoveAttachment = (itemToRemove: any) => {
    attachmentList.value = attachmentList.value.filter(item => {
        return item != itemToRemove;
    })
}

const toast = useToast();
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

/**     
 *      public string OrderType { get; set; } = OrderTypes.PrintOrder;
        public string? OrderInstruction { get; set; }
        public List<string> Attachments { get; set; } = [];
        public Guid UserId { get; set; }
        
        public bool AddPendingOrderItems { get; set; }
 */

const sendOrderRequestAction = async () => {
  if(!orderInstruction.value.trim()){
    toast.add({
      title: "Please enter an instruction",
      description: "Please enter an instruction before sending request",
      color: 'warning'
    })
    return;
  }
    try {
        sendRequestOrderLoading.value = true;

        const payload = {
            orderType: 'DesignService',
            orderInstruction: orderInstruction.value,
            attachments: attachmentList.value,
            addPendingOrderItems: false
        }

        const response = await $fetch('/api/order/create-order', {
            method: 'POST',
            body: payload
        }) as any

        if(response.isSuccessful) {
            toast.add({
                title: "Success",
                description: 'Order request has been sent successfully. We will get back to you',
                color: 'success'
            })

            attachmentList.value = [];
            orderInstruction.value = ''
            navigateTo("/orders")
        }
    } catch(e: any) {
        
    } finally {
        sendRequestOrderLoading.value = false;
    }
}
</script>