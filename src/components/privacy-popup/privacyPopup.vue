<script setup lang="ts">
const { globalChangableConfig } = storeToRefs(useAppStore())

const title = '用户隐私保护提示'
const desc1 = '感谢您使用本产品，您使用本产品前应当仔细阅读并同意'
const urlTitle = '《小程序隐私保护指引》'
const desc2 = '当您点击同意并开始使用产品服务时，即表示你已理解并同意该条款内容，该条款将对您产生法律约束力。如您拒绝，将无法更好的体验产品。'

const popupRef = ref(null)
const isShow = ref(false)

const openPrivacyContract = () => {
  wx.openPrivacyContract({})
}

const handleAgreePrivacyAuthorization = () => {
//   getApp().globalData.showPrivacy = false
  globalChangableConfig.value.showPrivacy = false
  popupRef.value.close()
  uni.showToast({
    title: '授权成功, 请重新点击登录',
    icon: 'none',
    duration: 3000,
  })
  // emit confirm event
  // this.$emit('confirm')
}

const handleDisagree = () => {
  popupRef.value.close()
}

const afterOpen = () => {
//   console.log('1', popupRef.value)
//   popupRef.value.open('top')
//   console.log('2')
}

const open = () => {
  console.log('执行了这里')
  isShow.value = true
}

const close = () => {
  isShow.value = false
}

defineExpose({
  open,
  close,
})
</script>

<template>
  <u-popup
    ref="popupRef"
    :show="isShow"
    mode="center"
    :round="12"
    :safe-area-inset-bottom="false"
    @open="afterOpen"
    @close="close"
  >
    <view class="popup-box">
      <view class="text-center text-xl my-4 font-bold">
        {{ title }}
      </view>
      <view class="weui-half-screen-dialog__bd">
        <text class="indent-2">
          {{ desc1 }}
        </text>
        <text class="color-primary" @click="openPrivacyContract">
          {{ urlTitle }}
        </text>
        <text class="weui-half-screen-dialog__tips">
          {{ desc2 }}
        </text>
      </view>
      <view
        flex="~" items="center" justify="center" gap="16px"
        class="px-8 my-4"
      >
        <u-button
          shape="circle"
          class="w-50%"
          @click="handleDisagree"
        >
          拒绝
        </u-button>
        <u-button
          type="primary"
          open-type="agreePrivacyAuthorization"
          shape="circle"
          class="w-50%"
          @agreeprivacyauthorization="handleAgreePrivacyAuthorization"
          @click="handleAgreePrivacyAuthorization"
        >
          同意
        </u-button>
      </view>
    </view>
  </u-popup>
</template>

<style lang="scss" scoped>
.popup-box {
    width: 80vw;
    padding: 30rpx;
}
</style>
