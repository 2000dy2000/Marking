<script setup lang="ts">
const { top } = withDefaults(defineProps<{
  top: number
  loading: boolean
}>(), {
  top: 0,
  loading: false,
})
</script>

<template>
  <div>
    <div
      v-show="loading" class="fixed top-0 bottom-0 left-0 right-0 bg-white z-999"
      :style="{ top: `${top}px` }"
    >
      <div class="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center gap-2">
        <u-loading-icon mode="circle" text=""></u-loading-icon>
        <span class="loading-animation">加载中...</span>
      </div>
    </div>
  </div>
</template>
