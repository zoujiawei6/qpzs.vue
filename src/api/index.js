import utils from '../utils'
import request from './request'

export const API = process.env.NODE_ENV === 'development' ? '/api' : ''
const ASYNC_QUERY_TRAIN = API + '/train/queryTrain'
const TRAIN_LIST = API + '/train/list'
const HOT_LIST  = API + '/train/hotList '
const RUSH  = API + '/train/rush '

/**
 * 查询火车消息 
 * + start  (出发站，值为 前面查询列表返回的code)
 * + end  (目的站，值为 前面查询列表返回的code)
 * + time  (非必填，不传默认查询明天，不能查询已过期时间，格式‘2020-12-24’)
 * 
 * ---
 * 
 * 返回结果：
 * 
 * + a 车次 
 * + b 出发地 
 * + c 目的地
 * + d 出发时间
 * + e 到达时间
 * + f 历时
 * + g 商务|特等座
 * + h 一等座
 * + i 二等座|二等包座
 * + j 高级软卧
 * + k 软卧|一等卧
 * + l 动卧
 * + m 硬卧|二等卧
 * + n 软座
 * + o 硬座
 * + p 无座
 * 
 * @param {*} param0 
 */
export const queryTrain = ({
  limit,
  offset,
  start,
  end,
  time
}) => {
  if (utils.isDevelopment()) {
    return require('./mock/query_train.json')
  }
  const result = request({
    method: 'get',
    url: ASYNC_QUERY_TRAIN,
    params: {
      limit,
      offset,
      start,
      end,
      time
    },
  })
  return result
}

/**
 * 值为空时查询全部站点，name 支持模糊查询，输入一个字即可搜索
 * 
 * @param {*} param0 
 */
export const trainList = ({
  name,
}) => {
  if (utils.isDevelopment()) {
    return {
      list: [{
        id: 3,
        name,
        code: 'A' + name
      }, {
        id: 34,
        name: name + "测试",
        code: 'B' + name
      }],
    }
  }
  const result = request({
    method: 'get',
    url: TRAIN_LIST,
    params: {
      name
    },
  })
  return result
}

/**
 * 热门站点
 */
export const hotList = () => {
  const result = request({
    method: 'get',
    url: HOT_LIST,
  })
  return result
}

/**
 * 热门站点
 */
export const rush = (data) => {
  const result = request({
    method: 'post',
    url: RUSH,
    data
  })
  return result
}