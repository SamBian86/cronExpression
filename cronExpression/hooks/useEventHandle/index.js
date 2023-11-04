// 事件处理
export default function useEventHandle() {
  // 修改当前时间单位下的子组件类型
  const updateUnitTypeHandle = (item, value) => {
    item['cType'] = value
  }

  // 修改值 这个方法关注的是值的合法性,自带验证并赋以合法的值
  const updateUnitArgsHandle = (unitType, { key, value }) => {
    // debugger
    const { validate } = unitType
    if (validate) {
      if (value <= validate.max && value >= validate.min) {
        unitType[key] = value
      } else {
        if (key === 'arg1') {
          unitType[key] = validate.min
        }
        if (key === 'arg2') {
          unitType[key] = validate.max
        }
      }
    } else {
      if (key === 'arg1') {
        unitType[key] = value
      }
      if (key === 'arg2') {
        unitType[key] = value
      }
    }

    return unitType
  }

  return {
    updateUnitTypeHandle,
    updateUnitArgsHandle
  }
}
