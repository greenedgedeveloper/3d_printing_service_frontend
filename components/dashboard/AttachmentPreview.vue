<template>
  <!-- Thumbnail card -->
  <div
      class="group relative w-full h-full rounded-lg border border-neutral-700 bg-neutral-900 overflow-hidden cursor-pointer transition-all duration-200 hover:border-neutral-500 hover:shadow-lg hover:shadow-black/40"
      @click="openLightbox"
  >
    <!-- Image thumbnail -->
    <img
        v-if="isImage"
        :src="attachmentLink"
        class="w-full h-full object-cover"
        draggable="false"
    />

    <!-- Non-image thumbnail -->
    <div v-else class="w-full h-full flex flex-col items-center justify-center gap-1.5 text-neutral-500">
      <component :is="fileIcon" :size="28" :stroke-width="1.5" />
      <span class="text-[10px] font-mono uppercase tracking-widest">{{ fileExtension }}</span>
    </div>

    <!-- Hover zoom hint -->
    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
      <ZoomIn :size="22" class="text-white drop-shadow" />
    </div>

    <!-- Delete button -->
    <UButton
        v-if="!hideDeleteAction"
        icon
        size="xs"
        variant="ghost"
        class="absolute top-1 right-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
        @click.stop="emit('onRemoveClick')"
        aria-label="Remove attachment"
    >
      <Trash2 :size="14" :stroke-width="1.75" />
    </UButton>
  </div>

  <!-- Lightbox modal -->
  <UModal
      v-model:open="lightboxOpen"
      fullscreen
      :ui="{
      overlay: 'bg-black/90 backdrop-blur-md',
      content: 'bg-neutral-950 border border-neutral-800 shadow-2xl rounded-xl overflow-hidden',
      wrapper: 'flex items-center justify-center p-4 sm:p-8',
    }"
  >
    <template #content>
      <div class="flex flex-col w-[90vw] max-w-5xl max-h-[90vh]">

        <!-- Header -->
        <div class="flex items-center justify-between px-4 py-2.5 border-b border-neutral-800 bg-neutral-950 shrink-0">
          <div class="flex items-center gap-2 min-w-0">
            <component :is="fileIcon" :size="14" class="text-neutral-500 shrink-0" />
            <span class="text-xs font-mono text-neutral-400 truncate">{{ fileName }}</span>
          </div>
          <div class="flex items-center gap-1 shrink-0 ml-4">
            <UTooltip text="Download">
              <UButton
                  icon
                  size="xs"
                  variant="ghost"
                  class="text-neutral-400 hover:text-white"
                  :as="'a'"
                  :href="attachmentLink"
                  target="_blank"
                  download
                  @click.stop
              >
                <Download :size="15" />
              </UButton>
            </UTooltip>
            <UTooltip text="Open in new tab">
              <UButton
                  icon
                  size="xs"
                  variant="ghost"
                  class="text-neutral-400 hover:text-white"
                  :as="'a'"
                  :href="attachmentLink"
                  target="_blank"
                  @click.stop
              >
                <ExternalLink :size="15" />
              </UButton>
            </UTooltip>
            <div class="w-px h-4 bg-neutral-700 mx-1" />
            <UButton
                icon
                size="xs"
                variant="ghost"
                class="text-neutral-400 hover:text-white"
                @click="closeLightbox"
            >
              <X :size="15" />
            </UButton>
          </div>
        </div>

        <!-- Image viewer -->
        <div
            v-if="isImage"
            class="relative flex-1 overflow-hidden flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_#1f1f1f_0%,_#0a0a0a_100%)]"
            style="min-height: 300px;"
            @wheel.prevent="onWheel"
            @mousedown="startDrag"
        >
          <img
              :src="attachmentLink"
              class="select-none pointer-events-none max-w-full max-h-full object-contain"
              :style="imageTransformStyle"
              draggable="false"
          />

          <!-- Zoom controls -->
          <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-neutral-900/80 border border-neutral-700 rounded-full px-3 py-1 backdrop-blur-sm">
            <UButton icon size="xs" variant="ghost" class="text-neutral-400 hover:text-white" @click.stop="zoomBy(-0.2)">
              <ZoomOut :size="14" />
            </UButton>
            <span class="text-[11px] font-mono text-neutral-400 w-10 text-center tabular-nums">
              {{ Math.round(scale * 100) }}%
            </span>
            <UButton icon size="xs" variant="ghost" class="text-neutral-400 hover:text-white" @click.stop="zoomBy(0.2)">
              <ZoomIn :size="14" />
            </UButton>
            <div class="w-px h-3 bg-neutral-700 mx-0.5" />
            <UButton icon size="xs" variant="ghost" class="text-neutral-400 hover:text-white" @click.stop="resetTransform">
              <RotateCcw :size="13" />
            </UButton>
          </div>
        </div>

        <!-- 3D / generic file viewer -->
        <div
            v-else
            class="flex-1 flex flex-col items-center justify-center gap-4 bg-[radial-gradient(ellipse_at_center,_#1a1a1a_0%,_#0a0a0a_100%)] p-12"
            style="min-height: 300px;"
        >
          <div class="w-20 h-20 rounded-2xl bg-neutral-800 border border-neutral-700 flex items-center justify-center">
            <component :is="fileIcon" :size="36" class="text-neutral-400" :stroke-width="1.25" />
          </div>
          <div class="text-center">
            <p class="text-sm font-mono text-neutral-300 uppercase tracking-wider">{{ fileExtension }} File</p>
            <p v-if="is3DFile" class="text-xs text-neutral-600 mt-1">3D preview unavailable in browser</p>
          </div>
          <UButton
              variant="outline"
              size="sm"
              class="text-neutral-300 border-neutral-600 hover:border-neutral-400 mt-2"
              :as="'a'"
              :href="attachmentLink"
              target="_blank"
              download
          >
            <Download :size="14" class="mr-1.5" />
            Download File
          </UButton>
        </div>

      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import {
  Paperclip,
  Box,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  ExternalLink,
  X,
  Trash2,
  Image as ImageIcon,
} from 'lucide-vue-next'

// ── Props & emits ────────────────────────────────────────────────────────────

const props = defineProps<{
  attachmentLink?: string
  hideDeleteAction?: boolean
}>()

const emit = defineEmits<{
  onRemoveClick: []
}>()

// ── File type helpers ────────────────────────────────────────────────────────

const fileExtension = computed(() => {
  if (!props.attachmentLink) return ''
  const parts = props.attachmentLink.split('.') as any
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : ''
})

const fileName = computed(() => {
  if (!props.attachmentLink) return ''
  return props.attachmentLink.split('/').pop() ?? props.attachmentLink
})

const isImage = computed(() =>
    ['jpg', 'jpeg', 'png', 'svg', 'gif', 'webp', 'bmp', 'avif'].includes(fileExtension.value)
)

const is3DFile = computed(() =>
    ['stl', 'obj', '3mf', 'glb', 'gltf', 'ply', 'fbx'].includes(fileExtension.value)
)

const fileIcon = computed(() => {
  if (isImage.value) return ImageIcon
  if (is3DFile.value) return Box
  return Paperclip
})

// ── Lightbox ─────────────────────────────────────────────────────────────────

const lightboxOpen = ref(false)

function openLightbox() {
  lightboxOpen.value = true
  resetTransform()
}

function closeLightbox() {
  lightboxOpen.value = false
}

// ── Pan & zoom ───────────────────────────────────────────────────────────────

const scale = ref(1)
const translateX = ref(0)
const translateY = ref(0)
const isDragging = ref(false)
const dragOrigin = ref({ x: 0, y: 0 })

const imageTransformStyle = computed(() => ({
  transform: `translate(${translateX.value}px, ${translateY.value}px) scale(${scale.value})`,
  cursor: isDragging.value ? 'grabbing' : 'grab',
  transition: isDragging.value ? 'none' : 'transform 0.12s ease',
  willChange: 'transform',
}))

function zoomBy(delta: number) {
  scale.value = Math.min(6, Math.max(0.15, scale.value + delta))
}

function onWheel(e: WheelEvent) {
  zoomBy(e.deltaY < 0 ? 0.15 : -0.15)
}

function resetTransform() {
  scale.value = 1
  translateX.value = 0
  translateY.value = 0
}

function startDrag(e: MouseEvent) {
  isDragging.value = true
  dragOrigin.value = {
    x: e.clientX - translateX.value,
    y: e.clientY - translateY.value,
  }
  window.addEventListener('mousemove', onDrag)
  window.addEventListener('mouseup', stopDrag)
}

function onDrag(e: MouseEvent) {
  if (!isDragging.value) return
  translateX.value = e.clientX - dragOrigin.value.x
  translateY.value = e.clientY - dragOrigin.value.y
}

function stopDrag() {
  isDragging.value = false
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
}

onUnmounted(() => {
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
})
</script>