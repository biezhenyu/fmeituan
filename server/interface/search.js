const Router =  require('koa-router');
const axios = require('./utils/axios');

// 登录验证
const sign = require('./utils/sign')


// 前缀
let router = new Router({
  prefix: '/search'
})

// 获取搜索结果
router.get('/top', async (ctx) => {
  let { status, data: { top } } = await axios.get(`http://cp-tools.cn/search/top`, {
    params: {
      input: ctx.query.input,
      city: ctx.query.city,
      sign
    }
  }) 
  ctx.body = {
    top: status === 200 ? top : []
  }
})

// 获取热搜
router.get('/hotPlace', async (ctx) => {
  let city = ctx.store ? ctx.store.geo.position.city : ctx.query.city
  let {status, data: {result}} = await  await axios.get(`http://cp-tools.cn/search/hotPlace`, {
    params: {
      city,
      sign
    }
  })
  ctx.body = {
    result: status === 200 ? result : []
  }
})




module.exports = router;
