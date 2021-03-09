import axios from 'axios'
import { Message } from 'element-ui'
import { API } from '.'

const request = axios.create({
  baseURL: API,
  // 请求超时时间
  timeout: 5000,
  // proxy: {
  //   host: '127.0.0.1',
  //   port: 80,
  // },
})


request.interceptors.response.use(
  async (response) => {
      const {
        data
      } = response
      return data
    },
    async (error) => {
      if (error.message) {
        // 显示提示
        Message({
          message: error.message,
          type: 'error',
          duration: 3 * 1000
        })
      }
    },
)

export default request