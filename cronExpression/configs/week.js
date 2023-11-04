// 星期数据源
export const weekRange = [
  { label: '星期日', value: 1, language: 'SUN' },
  { label: '星期一', value: 2, language: 'MON' },
  { label: '星期二', value: 3, language: 'TUE' },
  { label: '星期三', value: 4, language: 'WED' },
  { label: '星期四', value: 5, language: 'THU' },
  { label: '星期五', value: 6, language: 'FRI' },
  { label: '星期六', value: 7, language: 'SAT' }
]

// 返回星期Map
export const getWeekMap = () => {
  const weekMap = new Map()
  weekRange.forEach((week) => {
    weekMap.set(week['value'], week)
  })
  return weekMap
}
