const Router =  require('koa-router');
const axios = require('./utils/axios');

// 登录验证
const sign = require('./utils/sign')

const Province = require('../dbs/models/province')


// 前缀
let router = new Router({
  prefix: '/geo'
})

// 获取位置
router.get('/getPosition', async (ctx, next) => {
  let {status, data: {province, city}} = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)
  status === 200
  ? ctx.body = {province, city}
  : ctx.body = {province: '', city: ''}
})

// 获取省份列表
router.get('/province', async (ctx, next) => {
  const {status, data: {province}} = await axios.get(`http://cp-tools.cn/geo/province?sign=${sign}`)
  ctx.body = {
    province: status === 200 ? province : []
  }
  await Province.collection.insertMany(province, {}, (err, docs) => {
    if (err) {
      console.info('err');
    } else {
      console.info('%d potatoes were successfully stored.', docs.length);
    }
  })
})

// 获取菜单
router.get('/menu', async (ctx, next) => {
  const {status, data: {menu}} = await axios.get(`http://cp-tools.cn/geo/menu?sign=${sign}`)
  status === 200
  ? ctx.body = {menu}
  : ctx.body = {menu: []}
})

module.exports = router