<template>
  <div class="w-full h-full relative border-2 border-gray-500 rounded-md group cursor-pointer" @click="openLightbox">
    <!-- Thumbnail -->
    <div class="w-full h-full" v-if="isImage">
      <img class="w-full h-full object-cover rounded-md" :src="atachmentLink" />
    </div>
    <div class="w-full h-full flex flex-col gap-1 justify-center items-center" v-else>
      <v-icon :icon="fileIcon" size="28" class="text-gray-400"></v-icon>
      <span class="text-xs text-gray-400 uppercase font-mono">{{ fileExtension }}</span>
    </div>

    <!-- Hover overlay -->
    <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center pointer-events-none">
      <UIcon name="i-lucide-zoom-in" size="28" class="text-white drop-shadow"></UIcon>
    </div>


    <UButton v-if="!hideDeleteAction" @click="emits('onRemoveClick')" class="absolute top-0 right-0 bg-transparent">
      <UIcon  name="i-lucide-trash" class="size-5 text-red-400" ></UIcon>
    </UButton>
  </div>

  <!-- Lightbox Teleport -->
  <teleport to="body">
    <transition name="lightbox">
      <div
          v-if="lightboxOpen"
          class="lightbox-overlay"
          @click.self="closeLightbox"
          @keydown.esc="closeLightbox"
          tabindex="0"
          ref="overlayRef"
      >
        <div class="lightbox-container">
          <!-- Header -->
          <div class="lightbox-header">
            <span class="lightbox-filename">{{ fileName }}</span>
            <div class="lightbox-actions">
              <a :href="atachmentLink" target="_blank" download>
                <v-btn density="compact" flat icon="mdi-download-outline" class="text-gray-300 hover:text-white"></v-btn>
              </a>
              <v-btn density="compact" flat icon="mdi-close" @click="closeLightbox" class="text-gray-300 hover:text-white"></v-btn>
            </div>
          </div>

          <!-- Image Preview -->
          <div v-if="isImage" class="lightbox-content">
            <img
                :src="atachmentLink"
                class="lightbox-image"
                :style="imageTransform"
                @wheel.prevent="onWheel"
                @mousedown="startDrag"
            />
            <!-- Image controls -->
            <div class="lightbox-image-controls">
              <v-btn density="compact" flat icon="mdi-magnify-minus-outline" @click="zoom(-0.2)" class="text-gray-300"></v-btn>
              <span class="text-xs text-gray-400 font-mono w-12 text-center">{{ Math.round(scale * 100) }}%</span>
              <v-btn density="compact" flat icon="mdi-magnify-plus-outline" @click="zoom(0.2)" class="text-gray-300"></v-btn>
              <v-btn density="compact" flat icon="mdi-refresh" @click="resetTransform" class="text-gray-300 ml-2"></v-btn>
            </div>
          </div>

          <!-- 3D File Preview -->
          <div v-else-if="is3DFile" class="lightbox-content">
            <div class="lightbox-3d-placeholder">
              <v-icon :icon="fileIcon" size="64" class="text-gray-400 mb-4"></v-icon>
              <p class="text-gray-300 text-sm font-mono uppercase mb-1">{{ fileExtension }} File</p>
              <p class="text-gray-500 text-xs mb-6">3D preview not available in browser</p>
              <a :href="atachmentLink" target="_blank" download>
                <v-btn variant="outlined" class="text-gray-300 border-gray-600 hover:border-white">
                  <v-icon icon="mdi-download-outline" class="mr-2"></v-icon>
                  Download File
                </v-btn>
              </a>
            </div>
          </div>

          <!-- Generic File -->
          <div v-else class="lightbox-content">
            <div class="lightbox-3d-placeholder">
              <v-icon icon="mdi-paperclip" size="64" class="text-gray-400 mb-4"></v-icon>
              <p class="text-gray-300 text-sm font-mono uppercase mb-6">{{ fileExtension || 'File' }}</p>
              <a :href="atachmentLink" target="_blank" download>
                <v-btn variant="outlined" class="text-gray-300 border-gray-600 hover:border-white">
                  <v-icon icon="mdi-download-outline" class="mr-2"></v-icon>
                  Download File
                </v-btn>
              </a>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { computed, ref, nextTick, onUnmounted } from 'vue'

const props = defineProps(['atachmentLink', 'hideDeleteAction'])
const emits = defineEmits(['onRemoveClick'])

// ── File type detection ──────────────────────────────────────────────────────

const fileExtension = computed(() => {
  if (!props.atachmentLink) return ''
  const parts = `${props.atachmentLink}`.split('.')
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : ''
})

const fileName = computed(() => {
  if (!props.atachmentLink) return ''
  const parts = `${props.atachmentLink}`.split('/')
  return parts[parts.length - 1]
})

const isImage = computed(() =>
    ['jpg', 'jpeg', 'png', 'svg', 'gif', 'webp', 'bmp'].includes(fileExtension.value)
)

const is3DFile = computed(() =>
    ['stl', 'obj', '3mf', 'glb', 'gltf', 'ply', 'fbx'].includes(fileExtension.value)
)

const fileIcon = computed(() => {
  switch (fileExtension.value) {
    case 'stl':
    case 'obj':
    case '3mf':
    case 'glb':
    case 'gltf':
      return 'mdi-cube-outline'
    case 'pdf':
      return 'mdi-file-pdf-box'
    default:
      return 'mdi-paperclip'
  }
})

// ── Lightbox state ───────────────────────────────────────────────────────────

const lightboxOpen = ref(false)
const overlayRef = ref<HTMLElement | null>(null)

function openLightbox() {
  lightboxOpen.value = true
  resetTransform()
  nextTick(() => overlayRef.value?.focus())
}

function closeLightbox() {
  lightboxOpen.value = false
}

// ── Image pan & zoom ─────────────────────────────────────────────────────────

const scale = ref(1)
const translateX = ref(0)
const translateY = ref(0)
const isDragging = ref(false)
const dragStart = ref({ x: 0, y: 0 })

const imageTransform = computed(() => ({
  transform: `translate(${translateX.value}px, ${translateY.value}px) scale(${scale.value})`,
  cursor: isDragging.value ? 'grabbing' : 'grab',
  transition: isDragging.value ? 'none' : 'transform 0.15s ease',
}))

function zoom(delta: number) {
  scale.value = Math.min(5, Math.max(0.2, scale.value + delta))
}

function onWheel(e: WheelEvent) {
  zoom(e.deltaY < 0 ? 0.15 : -0.15)
}

function resetTransform() {
  scale.value = 1
  translateX.value = 0
  translateY.value = 0
}

function startDrag(e: MouseEvent) {
  isDragging.value = true
  dragStart.value = { x: e.clientX - translateX.value, y: e.clientY - translateY.value }
  window.addEventListener('mousemove', onDrag)
  window.addEventListener('mouseup', stopDrag)
}

function onDrag(e: MouseEvent) {
  if (!isDragging.value) return
  translateX.value = e.clientX - dragStart.value.x
  translateY.value = e.clientY - dragStart.value.y
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

<style scoped>
/* Lightbox overlay */
.lightbox-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.88);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
}

/* Lightbox container */
.lightbox-container {
  display: flex;
  flex-direction: column;
  width: 90vw;
  max-width: 1100px;
  max-height: 90vh;
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.7);
}

/* Header */
.lightbox-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: #111;
  flex-shrink: 0;
}

.lightbox-filename {
  font-family: 'JetBrains Mono', 'Fira Mono', monospace;
  font-size: 12px;
  color: #aaa;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 60%;
}

.lightbox-actions {
  display: flex;
  gap: 4px;
}

/* Content area */
.lightbox-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  min-height: 300px;
}

/* Image */
.lightbox-image {
  max-width: 100%;
  max-height: calc(90vh - 140px);
  object-fit: contain;
  user-select: none;
  -webkit-user-drag: none;
}

/* Image zoom controls */
.lightbox-image-controls {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 4px 10px;
  backdrop-filter: blur(8px);
}

/* 3D placeholder */
.lightbox-3d-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px;
  text-align: center;
}

/* Transition */
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.2s ease;
}

.lightbox-enter-active .lightbox-container,
.lightbox-leave-active .lightbox-container {
  transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

.lightbox-enter-from .lightbox-container {
  transform: scale(0.92);
  opacity: 0;
}

.lightbox-leave-to .lightbox-container {
  transform: scale(0.95);
  opacity: 0;
}
</style>