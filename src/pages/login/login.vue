<script setup lang="ts">
import dayjs from 'dayjs'
import { toTabPage } from '~/utils/navigationUtils'
import { AESDecode, AESEncode } from '~/utils/tool'
import { useAppStore } from '~/stores/app'
import { login } from '~/api/user.api'
import PrivacyPopup from '~/components/privacy-popup/privacyPopup.vue'
const { setUserId } = useAppStore()
const { setPageConfig } = usePageStore()
const privacyPopupRef = ref()
const model = reactive<{
  userInfo: {
    username: string
    password: string
  }
}>({
  userInfo:{
    username: '',
    password: '',
  }
})
const formRef = ref<any>(null)
const currentTabIndex = ref<number>(0)
const rules = {
  'userInfo.username': {
    type: 'string',
    required: true,
    message: '请填写用户名',
    trigger: ['blur', 'change'],
  },
  'userInfo.password': {
    type: 'string',
    required: true,
    message: '请填写密码',
    trigger: ['blur', 'change'],
  },
}
const handleSwiperChange = (e) => {
  currentTabIndex.value = e.detail.current
}

const handleLogin = () => {

  login(model.userInfo).then((res) => {
    console.log(res.data.id)
    setUserId(res.data)
    uni.switchTab({
      url: '/pages/index/index',
    })
  })
}
onShow(() => {
  setPageConfig({ showNavBar: true, pageTitle: '登录', showBackAction: true })
})

onMounted(() => {
  formRef.value.setRules(rules)
})
</script>

<template>
  <UBasePage>
    <div class="flex justify-center items-center w-full h-12% bg-white">
      <div class="w-70% h-70% bg-white rd-50 max-h-14" style="border: 1px solid #ddd;">
        <div class="flex justify-center items-center h-full">
          <div class="flex justify-center items-center w-1/2 h-full rd-50" :class="currentTabIndex === 0 ? 'bg-primary text-white' : ''" @click="currentTabIndex = 0">
            登录
          </div>
        </div>
      </div>
    </div>
    <swiper class="h-88% bg-white" :current="currentTabIndex" @change="handleSwiperChange">
      <swiper-item>
        <div
          class="h-88% px-8 py-4"
          flex="~ col"
        >
          <p class="my-4 text-2xl font-bold text-left">
            登录账号
          </p>
          <u-form
            ref="formRef"
            label-position="left"
            :model="model"
            :rules="rules"
          >
            <u-form-item
              prop="userInfo.username"
              border-bottom
            >
              <u-input
                v-model="model.userInfo.username"
                border="none"
                placeholder="账号/手机号/邮箱"
              ></u-input>
            </u-form-item>

            <u-form-item
              prop="userInfo.password"
              border-bottom
            >
              <u-input
                v-model="model.userInfo.password"
                type="password"
                border="none"
                placeholder="请输入密码"
                show-password
              ></u-input>
            </u-form-item>
            <u-form-item>
              <div class="flex justify-center w-full gap-4">
                <u-button class="w-full pt-30rpx" shape="circle" text="登录" color="#1296db" type="primary" @click="handleLogin"></u-button>
              </div>
            </u-form-item>
          </u-form>

        </div>
      </swiper-item>
      <swiper-item>
        <Register></Register>
      </swiper-item>
      <swiper-item>
        <ModifyPassword></ModifyPassword>
      </swiper-item>
    </swiper>

    <privacy-popup ref="privacyPopupRef" @confirm="confirm"></privacy-popup>
  </UBasePage>
</template>

<style scoped>
</style>

