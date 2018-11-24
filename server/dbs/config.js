/**
 * 公共配置
 * 通过设置get设置只读
 */


module.exports = {
  dbs: 'mongodb://127.0.0.1:27017',

  // redis的配置
  redis: {
    get host() {
      return '127.0.0.1' 
    },
    get port() {
      return 6379
    }
  },

  // qq邮箱配置
  smtp: {
    get host() {
      return 'smtp.qq.com'
    },
    getUser() {
      return '592600407@qq.com'
    },
    get pass() {
      return 'ecdxjvwdxibnbdgb'
    },
    // 验证码
    get code() {
      return () => {
        return Math.random().toString(16).slice(2, 6).toUpperCase()
      }
    },

    // 过期时间
    get expire() {
      return () => {
        // 一分钟
        return new Date().getTime() + 60 * 1000
      }
    }
  }

  
}
