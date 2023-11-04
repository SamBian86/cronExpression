import { weekRange } from './week'

// 获取数字区间数组
const getRangeList = (start, end) => {
  const length = end - start + 1
  const arr = Array.from({ length })
  return arr.map((item, index) => `${index + start}`)
}

// 格式化时间
const dateFormat = (time, format = 'YYYY-MM-DD HH:mm:ss') => {
  const date = new Date(time)
  const YYYY = date.getFullYear()
  const M = date.getMonth() + 1
  const D = date.getDate()
  const H = date.getHours()
  const m = date.getMinutes()
  const s = date.getSeconds()
  const dateObj = {
    YYYY,
    M,
    MM: M < 10 ? '0' + M : M,
    D,
    DD: D < 10 ? '0' + D : D,
    H,
    HH: H < 10 ? '0' + H : H,
    m,
    mm: m < 10 ? '0' + m : m,
    s,
    ss: s < 10 ? '0' + s : s
  }
  const _match = format.match(/[a-zA-Z]+/g)
  if (_match && _match.length !== 0) {
    _match.forEach((item) => {
      format = format.replace(item, dateObj[item])
    })
    return format
  } else {
    return ''
  }
}

// 时间类别及对应子组件默认数据配置
const timeTypes = [
  // unitType 时间单位类型
  {
    timeType: 'second', // 秒
    language: 'second',
    disabled: false, // 是否禁用
    cValue: '*', // 最终的值，用于作为最后提交表单的数据
    cType: '', // 当前选中的类型，用于子类，例如:every, frequency, none, range, last, appoint, day, 使用updateUnitTypeHandle方法更新
    cDesc: '', // 描述
    unitTypes: [
      {
        type: 'every' // 每 *
      },
      {
        type: 'frequency', // 指定精确开始点与频率 n/m
        arg1: '',
        arg2: '',
        validate: {
          min: 0,
          max: 59
        }
      },
      {
        type: 'range', // 指定范围 n-m
        arg1: '',
        arg2: '',
        validate: {
          min: 0,
          max: 59
        }
      },
      {
        type: 'appoint', // 精准指定 n,n,n,n
        arg1: [],
        range: () => {
          return getRangeList(0, 59)
        }
      }
    ]
  },
  {
    timeType: 'minute', // 分钟
    language: 'minute',
    disabled: false, // 是否禁用
    cValue: '*',
    cType: '',
    cDesc: '',
    unitTypes: [
      {
        type: 'every' // 每 *
      },
      {
        type: 'frequency', // 指定精确开始点与频率 n/m
        arg1: '',
        arg2: '',
        validate: {
          min: 0,
          max: 59
        }
      },
      {
        type: 'range', // 指定范围 n-m
        arg1: '',
        arg2: '',
        validate: {
          min: 0,
          max: 59
        }
      },
      {
        type: 'appoint', // 精准指定 n,n,n,n
        arg1: [],
        range: () => {
          return getRangeList(0, 59)
        }
      }
    ]
  },
  {
    timeType: 'hour', // 小时
    language: 'hour',
    disabled: false, // 是否禁用
    cValue: '*',
    cType: '',
    cDesc: '',
    unitTypes: [
      {
        type: 'every' // 每 *
      },
      {
        type: 'frequency', // 指定精确开始点与频率 n/m
        arg1: '',
        arg2: '',
        validate: {
          min: 0,
          max: 23
        }
      },
      {
        type: 'range', // 指定范围 n-m
        arg1: '',
        arg2: '',
        validate: {
          min: 0,
          max: 23
        }
      },
      {
        type: 'appoint', // 精准指定 n,n,n,n
        arg1: [],
        range: () => {
          return getRangeList(0, 23)
        }
      }
    ]
  },
  {
    timeType: 'day', // 日
    language: 'day',
    disabled: false, // 是否禁用
    cValue: '*',
    cType: '', // 当前选中的类型
    cDesc: '',
    unitTypes: [
      {
        type: 'every' // 每 *
      },
      {
        type: 'none' // 不指定
      },
      {
        type: 'last' // 最后一个 nL
      },
      {
        type: 'frequency', // 指定精确开始点与频率 n/m
        validate: {
          min: 1,
          max: 31
        },
        arg1: '',
        arg2: ''
      },
      {
        type: 'range', // 指定范围 n-m
        validate: {
          min: 1,
          max: 31
        },
        arg1: '',
        arg2: ''
      },
      {
        type: 'day', // 每月离n日最近工作日，这个timeType=day特有的 nW
        validate: {
          min: 1,
          max: 31
        },
        arg1: ''
      },
      {
        type: 'appoint', // 精准指定 n,n,n,n
        arg1: [],
        range: () => {
          return getRangeList(1, 31)
        }
      }
    ]
  },
  {
    timeType: 'month',
    language: 'month',
    disabled: false, // 是否禁用
    cValue: '*',
    cType: '', // 当前选中的类型
    cDesc: '',
    unitTypes: [
      {
        type: 'every' // 每 *
      },
      {
        type: 'frequency', // 指定精确开始点与频率 n/m
        arg1: '',
        arg2: '',
        validate: {
          min: 1,
          max: 12
        }
      },
      {
        type: 'range', // 指定范围 n-m
        arg1: '',
        arg2: '',
        validate: {
          min: 1,
          max: 12
        }
      },
      {
        type: 'appoint', // 精准指定 n,n,n,n
        arg1: [],
        range: () => {
          return getRangeList(1, 12)
        }
      }
    ]
  },
  {
    timeType: 'week',
    language: 'week',
    disabled: false, // 是否禁用
    cValue: '?',
    cType: '', // 当前选中的类型
    cDesc: '',
    unitTypes: [
      {
        type: 'none' // 不指定
      },
      {
        type: 'every' // 每 *
      },
      {
        type: 'frequency', // 指定精确开始点与频率 n/m
        validate: {
          min: 1,
          max: 7
        },
        range: () => {
          return weekRange
        },
        arg1: '',
        arg2: ''
      },
      {
        type: 'range', // 指定范围 n-m
        range: () => {
          return weekRange
        },
        arg1: '',
        arg2: ''
      },
      {
        type: 'last', // 最后一个 nL
        range: () => {
          return weekRange
        },
        arg1: ''
      },
      {
        type: 'appoint', // 精准指定 n,n,n,n
        arg1: [],
        range: () => {
          return weekRange
        }
      }
    ]
  },
  {
    timeType: 'year',
    language: 'year',
    disabled: false, // 是否禁用
    cValue: '*',
    cType: '', // 当前选中的类型
    cDesc: '',
    unitTypes: [
      {
        type: 'every' // 每 *
      },
      {
        type: 'none' // 不指定
      },
      {
        type: 'range', // 指定范围 n-m
        arg1: '',
        arg2: '',
        range: () => {
          const year = parseInt(dateFormat(new Date(), 'YYYY'), 10)
          return getRangeList(year, year + 100)
        }
      }
    ]
  }
]

export default timeTypes
