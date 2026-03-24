
<template>
    <div class="w-full h-full relative border-2 border-gray-500 rounded-md">
        <div class="w-full h-full" v-if="isImage">
            <img class="w-full h-full" :src="atachmentLink" />
        </div>
        <div  class="w-full h-full flex justify-center items-center" v-else>
            <UIcon name="i-lucide-paperclip"></UIcon>
        </div>
        <UButton v-if="!hideDeleteAction" @click="emits('onRemoveClick')" class="absolute top-0 right-0 bg-transparent">
            <UIcon  name="i-lucide-trash" class="size-5 text-red-400" ></UIcon>
        </UButton>
    </div>
</template>

<script setup lang="ts">

const props = defineProps(['atachmentLink', 'hideDeleteAction'])
const emits = defineEmits(['onRemoveClick'])

const isImage = computed(()=>{
    if (!props.atachmentLink) return false;

    const link = `${props.atachmentLink}`;
    if (link.endsWith('.jpg')
        || link.endsWith('.png')
        || link.endsWith('.jpeg')
        || link.endsWith('.svg')
    ) {
        return true;
    }
})
</script>