
<template>
    <div class="border-2 border-gray-300 rounded-xl min-w-[20em] min-h-[20em] flex justify-center flex-col items-center">
        <!-- {{ props.modelUrl }} -->
        <Box size="5em"></Box>
        <UButton @click="reupload">Re upload Model</UButton>
    </div>
</template>

<script setup>
import { Box } from 'lucide-vue-next';


const props = defineProps(["modelUrl"])
const emit = defineEmits("reupload")

const reupload = ()=>{
    emit("reupload")
}


</script>