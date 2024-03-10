import { pinia } from '~/modules/pinia'
import type { UNotifyOptions } from '~/components/UnoUI/UNotify/types'
import type { UToastOptions } from '~/components/UnoUI/UToast/types'

interface HeaderConfig {
  text: string
  to: string
}

interface PageConfig {
  showNavBar?: boolean
  showBackAction?: boolean
  showCustomAction?: boolean
  showPageHeader?: boolean
  pageTitle?: string
  pageHeader?: HeaderConfig[]
}

export const usePageStore = defineStore(
  'page',
  () => {
    const showNavBar = ref(true)
    const showBackAction = ref(false)
    const showCustomAction = ref(false)
    const showPageHeader = ref(false)
    const pageTitle = ref('')
    const notifyRef = ref<{ handleShowNotify: (options: UNotifyOptions) => {} }>()
    const toastRef = ref<{ handleShowToast: (options: UToastOptions) => {} }>()
    const pageHeader = ref<HeaderConfig[]>([])

    const setPageConfig = (config: PageConfig) => {
      const {
        showNavBar: _showNavBar = true, showBackAction: _showBackAction = false,
        showCustomAction: _showCustomAction = false, pageTitle: _pageTitle = '',
        showPageHeader: _showPageHeader = false, pageHeader: _pageHeader = [],
      } = config

      showNavBar.value = _showNavBar
      showBackAction.value = _showBackAction
      showCustomAction.value = _showCustomAction
      showPageHeader.value = _showPageHeader
      pageTitle.value = _pageTitle
      pageHeader.value = _pageHeader
    }

    const showNotify = (options: UNotifyOptions) => notifyRef.value!.handleShowNotify(options)

    const showToast = (options: UToastOptions) => toastRef.value!.handleShowToast(options)

    const pageReset = () => {
      showNavBar.value = true
      showBackAction.value = false
      showCustomAction.value = false
      pageTitle.value = ''
      notifyRef.value = undefined
      toastRef.value = undefined
    }

    return {
      setPageConfig,
      showNavBar,
      pageTitle,
      showBackAction,
      showCustomAction,
      notifyRef,
      toastRef,
      showPageHeader,
      pageHeader,
      showNotify,
      showToast,
      pageReset,
    }
  })

// Need to be used outside the setup
export function usePageStoreWidthOut() {
  return usePageStore(pinia)
}
