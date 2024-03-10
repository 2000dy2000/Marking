<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'
const { warehouse, equipment, showType } = defineProps({
  warehouse: {
    type: Object,
    default: () => ({}),
  },
  equipment: {
    type: Object,
    default: () => ({}),
  },
  showType: {
    // warehouse or equipment
    type: String,
    default: 'warehouse',
  },
})
// eslint-disable-next-line vue/valid-define-emits
const emits = defineEmits()

const handleClick = () => {
  emits('click', equipment)
}
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
    <div class="color-#374151" text-16px py-1 style="float: right;margin-right: 4%">
      <slot name="headerRight"></slot>
    </div>
    <div v-if="showType === 'warehouse'" class="ware_card_heard">
      <img v-if="warehouse.logoUrl" class="logo_img" :src="warehouse.logoUrl" />
      <h2 class="item ware-card-title">
        {{ warehouse.warehouseName }}
      </h2>
    </div>
    <div v-else class="ware_card_heard" text-black>
      <img v-if="equipment.logoUrl" :src="equipment.logoUrl" class="logo_img" />
      <h2 class="item ware-card-title">
        {{ equipment.name }}
      </h2>
    </div>
    <div class="line-between" />
    <div @click="handleClick">
      <div v-if="showType === 'warehouse'" class="item ware-card-description">
        <div
          v-for="(eq, index) in warehouse.equipments"
          :key="eq.name + index"
          flex
          justify-between
          px-2
        >
          <span>{{ eq.name }}</span>
          <span pr-4>{{ eq.num }}</span>
        </div>
      </div>
      <div v-else class="item ware-card-description" flex flex-col gap-4>
        <div flex justify-between>
          <span>状态</span>
          <span>{{ equipment.statusText }}</span>
        </div>
        <div flex flex-wrap gap-1>
          <span>创建时间</span>
          <span>{{ equipment.createTime }}</span>
        </div>
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
  margin: 5px 0; /* 定义线与内容之间的垂直间距，可以根据需要调整 */
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
