<script setup lang="ts">
defineProps<{
  icon?: string
  text?: string
}>()
</script>

<template>
  <div
    class="flex flex-col items-center justify-center h-full w-full"
  >
    <u-empty
      mode="news"
      :icon="icon || 'https://qingyuanchun.obs.cn-south-1.myhuaweicloud.com:443/static/2023-07-31-a66b65d2f7e669709cd6f636e4a30d8e-%E7%BB%B4%E6%8A%A4%E4%B8%AD.png'"
      :text="text || '无相关内容'"
    >
    </u-empty>
  </div>
</template>
