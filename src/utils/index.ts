import PAGE_CONFIG_JSON from '../pages.json'

const tabbar = PAGE_CONFIG_JSON.tabBar.list

export const isNoTextModeEnabled = () => {
  // 是否开启无字模式
  const { globalChangableConfig } = storeToRefs(
    useAppStore(),
  )

  setTimeout(() => {
    const noText = globalChangableConfig.value.tabbarConfig.noText
    for (let index = 0; index < tabbar.length; index++) {
      const item = tabbar[index]
      uni.setTabBarItem({
        index,
        text: noText ? ' ' : item.hiddenText,
        iconPath: item.iconPath,
        selectedIconPath: item.selectedIconPath,
      })
    }
  }, 500)
}
