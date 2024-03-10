<script setup lang="ts">
const { itemInfo } = defineProps({
  itemInfo: {
    type: Object,
  },
})
</script>

<template>
  <div
    class="bg-#f6f6f6"
    w-160px
    min-h-180px
    max-h-260px
    overflow-hidden
    b-rd-8px
  >
    <div class="ware_card_heard" pl-2>
      <!-- <img class="logo_img" :src="warehouse.logoUrl" /> -->
      <div class="item ware-card-title">
        {{ itemInfo.itemName }}
      </div>
    </div>
    <div class="line-between" />
    <div class="item ware-card-description" flex flex-col gap-4>
      <div flex justify-between px-2>
        <span>器材编号</span>
        <span>{{ itemInfo.itemNo }}</span>
      </div>
      <div flex justify-between px-2>
        <span>种类</span>
        <span>{{ itemInfo.itemTypeName }}</span>
      </div>
      <div flex justify-between px-2>
        <span>数量</span>
        <span>{{ itemInfo.quantity }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ware-card-title {
  margin: 0;
  font-size: 16px;
  color: #000;
}
.item {
  margin: 5% 5% 5% 5%;
}
.ware-card-description {
  color: #666262;
}
.line-between {
  border: 1px solid #b8b2b2; /* 定义线的样式，可以根据需要调整颜色、宽度等 */
  width: 100%; /* 让线的宽度占满容器的宽度 */
}
.ware_card_heard {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
}
.logo_img {
  width: 20px;
  height: 20px;
  margin: 5% 5% 5% 5%;
}
</style>
