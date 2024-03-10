export const toPage = (path, params = {}) => {
  // 将参数拼接到url上
  const paramsStr = Object.keys(params).reduce((prev, key) => {
    return `${prev}${key}=${params[key]}&`
  }, '?')

  console.log('toPage', `/pages/${path}/${path}${paramsStr.slice(0, -1)}`)

  uni.navigateTo({
    url: `/pages/${path}/${path}${paramsStr.slice(0, -1)}`,
  })
}

export const toTabPage = (path) => {
  uni.switchTab({
    url: `/pages/${path}/${path}`,
  })
}

export const multiPlatformBackTop = () => {
  // #ifdef APP-PLUS
  // plus.webview.currentWebview().setStyle({
  //   scrollTop: 0,
  // })
  // #endif

  // #ifdef H5
  document.documentElement.scrollTop = 0
  // #endif

  // #ifdef MP-WEIXIN
  uni.pageScrollTo({
    scrollTop: 0,
    duration: 300,
  })
  // #endif
}

export const switchTab = toTabPage
