import moment from 'moment'

export const FORMATTER = 'YYYY年MM月DD日'
export const FORMATTER_WEEK = 'YYYY年MM月DD日（周dd）'

export const format = (timestamp, formatter) => {
  return moment(timestamp).format(formatter || FORMATTER)
}

export const formatWeek = (timestamp) => {
  return format(timestamp, FORMATTER_WEEK)
}

moment.locale('zh-CN')

export default moment