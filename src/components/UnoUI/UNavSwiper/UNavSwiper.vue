<script setup lang="ts">
const props = defineProps<{
  navList: {
    title: string
  }[]
  activeTabIndex?: number
}>()

const currentTabIndex = ref(props.activeTabIndex || 0)
const handleSwiperChange = (e) => {
  currentTabIndex.value = e.detail.current
}

watch(() => props.activeTabIndex, (val) => {
  if (val)
    currentTabIndex.value = val
})
</script>

<template>
  <div class="flex justify-center items-center w-full h-12% bg-white">
    <div class="w-60% h-70% bg-white rd-50 max-h-14" style="border: 1px solid #ddd;">
      <div class="flex items-center justify-center h-full">
        <div
          v-for="(item, index) in navList"
          :key="index" class="flex items-center justify-center w-1/2 h-full rd-50"

          :class="currentTabIndex === index ? 'bg-primary text-white' : ''"
          @click="currentTabIndex = index"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
  <swiper class="h-88% bg-white" :current="currentTabIndex" @change="handleSwiperChange">
    <slot name="items"></slot>
  </swiper>
</template>

