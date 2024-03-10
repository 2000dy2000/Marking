<script setup lang="ts">
import { useAttrs } from 'vue'
import { formatTimeAgo } from '../../../utils/timeUtils'

const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
  level: {
    type: Number,
    default: 0,
  },
  parentCommentInfo: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['handleReplyComment', 'handleLongPress'])

const attrs = useAttrs()
const data = reactive({
  dialogVisible: false,
})

const show = ref(false)
const showCommentNum = ref(3)
const appStore = useAppStore()
const { token } = appStore.getTokenInfo()
const { isLogin } = appStore
const { currUserInfo } = storeToRefs(appStore)

const subComments = computed(() => {
  return props.comment.children ? props.comment.children : []
})

const handleClickReply = () => {
  console.log('handleClickReply', props.comment)
  if (token) { emit('handleReplyComment', props.comment) }
  else {
    uni.showToast({
      title: '请先登录',
      icon: 'none',
    })
  }
}

const handleSubReplyComment = (comment) => {
  emit('handleReplyComment', comment)
}

const handleShowALlComment = () => {
  show.value = true
}

const handleFoldComment = () => {
  show.value = false
}

const calcSubCommentLength = (comments) => {
  let count = 0
  comments.forEach((item) => {
    count += 1
    if (item.children)
      count += calcSubCommentLength(item.children)
  })
  return count
}

const longpress = () => {
  console.log('longpress 123', props.comment)
  emit('handleLongPress', props.comment)
}

const handleLongPress = (item, id) => {
  emit('handleLongPress', item)
}
</script>

<template>
  <div class="comment" :style="`margin-left:${level === 1 ? 38 : 0}px`">
    <article class="relative w-full comment my-comment">
      <div
        class="flex items-center gap-4"
        @click="handleClickReply"
        @longpress.stop="longpress"
      >
        <div
          @click.stop=""
        >
          <u-image
            shape="circle"
            width="42"
            height="42"
            :src="comment.avatar"
          ></u-image>
        </div>
        <div class="w-full media-content">
          <div class="w-full content">
            <p>
              <strong class="text-sm">{{ comment.alias || comment.username }}
                <!-- 当是回复某个人时 START -->
                <span
                  v-if="parentCommentInfo !== null && level >= 2"
                  style="color: #409eff; cursor: pointer; user-select: none"
                  class="px-1 text-sm"
                  @click.stop=""
                >
                  <span>@</span>
                  <span>{{ parentCommentInfo.alias || parentCommentInfo.username }}</span>
                </span>
                <!-- 回复某个人 END -->
              </strong>
              <!-- <small class="ml-2">{{ dayjs(comment.createTime).format('YY/M/D') }}</small> -->
              <br />
            </p>
            <div class="w-4/5">
              <span style="overflow-wrap: anywhere;">
                {{ comment.content }}
              </span>
              <span class="mx-2 text-xs text-gray-400">{{ formatTimeAgo(comment.createTime) }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute right-0 mr-4 bottom-1" flex="~" gap="4px">
        <!-- <u-button v-if="token" icon="chat" @click="handleClickReply">
        </u-button> -->
        <u-icon v-if="isLogin" name="chat" size="24" @click="handleClickReply"></u-icon>
      </div>
    </article>

    <div v-if="show || subComments.length <= showCommentNum">
      <UComment
        v-for="item in subComments"
        :key="`comment-${item.id}`"
        :comment="item"
        :level="level + 1"
        :parent-comment-info="comment"
        v-bind="$attrs"
        @handle-reply-comment="handleSubReplyComment"
        @handle-long-press="handleLongPress"
      />
      <span
        v-if="show" class="my-4 text-sm text-gray op-80"
        style="margin-left:46px"
        @click="handleFoldComment"
      >折叠回复</span>
    </div>
    <div v-else>
      <UComment
        v-for="item in subComments.slice(0, showCommentNum)"
        :key="`comment-${item.id}`"
        :comment="item"
        :level="level + 1"
        :parent-comment-info="comment"
        v-bind="$attrs"
        @handle-reply-comment="handleSubReplyComment"
        @handle-long-press="handleLongPress"
      />
      <span
        v-if="!show" class="my-4 text-sm text-blue op-80"
        style="margin-left:46px"
        @click="handleShowALlComment"
      >展开{{ calcSubCommentLength(subComments) }}条回复</span>
    </div>
  </div>
</template>

<style>
.comment + .comment {
  border-top: 1px solid hsla(0, 0%, 85.9%, 0.5);
  margin-top: 1rem;
  padding-top: 1rem;
}

/* #ifdef MP-WEIXIN */
.my-comment{
  border-top: 1px solid hsla(0, 0%, 85.9%, 0.5);
  margin-top: 1rem;
  padding-top: 1rem;
}
/* #endif */
</style>
