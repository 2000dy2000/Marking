<script setup lang="ts">
import type { UNotifyOptions } from '../UNotify/types'
import type { UToastOptions } from '../UToast/types'
import { toPage, toTabPage } from '~/utils/navigationUtils'

const props = defineProps({
  bgColor: {
    type: String,
    default: '#fff',
  },
})

const { darkMode, customBarHeight, statusBarHeight, isPC } = storeToRefs(
  useAppStore()
)
const { pageReset } = usePageStore()
const {
  showNavBar,
  showBackAction,
  showCustomAction,
  pageTitle,
  showPageHeader,
  pageHeader,
  notifyRef: _notifyRef,
  toastRef: _toastRef,
} = storeToRefs(usePageStore())

const handleNavigateBack = () => uni.navigateBack({})

const notifyRef = ref<{ handleShowNotify: (options: UNotifyOptions) => {} }>()
const toastRef = ref<{ handleShowToast: (options: UToastOptions) => {} }>()

onMounted(() => {
  _notifyRef.value = notifyRef.value
  _toastRef.value = toastRef.value
})

/**
 * 返回上一页的界面和当前界面相同或者没有上一页
 */
const isSamePageWithBackOrNoneBack = computed(() => {
  // 获取页面栈
  const pages = getCurrentPages()

  // 获取当前页面
  const currentPage = pages[pages.length - 1]

  // 获取上一级页面
  const prevPage = pages[pages.length - 2]

  // 判断当前页面和上一级页面是否相同
  if (!prevPage) return true

  const isSamePage = currentPage.route === prevPage.route

  return isSamePage
})

// FIXME: 有问题，暂时不用, TITLE会出现丢失
// onUnmounted(() => pageReset())
</script>

<template>
  <div :class="darkMode ? 'dark' : ''">
    <div class="relative text-base color-base">
      <!-- custom navigation bar -->
      <div
        v-if="showNavBar"
        class="fixed top-0 w-full font-bold text-white bg-primary z-200"
        :style="{ height: `${customBarHeight}px` }"
      >
        <div
          :style="{
            'padding-top': `${isPC ? statusBarHeight - 20 : statusBarHeight}px`,
            height: `${customBarHeight - statusBarHeight}px`,
          }"
        >
          <div class="relative h-full px-6 text-center">
            <div
              v-if="showBackAction || showCustomAction"
              class="absolute flex items-center justify-center h-full text-xl left-4"
            >
              <slot name="navAction">
                <div
                  v-if="showBackAction && !showCustomAction"
                  class="i-carbon-chevron-left"
                  @click="handleNavigateBack"
                />

                <div
                  v-if="
                    showBackAction &&
                    isSamePageWithBackOrNoneBack &&
                    !showCustomAction
                  "
                  class="ml-2 i-carbon-home"
                  @click="toTabPage('post')"
                />
              </slot>
            </div>
            <div class="flex items-center justify-center h-full text-lg">
              <slot name="navContent">
                {{ pageTitle }}
              </slot>
            </div>
          </div>
        </div>
      </div>
      <UNotify ref="notifyRef" />
      <UToast ref="toastRef" />
      <!-- page container -->

      <!-- #ifdef H5 -->
      <!-- 如果是网页端 -->
      <div
        :style="{
          height: `calc(100vh - ${customBarHeight + 58}px)`,
          'padding-top': `${customBarHeight}px`,
          backgroundColor: darkMode ? '#000' : props.bgColor,
          overflow: 'scroll',
        }"
      >
        <slot />
      </div>

      <!-- #endif -->

      <!-- #ifndef H5 -->
      <!-- 如果不是网页端 -->

      <div
        v-if="showPageHeader"
        :style="{
          'padding-top': `calc(${customBarHeight}px)`,
        }"
        w-100vw
        flex
        justify-center
        bg-white
      >
        <div
          w-90vw
          h-6vh
          flex
          justify-between
          items-center
          class="color-#11a0ae"
        >
          <div pb-2px style="border-bottom: solid 2px #11a0ae">
            {{ pageHeader[0].text }}
          </div>
          <div @click="toPage(pageHeader[1].to)">
            {{ pageHeader[1].text }}
          </div>
        </div>
      </div>
      <div
        :style="{
          height: !showPageHeader
            ? `calc(100vh - ${customBarHeight}px)`
            : `calc(100vh - ${customBarHeight}px - 6vh)`,
          'padding-top': showPageHeader ? `` : `${customBarHeight}px`,
          backgroundColor: darkMode ? '#000' : props.bgColor,
          overflow: 'scroll',
        }"
      >
        <slot />
      </div>
      <!-- #endif -->
    </div>
  </div>
</template>
