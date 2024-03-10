import CryptoJS from 'crypto-js'

interface Course {
  title: string
  location: string
  week: number | undefined
  start: number
  duration: number
  weeks: number[]
  teacher: string
  credits: number
  assessmentMethod: string
}

const secretKey = '0123456789asdfgh'
const weeksConvert = (weeks: string): number[] => {
  const weeksArr: number[] = []
  weeks.split(',').forEach((item) => {
    if (item.includes('-')) {
      let flag = 1
      // 1 不分单双周 2 单周 3 双周
      if (item.includes('单')) flag = 2
      else if (item.includes('双')) flag = 3
      const splitArr = item.split('-')
      const start = parseInt(splitArr[0])
      const end = parseInt(splitArr[1])
      for (let i = start; i <= end; i++) {
        // 单周且i为奇数
        if (flag === 2 && i % 2 === 1) weeksArr.push(i)
        if (flag === 3 && i % 2 === 0) weeksArr.push(i)
        if (flag === 1) weeksArr.push(i)
      }
    } else {
      weeksArr.push(parseInt(item))
    }
  })
  return weeksArr
}

const weekConvert = (week) => {
  if (week === '星期一') return 1
  if (week === '星期二') return 2
  if (week === '星期三') return 3
  if (week === '星期四') return 4
  if (week === '星期五') return 5
  if (week === '星期六') return 6
  if (week === '星期日') return 0
}

export function getWeekdayFromNumber(num: number): string {
  switch (num) {
    case 0:
      return '星期日'
    case 1:
      return '星期一'
    case 2:
      return '星期二'
    case 3:
      return '星期三'
    case 4:
      return '星期四'
    case 5:
      return '星期五'
    case 6:
      return '星期六'
    default:
      return ''
  }
}

export function convertData(data: string): Course[] {
  const course = JSON.parse(data).courses
  if (!course) return []
  const courseArr: Course[] = []
  for (const key in course) {
    const week = weekConvert(key)
    course[key].forEach((item) => {
      console.log(item)
      const sectionSplitArr = item.sectionNum.split('-')
      const start = parseInt(sectionSplitArr[0])
      const end = parseInt(sectionSplitArr[1])
      const duration = end - start + 1
      const weeks = weeksConvert(item.weeks)
      courseArr.push({
        title: item.courseName,
        location: item.location,
        week,
        start,
        duration,
        weeks,
        teacher: item.teacher,
        credits: item.credits,
        assessmentMethod: item.assessmentMethod,
      })
    })
  }
  return courseArr
}

export const copy = (value) => {
  uni.setClipboardData({
    data: value,
    success() {
      uni.showToast({
        icon: 'success',
        title: '复制成功',
      })
    },
  })
}

/**
 * loadsh-es中的节流无法兼容小程序, 故自己实现
 * @param func
 * @param delay
 * @returns
 */
export function throttle(func: (args: any) => void, delay = 1000) {
  const previousDate = new Date()
  let previous = previousDate.getTime()

  return function (args: any) {
    const nowDate = new Date()
    const now = nowDate.getTime()
    if (now - previous >= delay) {
      // @ts-expect-error
      func.call(this, args)
      previous = now
    }
  }
}

/**
 * 如果图片没有compressed，那么就OBS的图片压缩
 */
export function compressImage(url: string) {
  if (url.includes('compressed')) return url
  return `${url}?x-image-process=image/quality,Q_60`
}

export function AESEncode(text: string) {
  const message = CryptoJS.enc.Utf8.parse(text)
  const secretPassphrase = CryptoJS.enc.Utf8.parse(secretKey)
  const iv = CryptoJS.enc.Utf8.parse(secretKey)

  const encrypted = CryptoJS.AES.encrypt(message, secretPassphrase, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv,
  }).toString()

  return encrypted
}

export function AESDecode(text: string) {
  const secretPassphrase = CryptoJS.enc.Utf8.parse(secretKey)
  const iv = CryptoJS.enc.Utf8.parse(secretKey)
  const decrypted = CryptoJS.AES.decrypt(text, secretPassphrase, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv,
  }).toString(CryptoJS.enc.Utf8)

  return decrypted
}

/**
 * 预览图片
 */
export function previewImage(url: string) {
  uni.previewImage({
    urls: [url],
  })
}

/**
 * 预览多张图片
 */
export function previewImages(urls: string[]) {
  uni.previewImage({
    urls,
  })
}

/**
 * 版本更新
 */
export function updateApp() {
  const updateManager = uni.getUpdateManager()
  updateManager.onCheckForUpdate((res) => {
    if (res.hasUpdate) {
      updateManager.onUpdateReady(() => {
        uni.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success(res) {
            if (res.confirm) updateManager.applyUpdate()
          },
        })
      })
    }
  })
}

/**
 * 强制版本检查
 */
/**
 * 版本更新
 */
export function updateAppHard() {
  const updateManager = uni.getUpdateManager()
  updateManager.onCheckForUpdate((res) => {
    if (res.hasUpdate) {
      updateManager.onUpdateReady(() => {
        uni.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success(res) {
            if (res.confirm) updateManager.applyUpdate()
          },
        })
      })
    } else {
      uni.showModal({
        title: '更新提示',
        content: '当前版本已是最新版本',
        showCancel: false,
      })
    }
  })
}

export { weeksConvert }
