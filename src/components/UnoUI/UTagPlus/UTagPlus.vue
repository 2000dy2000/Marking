<script setup lang="ts">
import { uni } from '@dcloudio/uni-h5'
import type { UTagPlusType } from './types'

interface UTagPlusTypeOptions {
  type?: UTagPlusType
  label: string
  value: string
}

const props = defineProps<UTagPlusTypeOptions>()

const bgTypeClass = {
  default: 'bg-gray-5',
  success: 'bg-green-5',
  error: 'bg-red-5',
  warning: 'bg-orange-5',
  primary: 'bg-blue-5',
}

const borderClass = {
  default: 'border-gray-3',
  success: 'border-green-3',
  error: 'border-red-3',
  warning: 'border-orange-3',
  primary: 'border-blue-3',
}

const textTypeClass = {
  default: 'text-gray-5',
  success: 'text-green-5',
  error: 'text-red-5',
  warning: 'text-orange-5',
  primary: 'text-blue-5',
}
</script>

<template>
  <div>
    <div
      v-if="value.trim() !== ''" class="tag rounded-2xl flex border-1 overflow-hidden"
      :class="borderClass[type || 'default']"
    >
      <div class="tag-label text-white px-4 py-1 align-middle" style="white-space: nowrap;" :class="bgTypeClass[type || 'default']">
        {{ label }}
      </div>
      <div class="tag-value align-middle px-4 py-1" style="white-space: nowrap;" :class="textTypeClass[type || 'default']">
        {{ value }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
