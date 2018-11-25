
const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const Router = require('koa-router');
const mongoose = require('mongoose')

// 主要处理post参数
const bodyParser = require('koa-bodyparser')

// 处理session
const session = require('koa-generic-session') 
const Redis = require('koa-redis') 
const json = require('koa-json') 

// 自定义的包
const dbConfig = require('./dbs/config')
const passport = require('./interface/utils/passport')
const users = require('./interface/users')


const app = new Koa()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

// 处理redis的键值
app.keys = ['mt', 'keykeys']
app.proxy = true

// session 配置
app.use(session({
  key: 'mt',
  prefix: 'mt:uid',  // 前缀
  store: new Redis()  // session基于redis存储
}))

// 处理post请求
app.use(bodyParser({
  extendTypes: ['json', 'form', 'text']
}))

// json美化
app.use(json())


mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true
})

// 初始化passport
app.use(passport.initialize())
app.use(passport.session())

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

const city = require('./interface/city');

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // 使用路由
  app.use(users.routes()).use(users.allowedMethods())


  app.use(ctx => {
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset

    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
