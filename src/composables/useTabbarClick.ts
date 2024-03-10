export default function useTabbarClick() {
  const tabClickCount = ref(0)

  function onTabItemTapMethod(e, callback, dbClickCallback, duration = 200) {
    // tab 点击时执行，此处直接接收单击事件
    tabClickCount.value++

    setTimeout(() => {
      switch (tabClickCount.value) {
        case 1:
          // 单击事件
          callback && callback(e)
          break
        case 2:
          // 双击事件
          dbClickCallback && dbClickCallback(e)
          break
        default:
          // 其他事件
          break
      }
      tabClickCount.value = 0
    }, duration)
  }

  return {
    onTabItemTapMethod,
  }
}
