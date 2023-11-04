const arrayStringToInt = (arr) => {
  return arr.map((num) => parseInt(num, 10))
}

// 根据实际的cron表达式单个值，逆向解析成子组件类型与子组件对应的初始化数据
export const componentInfoHandle = (value) => {
  const types = {
    every: /^\*$/g, // 每
    none: /^(\?|)$/g, // 不指定
    frequency: /^\d+\/\d+$/g, // 开始与频率
    range: /^\d+-\d+$/g, // 范围
    day: /^(\d+W$)/g, // 工作日
    last: /^(\d*L$)/g, // 最后
    appoint: /^(\d+$|(\d+,)+(\d+)+?$)/g // 自定义
  }
  const ts = Object.keys(types)
  const args = {}
  let type = ''
  for (let i = 0; i < ts.length; i++) {
    if (types[ts[i]].test(value)) {
      type = ts[i]
      if (type === 'frequency') {
        const arr = arrayStringToInt(value.split('/'))
        args['arg1'] = arr[0]
        args['arg2'] = arr[1]
      }
      if (type === 'range') {
        const arr = arrayStringToInt(value.split('-'))
        args['arg1'] = arr[0]
        args['arg2'] = arr[1]
      }
      if (type === 'day') {
        const arr = arrayStringToInt(value.split('W'))
        args['arg1'] = arr[0]
      }
      if (type === 'last') {
        const arr = arrayStringToInt(value.split('L'))
        args['arg1'] = arr[0]
      }
      if (type === 'appoint') {
        const arr = arrayStringToInt(value.split(','))
        args['arg1'] = arr
      }
      break
    }
  }
  // console.log(type)
  return {
    type,
    args
  }
}

// 处理每个时间类型中子组件携带的具体数据
export const componentInfoMergeHandle = (unitItem, args, needMerge) => {
  const { arg1, arg2 } = args
  const { type } = unitItem
  if (needMerge) {
    if (type === 'frequency' || type === 'range') {
      if (unitItem['arg1'] !== undefined) {
        unitItem['arg1'] = arg1
      }
      if (unitItem['arg2'] !== undefined) {
        unitItem['arg2'] = arg2
      }
    } else {
      if (unitItem['arg1'] !== undefined) {
        unitItem['arg1'] = arg1
      }
    }
  } else {
    // 重置
    const { validate, range } = unitItem
    // frequency与range组件的处理逻辑
    if (type === 'frequency' || type === 'range') {
      if (unitItem['arg1'] !== undefined) {
        if (validate) {
          const { min } = validate
          unitItem['arg1'] = min
        }
        if (range) {
          const r = range()
          const v = typeof r[0] === 'object' ? r[0]['value'] : r[0]
          unitItem['arg1'] = v
        }
      }
      if (unitItem['arg2'] !== undefined) {
        if (validate) {
          const { min } = validate
          unitItem['arg2'] = min
        }
        if (range) {
          const r = range()
          const v = typeof r[0] === 'object' ? r[0]['value'] : r[0]
          unitItem['arg2'] = v
        }
      }
    } else if (type === 'appoint') {
      // appoint组件的处理逻辑
      if (unitItem['arg1'] !== undefined) {
        unitItem['arg1'] = []
      }
    } else {
      // 除了上面三种组件的处理逻辑
      if (unitItem['arg1'] !== undefined) {
        if (validate) {
          const { min } = validate
          unitItem['arg1'] = min
        }
        if (range) {
          const r = range()
          const v = typeof r[0] === 'object' ? r[0]['value'] : r[0]
          unitItem['arg1'] = v
        }
      }
      if (unitItem['arg2'] !== undefined) {
        if (validate) {
          const { min } = validate
          unitItem['arg2'] = min
        }
        if (range) {
          const r = range()
          const v = typeof r[0] === 'object' ? r[0]['value'] : r[0]
          unitItem['arg2'] = v
        }
      }
    }
  }
}
