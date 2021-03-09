import moment from '@/utils/moment'

export default {
  /**
   * 获取时间范围的格式化字符串和距离调用时刻的时间戳
   * 
   * @param {String} format 格式化字符串 
   * @param {Number} scope 从今日到此结束日的天数。比如获取30天的时间范围
   * @param {Number} mark 标记日期。day表示子今日起多少天（含今日），text需要标记的字符串，after此后的日期使用此值
   * @param {Number} now 如果传入此值，则从此刻开始计算
   */
  timestampScope(format, scope, mark = {
    day: Number,
    text: String,
    after: String,
  }, now) {
    const array = new Array(scope)
    for (let index = 0; index < array.length; index++) {
      const timestamp = moment(now).add(index, 'days')

      // mark
      let formatter = timestamp.format(format)
      if (mark.text && (index + 1) === mark.day) {
        formatter += mark.text
      } else if (mark.after && index >= mark.day) {
        formatter += mark.after
      }

      array[index] = {
        formatter,
        timestamp: timestamp.valueOf()
      }
    }
    return array
  }
}
