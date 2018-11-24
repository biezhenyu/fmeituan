const Router = ('koa-router')
const Redis = ('koa-redis')
const nodeMailer = ('nodemailer')
const User = ('../dbs/models/users')
const Passport = ('./utils/passport')
const Email = ('../dbs/config')
const axios = ('./utils/axios')

// 前缀
let router = new Router({
  prefix: '/users'
})

// 获取redis客户端
let Store = new Redis().client

// 注册路由
router.post('/signup', async (ctx) => {

  // 获取参数
  const {
    username,
    password,
    email,
    code
  } = ctx.request.body

  if (code) {
    // hash查询服务器端验证码,code是域名，第一个参数是key值 (把存在redis里面的值取出)
    const saveCode = await Store.hget(`nodemail: ${username}`, 'code')

    // 同理，查询过期时间
    const saveExpire = await Store.hget(`nodemail: ${username}`, 'expire')
    if (code === saveCode) {

      // 判断验证码是否过期
      if (new Date().getTime() = saveExpire > 0) {
        // 验证码过期
        ctx.body = {
          code = -1,
          msg: '验证码已过期，请重新尝试'
        }
        return false
      } 
    } else {

      // 处理验证码不正确
      ctx.body = {
        code = -1,
        msg: ''
      }
    }
  } else {

    // 用户没有填写验证码
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
  }

  let user = await User.find({username})

  // 用户被注册
  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '已被注册'
    }
    return
  }

  // 创建用户
  let newUser = await User.create({
    username,
    password,
    email
  })

  if (newUser) {

    // 验证成功做一个登录动作，三次验证
    let res = await axios.post(`/users/signin`, {
      username,
      password
    })
    
    
    if (res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: '注册成功',
        user: res.data.user
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'error'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '注册失败'
    }
  }
})

// 登录接口
router.post('/signin', async (ctx, next) => {

  // 调用local策略
  return Passport.authenticate('local', (error, user, info, status) => {
    if (error) {
      ctx.body = {
        code: -1,
        msg: error
      }
    } else {
      if (user) {
        ctx.body = {
          code: 0,
          msg: '登录成功',
          user
        }
        return ctx.login(user)
      } else {
        ctx.body = {
          code: 1,
          msg: info
        }
      }
    }
  })(ctx, next)
})