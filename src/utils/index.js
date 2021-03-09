export default {
  /**
   * 如果当前是开发者模式返回true
   */
  isDevelopment() {
    return process.env.NODE_ENV === 'development'
  },
}