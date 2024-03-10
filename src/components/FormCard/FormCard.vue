<script setup lang="ts">
/*
  title: 标题
  formItemList: 表单项列表
    name: 表单项名称
    key: 表单项对应的key
    type: 表单项类型，值：'input','picker','textarea', 'upload'
    readonly: 是否只读（input必填项）
    pickerColumns: 选择器的列（picker必填项）
    placeholder: 占位符
    uploadText: 上传按钮文本
  isCard: 是否是卡片样式
  formValue: 表单数据（展示数据配合 readonly 使用）

  组件外部通过@update:form="form = $event"来获取表单数据
 */
const { formInfo, isCard } = defineProps({
  formInfo: {
    type: Object,
    default: () => ({
      title: '',
      formItemList: [],
    }),
    required: true,
  },
  isCard: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:form', 'uploadFile'])
const form = ref({})
const showPickerList = ref(new Map())

const getPicker = (searchIndex: number) => {
  return showPickerList.value.get(searchIndex)
}

const handleClick = (index: number) => {
  if (formInfo.formItemList[index].type === 'picker')
    showPickerList.value.set(index, true)
}

const handlePickerConfirm = (index, e) => {
  form.value[formInfo.formItemList[index].key] = e.value[0]
  showPickerList.value.set(index, false)
}

onShow(() => {
  formInfo.formItemList.forEach((item, index) => {
    form.value[item.key] = ''
    if (item.type === 'upload') form.value[item.key] = []

    if (item.type === 'picker') showPickerList.value.set(index, false)
    else showPickerList.value.set(index, '/')
  })
})

watch(
  form,
  (newValue, oldValue) => {
    emit('update:form', newValue)
  },
  { deep: true }
)

const handleUploadClick = () => {
  emit('uploadFile')
}
</script>

<template>
  <div w-100vw pb-2 flex justify-center>
    <div
      :class="[isCard ? 'bg-#f9f9f9' : 'bg-white']"
      w-90vw
      b-rd-6px
      flex
      justify-center
    >
      <div w-80vw>
        <div v-if="formInfo.title !== ''" text-18px font-bold py-2>
          {{ formInfo.title }}
        </div>
        <div>
          <u--form
            label-position="left"
            :model="form"
            :label-style="{ 'font-size': '16px' }"
          >
            <u-form-item
              v-for="(formItem, index) in formInfo.formItemList"
              :key="formItem.key + index"
              :prop="formItem.key"
              :label="formItem.name"
              label-width="75"
              @click="handleClick(index)"
            >
              <div v-if="formItem.type === 'upload'" class="ml-25% mr-5%">
                <u-button
                  color="#000"
                  shape="circle"
                  @click="handleUploadClick"
                >
                  {{ formItem.uploadText }}
                </u-button>
              </div>

              <!-- Picker -->
              <u-picker
                v-if="formItem.type === 'picker'"
                :show="getPicker(index)"
                :columns="[formItem.pickerColumns]"
                @confirm="handlePickerConfirm(index, $event)"
                @cancel="showPickerList.set(index, false)"
              ></u-picker>
              <u--input
                v-if="formItem.type === 'picker'"
                v-model="form[formItem.key]"
                readonly
                border="none"
                :placeholder="formItem.placeholder"
                suffix-icon="arrow-right"
                input-align="right"
                flex
                justify-end
                placeholder-style="text-align:right"
              ></u--input>

              <!-- Input -->
              <u--input
                v-if="formItem.type === 'input'"
                v-model="form[formItem.key]"
                border="none"
                :readonly="formItem.readonly"
                :placeholder="formItem.placeholder"
                input-style
              ></u--input>

              <!-- Textarea -->
              <textarea
                v-if="formItem.type === 'textarea'"
                v-model="form[formItem.key]"
                w-auto
                max-h-20
                min-h-20
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
