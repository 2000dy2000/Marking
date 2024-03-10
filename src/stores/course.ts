import { pinia } from '~/modules/pinia'

export interface CourseModel {
  title: string
  location: string
  start: number
  duration: number
  credits?: number
  // [1-7]
  week: number
  // [[1-20]]
  weeks: number[]
  color?: string
  teacher?: string
  assessmentMethod?: string
}

export const weekTitle = ['日', '一', '二', '三', '四', '五', '六']

export const courseTimeList = [
  { s: '08:30', e: '09:15' },
  { s: '09:20', e: '10:05' },
  { s: '10:25', e: '11:10' },
  { s: '11:15', e: '12:00' },
  { s: '13:50', e: '14:35' },
  { s: '14:40', e: '15:25' },
  { s: '15:45', e: '16:30' },
  { s: '16:35', e: '17:20' },
  { s: '18:20', e: '19:05' },
  { s: '19:10', e: '19:55' },
  { s: '20:00', e: '20:45' },
]

const colorMap = new Map<string, string>()

// @unocss-include
export const colorList = [
  [
    '#78715d',
    '#CE7CF4',
    '#FF7171',
    '#66CC99',
    '#FF9966',
    '#66CCCC',
    '#6699CC',
    '#99CC99',
    '#669966',
    '#66CCFF',
    '#99CC66',
    '#FF9999',
    '#81CC74',
  ],
  [
    '#99CCFF',
    '#FFCC99',
    '#CCCCFF',
    '#99CCCC',
    '#A1D699',
    '#7397db',
    '#ff9983',
    '#87D7EB',
    '#99CC99',
  ],
]

const conflictCourseMap = new Map<CourseModel, CourseModel[]>()

export const useCourseStore = defineStore('course', () => {
  const isStart = ref<boolean>(false)
  const startDate = ref<Date | string>(new Date())
  const weekNum = ref<number>(20)
  const courseList = ref<CourseModel[]>([])
  const currentMonth = ref<number>(0)

  const originalWeekIndex = ref<number>(0)
  const currentWeekIndex = ref<number>(0)
  const originalWeekWeekIndex = ref<number>(
    // new Date().getDay() === 0 ? 6 : new Date().getDay() - 1
    new Date().getDay(),
  )

  //
  const colorArrayIndex = ref<number>(0)

  /**
   * set start date
   * @param someDate the start date of the semester
   */
  function setStartDay(someDate: string | Date) {
    startDate.value = new Date(someDate)
    const days = new Date().getTime() - startDate.value.getTime()
    isStart.value = days > 0
    const week = Math.floor(days / (1000 * 60 * 60 * 24 * 7))
    originalWeekIndex.value = week < 0 ? 0 : week
    setCurrentWeekIndex(originalWeekIndex.value)
  }

  /**
   * change current week index
   * @param weekIndex the new week index
   */
  function setCurrentWeekIndex(weekIndex: number) {
    // conflictCourseMap.clear()
    currentWeekIndex.value = weekIndex
    // change current month
    const someDate = new Date(startDate.value)
    someDate.setDate(someDate.getDate() + weekIndex * 7)
    currentMonth.value = someDate.getMonth() + 1
  }

  /**
   * init course list
   * @param newCourseList new course list
   */
  function setCourseList(newCourseList: CourseModel[]) {
    conflictCourseMap.clear()
    // sort by week and start
    courseList.value = newCourseList.sort(
      (a, b) => a.week - b.week || a.start - b.start,
    )
    resetCourseBgColor()
  }

  // current week course list
  const weekCourseList = computed(() => {
    if (courseList.value) {
      return courseList.value.filter(item =>
        item.weeks.includes(currentWeekIndex.value + 1),
      )
    }
    return []
  })

  const computedCourseList = () => {
    // init a course array
    const _parsedCourseList = Array.from({ length: weekNum.value }, () =>
      Array.from({ length: 7 }, () => Array.from({ length: 6 }, () => 0)),
    )
    if (courseList.value) {
      // process course list
      console.log('courseList.value', courseList.value)
      for (const courseItem of courseList.value) {
        const { start, duration, week, weeks } = courseItem
        // console.log('weeks', weeks)

        if (!start)
          continue

        for (const w of weeks) {
          if (w - 1 >= weekNum.value) {
            // uni.showToast({
            //   title: `课程 ${courseItem.title} 周数超出范围1-${weekNum.value}`,
            //   icon: 'none',
            // })
            // 增加周数
            console.log('------------------')
            console.log(
              '出现了超出周数的课程， 总周数',
              weekNum.value,
              'to',
              w + 5,
            )
            weekNum.value = w + 5
            // 重新计算
            return computedCourseList()
          }

          // console.log(
          //   'parsedCourseLists',
          //   w,
          //   week,
          //   courseItem,
          //   _parsedCourseList
          // )
          // 针对周数数据异常的数据进行处理
          if (w === null || isNaN(w) || w === undefined)
            continue
          const dayCourseList = _parsedCourseList[w - 1][week]
          // console.log('dayCourseList', dayCourseList)
          dayCourseList[Math.floor(start / 2)]++
          // some courses may last more than 2 times
          const durationTimes = Math.ceil(duration / 2)
          for (let i = 1; i < durationTimes; i++)
            dayCourseList[Math.floor(start / 2 + i)]++
          // if (duration > 2)
          //   dayCourseList[Math.floor(start / 2 + 1)]++
        }
      }
    }

    return _parsedCourseList
  }

  // data for course action
  const parsedCourseList = computed(computedCourseList)

  const getAllWeekCourseList = () => {
    const tempList: CourseModel[][] = []
    parsedCourseList.value.forEach((weekCourseList, weekIndex) => {
      if (courseList.value) {
        const arr = courseList.value.filter((item) => {
          return item.weeks.includes(weekIndex + 1)
        })
        tempList.push(arr)
      }
    })
    return tempList
  }

  // current week date list
  const currentWeekDayArray = computed(() => {
    const weekIndex = currentWeekIndex.value
    const someDate = new Date(startDate.value)
    someDate.setDate(someDate.getDate() + weekIndex * 7)
    const dayArray: number[] = []
    dayArray.push(someDate.getDate())
    for (let i = 0; i < 6; i++) {
      someDate.setDate(someDate.getDate() + 1)
      dayArray.push(someDate.getDate())
    }
    console.log('dayArray', dayArray)
    return dayArray
  })

  const getWeekDayArray = () => {
    const tempArr: number[][] = []
    parsedCourseList.value.forEach((weekCourseList, weekIndex) => {
      const someDate = new Date(startDate.value)
      someDate.setDate(someDate.getDate() + weekIndex * 7)
      const dayArray: number[] = []
      dayArray.push(someDate.getDate())
      for (let i = 0; i < 6; i++) {
        someDate.setDate(someDate.getDate() + 1)
        dayArray.push(someDate.getDate())
      }
      tempArr.push(dayArray)
    })
    return tempArr
  }
  /**
   * list of course for a certain course item time
   * @param courseItem the course item
   */
  function getConflictCourse(courseItem: CourseModel): CourseModel[] {
    if (!courseItem)
      return []
    const { week, start } = courseItem
    return courseList.value.filter((item) => {
      return (
        item.weeks.includes(currentWeekIndex.value + 1)
        && item.week === week
        && item.start === start
      )
    })
  }

  /**
   * list of course for a certain course item time with map
   * @param courseItem the course item
   */
  function hasConflictCourseByMap(courseItem: CourseModel): CourseModel[] {
    if (!conflictCourseMap.has(courseItem))
      conflictCourseMap.set(courseItem, getConflictCourse(courseItem))
    return conflictCourseMap.get(courseItem) || []
  }

  /**
   * reset course bg color
   */
  function resetCourseBgColor() {
    colorMap.clear()
    if (courseList.value) {
      courseList.value.map(courseItem =>
        Object.assign(courseItem, { color: getCourseColor(courseItem) }),
      )
    }
  }

  /**
   * get course item color
   * @param courseItem course item
   * @returns course color
   */
  function getCourseColor(courseItem: CourseModel): string {
    const colorArray = colorList[colorArrayIndex.value]
    const { title } = courseItem
    if (!colorMap.has(title))
      colorMap.set(title, colorArray[colorMap.size % colorArray.length])
    return colorMap.get(title) || 'bg-white'
  }

  watch(
    () => colorArrayIndex.value,
    () => resetCourseBgColor(),
  )

  /**
   * set a course to top when there have more than one course in the same time
   * @param courseItem course item
   */
  function setCourseItemTop(courseItem: CourseModel) {
    // TODO: set course item to top, not work now
    deleteCourseItem(courseItem)
    courseList.value.unshift(courseItem)
  }

  /**
   * delete a course
   * @param courseItem course item
   */
  function deleteCourseItem(courseItem: CourseModel) {
    conflictCourseMap.clear()
    const { title, week, start } = courseItem
    for (let i = 0; i < courseList.value.length; i++) {
      const item = courseList.value[i]
      if (item.title === title && item.week === week && item.start === start)
        courseList.value.splice(i, 1)
    }
  }

  /**
   * delete a course by title
   * @param courseTitle course title
   */
  function deleteCourseItemByTitle(courseTitle: string) {
    conflictCourseMap.clear()
    for (let i = 0; i < courseList.value.length; i++) {
      const item = courseList.value[i]
      if (item.title === courseTitle)
        courseList.value.splice(i, 1)
    }
  }

  return {
    isStart,
    startDate,
    weekNum,
    currentMonth,
    courseList,
    setCourseList,
    weekCourseList,
    parsedCourseList,
    originalWeekIndex,
    currentWeekIndex,
    originalWeekWeekIndex,
    currentWeekDayArray,
    colorArrayIndex,
    setStartDay,
    setCurrentWeekIndex,
    getConflictCourse,
    hasConflictCourseByMap,
    setCourseItemTop,
    deleteCourseItem,
    deleteCourseItemByTitle,
    getAllWeekCourseList,
    getWeekDayArray,
  }
})

// Need to be used outside the setup
export function useCourseStoreWidthOut() {
  return useCourseStore(pinia)
}
