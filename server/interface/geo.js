const Router =  require('koa-router');
const axios = require('./utils/axios');

// 登录验证
const sign = require('./utils/sign')


// 前缀
let router = new Router({
  prefix: '/geo'
})

router.get('/getPosition', async (ctx, next) => {
  let {status, data: {province, city}} = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)
  status === 200
  ? ctx.body = {province, city}
  : ctx.body = {province: '', city: ''}

  

})

module.exports = router