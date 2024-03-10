import dayjs from 'dayjs'

export function formatTimeAgo(date) {
  date = dayjs(date)
  const now = dayjs()

  // 如果是未来的日期
  if (now.diff(date) < 0)
    return `${date.year()}年${date.month() + 1}月${date.date()}日`

  const diffSeconds = now.diff(date, 'second')
  const diffMinutes = now.diff(date, 'minute')
  const diffHours = now.diff(date, 'hour')
  const diffDays = now.diff(date, 'day')
  const diffMonths = now.diff(date, 'month')
  //   const diffYears = now.diff(date, 'year')

  if (diffSeconds < 60)
    return `${diffSeconds}秒前`

  if (diffMinutes < 60) { return `${diffMinutes}分钟前` }

  else if (diffHours < 24) { return `${diffHours}小时前` }

  else if (diffDays < 7) {
    if (diffDays === 1)
      return `昨天 ${date.format('HH:mm')}`
    else if (diffDays === 2)
      return `前天 ${date.format('HH:mm')}`
    else
      return `${diffDays}天前`
  }

  else if (diffMonths < 12) { return `${date.month() + 1}月${date.date()}日` }

  else { return `${date.year()}年${date.month() + 1}月${date.date()}日` }
}
