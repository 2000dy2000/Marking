<script setup lang="ts">
import { defineEmits, ref } from 'vue'
/*
  title: 标题
  formItemList: 表单项列表
    name: 表单项名称
    key: 表单项对应的key
    value: 表单项对应的value
    type: 表单项类型，值：'input','textarea'
  isCard: 是否是卡片样式
  formValue: 表单数据（key要跟formItem的key对应）
 */

const { formInfo, formValue, isCard } = defineProps({
  formInfo: {
    type: Object,
    default: () => ({
      title: '',
      formItemList: [],
    }),
    required: true,
  },
  formValue: {
    type: Object,
    default: () => ({}),
  },
  isCard: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['switchPage'])

const form = ref(formValue)

const handleClick = () => {
  emit('switchPage', form.value)
}
</script>

<template>
  <div w-100vw py-2 flex flex-col items-center gap-4 @click="handleClick">
    <div
      :class="[isCard ? 'bg-#f9f9f9' : 'bg-white']"
      w-90vw
      py-2
      b-rd-6px
      flex
      justify-center
    >
      <div w-80vw>
        <div flex justify-between>
          <div v-if="formInfo.title !== ''" text-18px font-bold py-2>
            {{ formInfo.title }}
          </div>
          <div class="color-#374151" text-16px py-2>
            <slot name="headerRight"></slot>
          </div>
        </div>
        <div>
          <u--form label-position="left" :label-style="{ 'font-size': '16px' }">
            <u-form-item
              v-for="(formItem, index) in formInfo.formItemList"
              :key="formItem.key + index"
              :label="formItem.name"
              label-width="75"
            >
              <!-- Input -->
              <u--input
                v-if="formItem.type === 'input'"
                v-model="form[formItem.key]"
                border="none"
                readonly
                input-style
              ></u--input>

              <!-- Textarea -->
              <textarea
                v-if="formItem.type === 'textarea'"
                v-model="form[formItem.key]"
                w-auto
                max-h-20
                input-style
                :maxlength="-1"
              ></textarea>
            </u-form-item>
          </u--form>
        </div>
      </div>
    </div>
  </div>
</template>
