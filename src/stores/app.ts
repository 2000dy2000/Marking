import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import type { UmsUser } from './../modules/vo/UserInfoVo.d'
import { pinia } from '~/modules/pinia'
import { getAllWareHouseList } from '~/api/warehouse.api'
import { getAreaList } from '~/api/area.api'

interface receiptDict {
  code: number
  label: string
  value: number
}

interface MenuButtonBoundingClientRect {
  width: number
  height: number
  top: number
  left: number
  right: number
  bottom: number
}

export const useAppStore = defineStore(
  'app',
  () => {
    // 全局可变配置
    const globalChangableConfig = reactive<{
      theme: 'light' | 'dark'
      // 课表配置
      courseConfig: {
        courseTableCell: Boolean
        opacity: number
        blur: Boolean
        textColor: '' | '#ffffff'
        backgroundType?: 'color' | 'image' | 'gradient'
        beginTime: string
        backgroundColor: {
          selectedIndex: number
          color: string
        }
        backgroundImage?: {
          selectedIndex: number
          selectedType: string
          imageUrl: string
          customImageList: string[]
        }
        backgroundGradient: {
          selectedIndex: number
          colors: [string, string]
        }
      }
      tabbarConfig: {
        noText: boolean
        homeIndex: number
      }
      userConfig: {
        backgroundColor: {
          bgColor: string
          selectedBgIndex: number
        }
      }
      clickPostTabbarLock: boolean
      showPrivacy: boolean
    }>({
      showPrivacy: true,
      theme: 'light',
      courseConfig: {
        courseTableCell: true,
        opacity: 20,
        blur: true,
        textColor: '',
        backgroundType: 'color',
        beginTime: '2023-09-03',
        backgroundColor: {
          selectedIndex: 0,
          color: '#ffffff',
        },
        backgroundGradient: {
          selectedIndex: -1,
          colors: ['#ffffff', '#ffffff'],
        },
        backgroundImage: {
          selectedType: '',
          selectedIndex: -1,
          imageUrl: '',
          customImageList: [],
        },
      },
      tabbarConfig: {
        noText: false,
        homeIndex: 1,
      },
      userConfig: {
        backgroundColor: {
          bgColor:
            'linear-gradient(to right top, #6d327c, #485DA6, #00a1ba, #00BF98, #36C486);',
          selectedBgIndex: 1,
        },
      },
      clickPostTabbarLock: true,
    })

    const darkMode = ref(false)
    const createPostDoneNeedRefresh = ref(false)
    const deletePostDoneNeedRefresh = ref(false)
    const statusBarHeight = ref(0)
    const menuButtonBounding = ref<MenuButtonBoundingClientRect>()
    const customBarHeight = computed(() =>
      !menuButtonBounding.value
        ? 0
        : menuButtonBounding.value.bottom
        + menuButtonBounding.value.top
        - statusBarHeight.value
        + 8,
    )

    const accountInfo = reactive<{
      username: string
      password: string
      remember: boolean
    }>({
      username: '',
      password: '',
      remember: false,
    })

    const tokenInfo = reactive<{
      token: string
      expireTimestamp: Dayjs | null
    }>({
      token: '',
      expireTimestamp: null,
    })

    const noticeInfo = reactive<{
      readedArr: number[]
    }>({
      readedArr: [],
    })

    /**
     * 当前登录用户的信息
     */
    const currUserInfo = ref<UmsUser>({
      username: '',
      avatar: '',
      // email: '',
    })

    // 入库
    const receiptStatusOriginalList = ref<receiptDict[]>([
      {
        code: 113,
        label: '未发货',
        value: 0,
      },
      {
        code: 114,
        label: '在途（已发货未入库）',
        value: 1,
      },
      {
        code: 115,
        label: '部分入库',
        value: 2,
      },
      {
        code: 116,
        label: '入库完成',
        value: 3,
      },
      {
        code: 117,
        label: '作废',
        value: 4,
      },
    ])

    const receiptTypeOriginalList = ref<receiptDict[]>([
      {
        code: 109,
        label: '采购入库',
        value: 1,
      },
      {
        code: 110,
        label: '外协入库',
        value: 2,
      },
      {
        code: 112,
        label: '退货入库',
        value: 3,
      },
    ])

    const receiptStatusList = ref<receiptDict[]>([
      {
        code: 113,
        label: '未发货',
        value: 0,
      },
      {
        code: 116,
        label: '入库完成',
        value: 3,
      }],
    )

    const receiptTypeList = ref<receiptDict[]>([{
      code: 109,
      label: '采购入库',
      value: 1,
    }])

    const searchStatusLabel = (value: string) => {
      return receiptStatusOriginalList.value.filter(item => item.value === value)[0].label
    }

    const searchTypeLabel = (value: string) => {
      console.log(value)
      return receiptTypeOriginalList.value.filter(item => item.value === value)[0].label
    }

    const searchStatusValue = (label: string) => {
      return receiptStatusOriginalList.value.filter(item => item.label === label)[0].value
    }

    const searchTypeValue = (label: string) => {
      return receiptTypeOriginalList.value.filter(item => item.label === label)[0].value
    }
    // 编辑时保存入库订单
    const receiptFormInfo = ref({})

    const saveReceiptFormInfo = (info: any) => {
      receiptFormInfo.value = info
    }

    const removeReceiptFormInfo = () => {
      receiptFormInfo.value = {}
    }

    // 仓库
    const warehouseList = ref([])

    const getWarehouseListAsync = async () => {
      if (!warehouseList.value.length) {
        const res = await getAllWareHouseList()
        warehouseList.value = res.content
      }
    }

    // 货区
    const areaList = ref([])

    const getAreaListAsync = async () => {
      if (!areaList.value.length) {
        const res = await getAreaList({})
        areaList.value = res.content
      }
    }

    // 出库
    const shipmentFormInfo = ref({})

    const saveShipmentFormInfo = (info: any) => {
      shipmentFormInfo.value = info
    }

    const removeShipmentFormInfo = () => {
      shipmentFormInfo.value = {}
    }

    // 移库
    const moveStoreInfo = ref({})

    const saveMoveStoreInfo = (info: any) => {
      moveStoreInfo.value = info
    }

    const removeMoveStoreInfo = () => {
      moveStoreInfo.value = {}
    }

    // 用户信息相关操作
    const setCurrUserInfo = (userInfo: UmsUser) => {
      currUserInfo.value = userInfo
    }

    const removeCurrUserInfo = () => {
      currUserInfo.value = {
        username: '',
        avatar: '',
      }
    }

    // TOKEN相关操作
    const setTokenInfo = (token: string, expireTimestamp: Dayjs) => {
      tokenInfo.token = token
      tokenInfo.expireTimestamp = expireTimestamp
    }

    const removeToken = () => {
      tokenInfo.token = ''
      tokenInfo.expireTimestamp = null
    }

    const getTokenInfo = () => {
      if (!tokenInfo.token) {
        return {
          token: '',
          expireTimestamp: null,
        }
      }

      // 检测是否过期
      if (
        tokenInfo.expireTimestamp
        && dayjs(tokenInfo.expireTimestamp).isBefore(dayjs())
      )
        removeToken()

      return tokenInfo
    }

    // 退出登录
    const removeInfo = () => {
      removeToken()
      removeCurrUserInfo()
    }

    // 是否登录
    const isLogin = computed(() => !!getTokenInfo().token)

    // 保存账号密码
    const saveAccount = (username: string, password: string) => {
      accountInfo.username = username
      accountInfo.password = password
      accountInfo.remember = true
    }

    // 清空账号密码
    const removeAccount = () => {
      accountInfo.username = ''
      accountInfo.password = ''
      accountInfo.remember = false
    }

    // 获取平台
    const platform = ref('')
    const isPC = computed(
      () => platform.value === 'mac' || platform.value === 'windows',
    )
    let userId = ref('0')
    function setUserId(id) {
      userId.value = id
    }
    function getUserId() {
      return userId.value
    }

    return {
      darkMode,
      statusBarHeight,
      customBarHeight,
      menuButtonBounding,
      tokenInfo,
      setTokenInfo,
      removeToken,
      currUserInfo,
      setCurrUserInfo,
      removeCurrUserInfo,
      removeInfo,
      getTokenInfo,
      createPostDoneNeedRefresh,
      deletePostDoneNeedRefresh,
      globalChangableConfig,
      isLogin,
      accountInfo,
      saveAccount,
      removeAccount,
      noticeInfo,
      platform,
      isPC,
      receiptStatusOriginalList,
      receiptTypeOriginalList,
      receiptStatusList,
      receiptTypeList,
      searchStatusLabel,
      searchStatusValue,
      searchTypeLabel,
      searchTypeValue,
      receiptFormInfo,
      saveReceiptFormInfo,
      removeReceiptFormInfo,
      warehouseList,
      areaList,
      getAreaListAsync,
      getWarehouseListAsync,
      shipmentFormInfo,
      saveShipmentFormInfo,
      removeShipmentFormInfo,
      moveStoreInfo,
      saveMoveStoreInfo,
      removeMoveStoreInfo,
      setUserId,
      getUserId,
    }
  },
  {
    persist: true,
  },
)

// Need to be used outside the setup
export function useAppStoreWidthOut() {
  return useAppStore(pinia)
}

