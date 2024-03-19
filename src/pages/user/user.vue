<script setup lang="ts">
import { useAppStore } from '~/stores/app'
import { toPage } from '~/utils/navigationUtils'
import OptionComp from '~/components/option/Option.vue'

const { setPageConfig } = usePageStore()
const { getUserId } = useAppStore()
const {
  currUserInfo,
  tokenInfo,
  customBarHeight,
  statusBarHeight,
  isLogin,
  globalChangableConfig,
  noticeInfo,
  isPC,
} = storeToRefs(useAppStore())
const { removeInfo } = useAppStore()
const showNotice = ref(false)
const notice = ref<any>({})
const showNoticeDot = ref(false)

const getIconSrc = (icon) => {
  return `../../static/user/${icon}.svg`
}

const handleOptionClick = (item) => {
  const { label } = item

  switch (label) {
    case 'roast':
      toPage('postDetail', { id: '1661216029436628993' })
      return
    case 'donate':
      toPage('donate')
      return
    case 'notice':
      showNotice.value = true
      if (!noticeInfo.value.readedArr.includes(notice.value.id))
        noticeInfo.value.readedArr.push(notice.value.id)
      showNoticeDot.value = false
      return
    case 'logout':
      logout().then((res) => {
        if (res.code === 200)
          removeInfo()
      })
      return
    case 'chat':
      // 无需采取任何操作
      return
  }

  if (!tokenInfo.value.token && label === 'studentSystemLogin') {
    uni.showToast({
      title: '请先登录账号',
      icon: 'error',
    })
    uni.navigateTo({
      url: '/pages/login/login',
    })
  }
  else {
    uni.navigateTo({
      url: `/pages/${label}/${label}`,
    })
  }
}
const loginStatus = ref('点我登录')
const handleClickBg = () => {
  // 显示背景色切换
  uni.showActionSheet({
    itemList: ['更换背景'],
    success: (res) => {
      const { tapIndex } = res
      switch (tapIndex) {
        case 0:
          toPage('userBgPicker')
          break
      }
    },
  })
}

const getContent = (content) => {
  return content
    .split('\n')
    .map((item) => {
      return `<p>${item}</p>`
    })
    .join('')
}

const handleNoticePopupClose = () => {
  showNotice.value = false
}
onShow(async () => {
  let id = getUserId()
  let idNumber = parseInt(id, 10);
  if (idNumber > 0){
    loginStatus.value = '已登录'
  }
})
const TOP_HEIGHT = 32
</script>

<template>
  <u-popup
    :show="showNotice"
    mode="center"
    :round="10"
    @close="handleNoticePopupClose"
  >
    <div class="w-75 min-h-34 flex flex-col justify-center items-center">
      <div class="w-65 py-6 text-gray-600">
        <h2 text="center lg" mb-2>
          公告
        </h2>
        <div
          v-if="notice !== null"
          class="text-base"
          v-html="getContent(notice?.content || '暂无公告')"
        ></div>
        <div v-else>
          暂无公告
        </div>
        <div class="text-sm flex justify-end" pt-2>
          <span>from 众创团队</span>
        </div>
      </div>
    </div>
  </u-popup>
  <!-- 背景区 -->
  <div
    class="bg px-6"
    :style="{
      'padding-top': `${isPC ? statusBarHeight - 20 : statusBarHeight}px`,
      'height': `${TOP_HEIGHT}vh`,
      'background': globalChangableConfig.userConfig.backgroundColor.bgColor,
    }"
    @click="handleClickBg"
  >
    <!-- 导航区 START -->
    <div
      class="mt-3 inline-block"
      :style="{
        height: `${customBarHeight - statusBarHeight}px`,
      }"
      @click.stop="toPage('setting')"
    >
      <u-icon name="setting-fill" color="white" size="18" cursor="pointer">
      </u-icon>
    </div>
    <!-- 导航区 END -->

    <!-- 用户信息 START -->
    <div
      class="my-2"
      :class="isPC ? 'mt-6' : ''"
    >
      <div
        v-if="currUserInfo.avatar === ''"
        class="flex flex-col items-center justify-center"
        @click.stop="toPage('login')"
      >
        <div>
          <img
            class="w-16 h-16"
            color="white"
            src="../../static/user/user-avatar.svg"
            alt=""
          />
        </div>
        <div class="text-lg text-white">
          {{ loginStatus }}
        </div>
      </div>
      <div
        v-else class="flex items-center justify-between"
        @click.stop="toPage('userDetail', currUserInfo)"
      >
        <div flex="~">
          <div>
            <img
              class="w-16 h-16"
              style="border-radius: 100%; border: 1px solid #ddd"
              :src="currUserInfo.avatar"
              alt=""
            />
          </div>
          <div flex="~ col" justify="center" ml-4>
            <div class="text-lg text-white truncate mb-1">
              {{ currUserInfo.alias }}
            </div>
            <div class="text-xs text-white truncate">
              {{ currUserInfo.bio }}
            </div>
          </div>
        </div>
        <div @click.stop="toPage('userDetail', currUserInfo)">
          <u-icon name="arrow-right" color="white"></u-icon>
        </div>
      </div>
    </div>
    <!-- 用户信息 END -->

    <!-- 创作内容 start -->
    <div v-if="isLogin" class="flex justify-around my-4">
      <div
        v-for="(item, index) in counts"
        :key="index"
        class="flex flex-col text-center"
        @click.stop="toPage('userActivity', { type: index })"
      >
        <span class="text-2xl text-white">{{ item.count }}</span>
        <span class="text-gray-200 text-xs">{{ item.label }}</span>
      </div>
    </div>
    <!-- 创作内容 end -->
  </div>
  <!-- 操作区 START -->

  <!-- 操作区 START -->
  <div
    class="py-2 rounded-t-xl bg-white relative z-2"
    :style="{
      height: `calc(${100 - TOP_HEIGHT + 1}vh - ${
        customBarHeight - statusBarHeight
      }px)`,
      top: `-${1}vh`,
    }"
  >
    <div
      v-for="(item, index) in optionList"
      :key="index"
      class="px-4"
      :option="item"
    >
      <div
        v-if="item.showInNotLogin || isLogin"
        @click="handleOptionClick(item)"
      >
        <!-- 当没有设置openType时 -->
        <div
          v-if="!item.openType"
          class="flex my-6"
          items="center"
          justify="between"
        >
          <div flex="~" items="center">
            <img
              class="icon w-6 h-6 text-gray-500"
              :src="getIconSrc(item.icon)"
              alt="图标"
            />
            <div ml-6 text-gray-500 font-400 text-base>
              {{ item.title }}
            </div>
            <u-badge
              v-if="item.label === 'notice' && showNoticeDot"
              :is-dot="true"
              ml-2
            ></u-badge>
          </div>
          <div>
            <u-icon name="arrow-right" color="gray"></u-icon>
          </div>
        </div>

        <!-- 当设置了openType -->
        <div v-else class="flex my-6" items="center" justify="between">
          <button :open-type="item.openType" class="border-none">
            <div class="flex" items="center" justify="between">
              <div flex="~" items="center">
                <img
                  class="icon w-6 h-6 text-gray-500"
                  :src="getIconSrc(item.icon)"
                  alt="图标"
                />
                <div ml-6 text-gray-500 font-400 text-base>
                  {{ item.title }}
                </div>
                <u-badge
                  v-if="item.label === 'notice' && showNoticeDot"
                  :is-dot="true"
                  ml-2
                ></u-badge>
              </div>
              <div>
                <u-icon name="arrow-right" color="gray"></u-icon>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- 操作区 END -->
</template>

<style>
button::after {
  border: none;
}

button {
  position: relative;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding-left: 0px;
  padding-right: 0px;
  box-sizing: border-box;
  text-align: center;
  text-decoration: none;
  line-height: 1.35;
  -webkit-tap-highlight-color: transparent;
  overflow: hidden;
  color: #000000;
  background-color: #fff;
  width: 100%;
  height: 100%;
}

button:active{
  background-color: #fff;
}
</style>
