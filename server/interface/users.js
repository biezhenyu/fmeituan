const Router = require('koa-router')
const Redis = require('koa-redis')
const nodeMailer = require('nodemailer')
const User = require('../dbs/models/users')
const Passport = require('./utils/passport')
const Email = require('../dbs/config')
const axios = require('./utils/axios')

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
          code: -1,
          msg: '验证码已过期，请重新尝试'
        }
        return false
      } 
    } else {

      // 处理验证码不正确
      ctx.body = {
        code: -1,
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

// 验证码
router.post('/verify', async (ctx, next) => {
  let username = ctx.request.body.username
  
  // 拿到redis里面的过期时间
  const saveExpire = await Store.hget(`nodemail: ${username}`, 'expire')
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '验证请求过于频繁，1分钟内1次'
    }
    return false
  }

  let transporter = nodeMailer.createTransport({
    host: Email.smtp.host,
    post: 587,
    secure: false,
    auth: {  // 验证
      user: Email.smtp.user,
      pass:  Email.smtp.pass
    }
  })

  // 验证码参数
  let params = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username
  }
  console.log(params.code, 'code')
  // 邮件信息
  let mailOption = {
    from: `"认证邮件" <${Email.smtp.user}>`,
    to: params.email,
    subject: '美团SSR注册码',
    html: `您在美团SSR中注册，您的验证码是${params.code}`
  }

  // 发送邮件
  await transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      return console.log('error')
    } else {
      // redis存储
      Store.hmset(`nodemail: ${params.user}`, 'code', params.code, 'expire', params.expire, 'email', params.email)
    }
  })
  ctx.body = {
    code: 0,
    msg: '验证码已发送，可能会有延时，有效期一分钟'
  }
})

// 退出
router.get('/exit', async (ctx, next) => {
  await ctx.logout()
  
  // 检查是否在登录状态， isAuthenticated 这个方法是在Passport这个包里面定义的
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})

// 获取用户信息
router.get('/getUser', async (ctx, next) => {
  if (!ctx.isAuthenticated()) {
    const {username, email} = ctx.session.passport.user
    ctx.body = {
      user: username,
      email
    } 
  } else {
    ctx.body = {
      user: '',
      email: ''
    }
  }
})

module.exports = router
