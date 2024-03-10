import { pinia } from '~/modules/pinia'
import type { MyComment } from '~/types/comment'

export const useCommentStore = defineStore(
  'comment',
  () => {
    interface CommentLock {
      lock: boolean
      data: MyComment | null
    }

    const commentLockWithReply = reactive<CommentLock>({
      lock: false,
      data: null,
    })

    const commentLockWithLongPress = reactive<CommentLock>({
      lock: false,
      data: null,
    })

    const resetCommentLockWithReply = () => {
      commentLockWithReply.lock = false
      commentLockWithReply.data = null
    }

    const resetCommentLockWithLongPress = () => {
      commentLockWithLongPress.lock = false
      commentLockWithLongPress.data = null
    }

    return {
      commentLockWithReply,
      commentLockWithLongPress,
      resetCommentLockWithReply,
      resetCommentLockWithLongPress,
    }
  },
)

// Need to be used outside the setup
export function useCommentStoreWidthOut() {
  return useCommentStore(pinia)
}

