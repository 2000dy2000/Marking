<script setup lang="ts">
import { isNoTextModeEnabled } from './utils'
import { updateApp } from './utils/tool'
import { switchTab } from './utils/navigationUtils'
const {
  darkMode,
  statusBarHeight,
  menuButtonBounding,
  globalChangableConfig,
  platform,
} = storeToRefs(useAppStore())

const setNavStyle = (theme: 'dark' | 'light') => {
  // const theme = darkMode ? 'dark' : 'light'

  console.log(theme)
  // App端
  // #ifdef APP-PLUS
  plus.navigator.setStatusBarStyle(theme === 'dark' ? 'light' : 'dark') // 只支持dark和light
  // #endif

  // 小程序端
  // #ifdef MP-WEIXIN
  uni.setNavigationBarColor({
    frontColor: theme === 'dark' ? '#ffffff' : '#000000',
    backgroundColor: theme === 'dark' ? '#000000' : 'ffffff',
  })
  // #endif

  // 网页端
  // #ifdef H5
  document.documentElement.setAttribute('data-theme', theme)
  // #endif
}

// 调整到首页
const switchToHomePage = () => {
  // switch (globalChangableConfig.value.tabbarConfig.homeIndex) {
  //   case 0:
  //     // 跳转帖子
  //     switchTab('post')
  //     break
  //   case 1:
  //     switchTab('index')
  //     break
  //   case 2:
  //     switchTab('user')
  //     break
  //   default:
  //     break
  // }
}

const checkNeedShowPrivacy = () => {
  // @ts-expect-error
  if (uni.getPrivacySetting) {
    // @ts-expect-error
    uni.getPrivacySetting({
      success: (res) => {
        console.log(
          '是否需要授权：',
          res.needAuthorization,
          '隐私协议的名称为：',
          res.privacyContractName
        )
        if (res.needAuthorization)
          globalChangableConfig.value.showPrivacy = true
        else globalChangableConfig.value.showPrivacy = false
      },
      fail: () => {},
      complete: () => {
        // !调试使用，强制设置为true
        // globalChangableConfig.value.showPrivacy = true
      },
    })
  }
}

const getUserPlatform = () => {
  uni.getSystemInfo({
    success: (res) => {
      // windows | mac为pc端
      // android | ios为手机端
      console.log('getSystemInfo,', res.platform)
      platform.value = res.platform
    },
  })
}

onLaunch(() => {
  isNoTextModeEnabled()
  // switchToHomePage()
  updateApp()

  getUserPlatform()

  // #ifdef MP-WEIXIN || MP-QQ
  const systemInfo = uni.getSystemInfoSync()
  // the systemInfo.theme is only support dark mode in WeChat and QQ
  darkMode.value = systemInfo?.theme === 'dark'

  // TODO: 先暂时强制设置为false，不器用暗夜模式
  darkMode.value = false

  statusBarHeight.value = systemInfo!.statusBarHeight || 44
  menuButtonBounding.value = uni.getMenuButtonBoundingClientRect()
  // uni.onThemeChange(
  //   (res: UniApp.OnThemeChangeCallbackResult) =>
  //     (darkMode.value = res.theme === 'dark'),
  // )
  // #endif

  // #ifdef H5
  // const colorScheme = window.matchMedia('(prefers-color-scheme: dark)')
  // darkMode.value = colorScheme.matches
  // colorScheme.addEventListener(
  //   'change',
  //   (e: MediaQueryListEvent) => (darkMode.value = e.matches),
  // )
  // The data is obtained from iPhone13 miniprogram but statusBarHeight, top and bottom values are subtracted from the statusBarHeight value
  statusBarHeight.value = 0
  menuButtonBounding.value = {
    width: 87,
    height: 32,
    left: 281,
    top: 4,
    right: 368,
    bottom: 36,
  }
  // #endif

  // 设置导航栏样式
  // setNavStyle('light')
})

onShow(() => {
  checkNeedShowPrivacy()
})
onHide(() => {})
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import 'uview-plus/index.scss';
</style>

<style>
/* #ifdef H5 */
.uni-tabbar {
  padding: 8px 0;
}
/* #endif */

/* TODO: 适配夜间模式 */
page {
  background-color: #f6f8fa;
}
</style>
