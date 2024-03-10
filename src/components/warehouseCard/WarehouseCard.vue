<script setup lang="ts">
import type { Warehouse } from '~/types/warehouse'
import type { Area } from '~/types/area'

import { getAreaList } from '~/api/area.api'
import { toPage } from '~/utils/navigationUtils'

const { warehouse } = defineProps<{
  warehouse: Warehouse
}>()
const emits = defineEmits(['showDetail', 'createArea'])

const areaList = ref<Area[]>([])

const handleCheck = (id: number) => {
  emits('showDetail', id)
}

const handleCreateArea = () => {
  emits('createArea', warehouse)
}

onMounted(() => {
  getAreaList({ warehouseId: warehouse.id }).then((res) => {
    res.content.map((item) => areaList.value.push(item))
  })
})
</script>

<template>
  <div class="bg-#f6f6f6" w-90vw min-h-30vw max-h-90vw overflow-scroll b-rd-8px>
    <div flex justify-between>
      <div flex items-center gap-2 py-3 pl-4>
        <div v-if="warehouse.logoUrl" flex items-center>
          <img w-6 h-6 :src="warehouse.logoUrl" />
        </div>

        <div class="ware-card-title">
          {{ warehouse.warehouseName }}
        </div>
      </div>

      <div flex items-center pr-4 @click="handleCreateArea">添加器材室</div>
    </div>
    <div class="line-between" />
    <div v-if="areaList.length !== 0" class="color-#666262" py-2>
      <div v-for="area in areaList" :key="area.id">
        <div px-4 py-2 flex justify-between>
          <div>{{ area.areaName }}</div>
          <div @click="handleCheck(area.id)">查看详情</div>
        </div>
      </div>
    </div>
    <div v-else class="color-#666262">
      <div px-4 pt-4 pb-2>
        <div>该仓库暂无器材室</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ware-card-title {
  font-size: 18px;
  color: #000;
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
}
</style>
