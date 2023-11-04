const utils = {
  // 周与日数据互斥逻辑处理
  formatMuExHandle: (expression, muExInfo) => {
    const { from } = muExInfo
    const expressions = expression.split(' ')
    if (from === 'day') {
      expressions.splice(5, 1, '?')
      return expressions.join(' ')
    } else if (from === 'week') {
      expressions.splice(3, 1, '?')
      return expressions.join(' ')
    } else {
      return expression
    }
  }
}
export default utils
