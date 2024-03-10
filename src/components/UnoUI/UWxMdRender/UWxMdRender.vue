<script setup lang="ts">
import { marked } from 'marked'
// import highlight from 'highlight'
// import 'highlight.js/styles/foundation.css'

const props = defineProps<{
  md: ''
}>()

const rendererMD = new marked.Renderer()

rendererMD.image = function (href, title, text) {
  return `<img style="width: 100%; border-radius:4px; margin: 10px 0;" οnclick="showMarkedImage(event, '${href}')" src="${href}" alt="${text}" title="${
          title || ''
        }">`
}

marked.setOptions({
  renderer: rendererMD,
  gfm: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartypants: false,
  // highlight(code) {
  //   return highlight.highlightAuto(code).value
  // },
})

const html = computed(() => {
  return marked(props.md)
})
</script>

<template>
  <div v-html="html">
  </div>
</template>

