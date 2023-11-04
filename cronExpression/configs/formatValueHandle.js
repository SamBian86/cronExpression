// 目标单位时间选项类别
// 用于对每种不同的子组件生成最终的cron表达式值
const formatValueHandle = {
  // 每 *
  every: {
    // timeType：秒分时日月周年
    // uType：当前数据源
    // 所有数据元
    formatHandle: (timeType, uType) => {
      return '*'
    }
  },
  // 不指定 除了年为空其他类型为?
  none: {
    formatHandle: (timeType, uType) => {
      if (timeType === 'year') {
        return ''
      } else {
        return '?'
      }
    }
  },
  // 指定精确开始点与频率 n/m
  frequency: {
    formatHandle: (timeType, uType) => {
      const { arg1, arg2 } = uType
      return `${arg1}/${arg2}`
    }
  },
  // 指定范围 n-m
  range: {
    formatHandle: (timeType, uType) => {
      const { arg1, arg2 } = uType
      return `${arg1}-${arg2}`
    }
  },
  // 每月离n日最近工作日，这个timeType=day特有的 nW
  day: {
    formatHandle: (timeType, uType) => {
      const { arg1 } = uType
      return `${arg1}W`
    }
  },
  // 最后 nL
  last: {
    formatHandle: (timeType, uType) => {
      const { arg1 } = uType
      if (timeType === 'day') {
        return 'L'
      } else if (timeType === 'week') {
        return `${arg1}L`
      } else {
        return `${arg1}L`
      }
    }
  },
  // 精准指定 n,n,n
  appoint: {
    formatHandle: (timeType, uType) => {
      const { arg1 = [] } = uType
      return arg1.join()
    }
  }
}

export default formatValueHandle
