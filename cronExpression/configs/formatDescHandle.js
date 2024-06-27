import { getWeekMap } from './week'
import language from './language'
// hook
import { useCache } from '@/utils/storage'
const cache = useCache()
const lang = cache.getLanguage()
const default_lang = cache.getDefaultLanguage()
const _language = language[lang] || language[default_lang]

// 目标单位时间选项类别
// 用于对每种不同的子选项生成最终的cron表达式的描述
const formatDescHandle = {
  // 每 *
  every: {
    // timeType：秒分时日月周年
    // uType：当前数据源
    // 所有数据元
    formatHandle: (timeType, uType) => {
      return `${_language[uType['type']]}${_language[timeType]}`
    }
  },
  // 不指定 除了年为空其他类型为?
  none: {
    formatHandle: (timeType, uType) => {
      return ''
    }
  },
  // 指定精确开始点与频率 n/m
  frequency: {
    formatHandle: (timeType, uType) => {
      const { arg1, arg2 } = uType
      const weekMap = getWeekMap()
      if (timeType === 'week') {
        const week = weekMap.get(parseInt(arg1, 10))
        return `${_language['from']}${_language[week['language']]}${_language['empty']}${_language['start']}${
          _language['interval']
        }${arg2}${_language['day']}${_language['do']}`
      } else if (timeType === 'year') {
        return `${_language['from']}${arg1}${_language[timeType]}${_language['to']}${arg2}${_language[timeType]}${_language['do']}`
      } else {
        return `${_language['from']}${arg1}${_language[timeType]}${_language['start']}${_language['interval']}${arg2}${_language[timeType]}${_language['do']}`
      }
    }
  },
  // 指定范围 n-m
  range: {
    formatHandle: (timeType, uType) => {
      const { arg1, arg2 } = uType
      const weekMap = getWeekMap()
      if (timeType === 'week') {
        const week1 = weekMap.get(parseInt(arg1, 10))
        const week2 = weekMap.get(parseInt(arg2, 10))
        return `${_language['from']}${_language[week1['language']]}${_language['to']}${_language[week2['language']]}`
      } else {
        return `${_language['from']}${arg1}${_language[timeType]}${_language['to']}${arg2}${_language[timeType]}`
      }
    }
  },
  // 每月离n日最近工作日，这个timeType=day特有的 nW
  day: {
    formatHandle: (timeType, uType) => {
      const { arg1 } = uType
      return `${_language['every']}${_language['month']}${_language['distance']}${arg1}${_language['day']}${_language['near']}${_language['weekday']}`
    }
  },
  // 最后 nL
  last: {
    formatHandle: (timeType, uType) => {
      const { arg1 } = uType
      const weekMap = getWeekMap()
      if (timeType === 'day') {
        return `${_language['this']}${_language['month']}${_language['last']}${_language['one']}${_language['day']}`
      }
      if (timeType === 'week') {
        const week1 = weekMap.get(parseInt(arg1, 10))
        return `${_language['this']}${_language['month']}${_language['last']}${_language['one']}${_language['ge']}${
          _language[week1['language']]
        }`
      }
    }
  },
  // 精准指定 n,n,n
  appoint: {
    formatHandle: (timeType, uType) => {
      const { arg1 } = uType
      const weekMap = getWeekMap()
      const args = []
      const _arg1 = arg1.map((i) => parseInt(i, 10)).sort((x, y) => x - y)
      if (timeType === 'week') {
        _arg1.forEach((arg) => {
          const week = weekMap.get(arg)
          args.push(_language[week['language']])
        })
      } else {
        _arg1.forEach((arg) => {
          args.push(arg)
        })
      }
      return `${timeType === 'week' ? _language['empty'] : _language['at']}${args.join(',')}${
        timeType === 'week' ? _language['empty'] : _language[timeType]
      }`
    }
  }
}

export default formatDescHandle
