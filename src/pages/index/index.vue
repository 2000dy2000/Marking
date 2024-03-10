<script setup lang="ts">
import { toPage } from '~/utils/navigationUtils'
const { setPageConfig } = usePageStore()
onShow(async () => {
  setPageConfig({
    showNavBar: true,
    showCustomAction: false,
    pageTitle: '首页',
  })
})
const to_view_answer = () => {
  toPage('answer')
}
</script>

<template>
  <UBasePage>
    <div class="mainTown">
      <button class="button button1" @click="to_view_answer">开始答题</button>
      <button class="button button2">答题记录</button>
    </div>
  </UBasePage>
</template>

<style scoped>
.mainTown {
  display: flex;
  flex-direction: column;
  background-image: url("/static/imgs/back.jpg");
  background-repeat: no-repeat; /* 不重复 */
  height: 100%;
  background-color: rgb(246, 246, 246);
}
.button1{
  margin-top: 50%;
  margin-left: 5%;
  margin-right: 5%;
  background-color: white;
  color: rgb(162, 171, 131);
  font-family: "Arial", sans-serif; /* 设置字体族 */
  font-size: 16px; /* 设置字体大小 */
  font-weight: bold; /* 设置字体粗细 */
}
.button2{
  margin-top: 5%;
  margin-left: 5%;
  margin-right: 5%;
  color: rgb(162, 171, 131);
  font-family: "Arial", sans-serif; /* 设置字体族 */
  font-size: 16px; /* 设置字体大小 */
  font-weight: bold; /* 设置字体粗细 */
  background-color: white;
}
</style>
