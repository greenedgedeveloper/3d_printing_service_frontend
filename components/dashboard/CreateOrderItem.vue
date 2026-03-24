<template>
    <div class="flex flex-col justify-center items-center gap-4">
        <UFormField label="Product Name" required>
            <UInput v-model="orderItemEdit.productName" placeholder="Enter product name" class="w-48"  />
        </UFormField>
        <UFormField label="Color" required>
            <USelect v-model="orderItemEdit.color" :items="['Black', 'White']" class="w-48" />
        </UFormField>
        <UFormField label="Material" required>
            <USelect v-model="orderItemEdit.material" :items="['PLA', 'ABS']" class="w-48" />
        </UFormField>
        <UFormField label="Quantity" required>
            <UInputNumber :min="1" :max="1000" v-model="orderItemEdit.quantity" class="w-48" />
        </UFormField>
        <UFormField label="Description" hint="Optional">
            <UTextarea v-model="orderItemEdit.description" placeholder="Write any extra details here." class="w-48"  />
        </UFormField>

        <UButton :loading="addToOrderLoading" size="xl" @click="addToOrder">Add to Order</UButton>
    </div>
</template>

<script setup lang="ts">
const props = defineProps(["modelUrl"])
const emits = defineEmits(['onSaved'])

const addToOrderLoading = ref(false);

const orderItemEdit = reactive({
    productName: "",
    description: "",
    color: "",
    material: "",
    quantity: 1,
})

const toast = useToast();
const addToOrder = async () => {
    try {
        addToOrderLoading.value = true;
        const payload = {
            ...orderItemEdit, modelUrl: props.modelUrl,
        }

        const response = await $fetch('/api/order/save-order-item', {
            method: 'POST',
            body: payload
        }) as any

        console.log(response)

        if (response.isSuccessful) {
            // await getPendingOrderItems();
            emits("onSaved")
        }
    } catch (e: any) {
        console.log(e)
        toast.add({
            title: "An error occurred",
            description: e.message,
            color: "error"
        })
    } finally {
        addToOrderLoading.value = false;
    }
}
</script>