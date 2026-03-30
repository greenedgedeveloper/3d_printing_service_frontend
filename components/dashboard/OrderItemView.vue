<template>
    <div
        class="bg-white dark:bg-secondary-900 rounded-2xl border border-secondary-200 dark:border-secondary-800
        overflow-hidden group hover:shadow-lg transition-all">
        <div class="aspect-video bg-secondary-100 dark:bg-secondary-800 relative overflow-hidden">
            <img :src="model.preview_url" :alt="model.productName"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer" />
        </div>
        <div class="p-5">
            <h3 class="font-bold text-secondary-900 dark:text-white mb-1 truncate">{{ model.productName }}</h3>
            <div class="flex items-center gap-4 text-xs text-secondary-500 dark:text-secondary-400 mb-4">
                <span class="flex items-center gap-1">
                    <Calendar class="w-3 h-3" /> {{ model.updatedAt }}
                </span>

            </div>
            <div class="flex items-center gap-2 mb-6 p-2 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
                <Box class="w-4 h-4 text-primary-600 dark:text-primary-400" />
                <span class="text-xs font-medium text-secondary-700 dark:text-secondary-300">Material: {{
                    model.material }}</span>
            </div>
            <div class="text-center">
                <!-- <UButton variant="outline" color="secondary" size="xs"
                                class="rounded-lg font-bold justify-center" icon="i-lucide-pen"
                                @click="navigateTo(`/model/${model.id}`)">
                                Edit
                            </UButton> -->
                <UButton variant="outline" color="secondary" size="xs" class="rounded-lg font-bold justify-center"
                    icon="i-lucide-minus" @click="removeAction(model.id)" :loading="removeOrderItemLoading"
                    :disabled="removeOrderItemLoading">
                    Remove
                </UButton>
            </div>
            <!-- <UButton block size="xs" class="mt-2 rounded-lg font-bold" icon="i-lucide-shopping-cart"
                            @click="navigateTo('/checkout')">
                            Remove
            </UButton> -->
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps(['model'])
const emits = defineEmits(['onRemoveCompleted'])

const removeOrderItemLoading = ref(false)

const toast = useToast();
async function removeAction(id: number) {
    try {
        console.log(id)
        removeOrderItemLoading.value = true;
        const response = await $fetch('/api/order/remove-order-item', {
            method:'POST',
            body: {id }
        }) as any
        if(response.isSuccessful == true) {
            emits("onRemoveCompleted") 
            // await getPendingOrderItems();
        }
    } catch(e: any) {
        toast.add({
            title: "An error occurred.",
            description: e.message,
            color: "error"
        })
    } finally {
        removeOrderItemLoading.value = false;
    }
}
</script>"