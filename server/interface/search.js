const Router =  require('koa-router');
const axios = require('./utils/axios');

// 登录验证
const sign = require('./utils/sign')


// 前缀
let router = new Router({
  prefix: '/search'
})

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


module.exports = router;
