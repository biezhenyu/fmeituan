const Router =  require('koa-router');
const axios = require('./utils/axios');

// 登录验证
const sign = require('./utils/sign')

const Province = require('../dbs/models/province')
const Menu = require('../dbs/models/menu')


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

  // 查询数据库的数据
  let province = await Province.find()
  let newProvince = []
  province = province.forEach(item => {
    newProvince.push({id: item.id, name: item.name})
  })
 
  ctx.body = {
    province: newProvince || []
  }

  // const {status, data: {province}} = await axios.get(`http://cp-tools.cn/geo/province?sign=${sign}`)
  // ctx.body = {
  //   province: status === 200 ? province : []
  // }

  // 将爬取到的数据存入数据库

  /*
  await Province.collection.insertMany(province, {}, (err, docs) => {
    if (err) {
      console.info('err');
    } else {
      console.info('%d potatoes were successfully stored.', docs.length);
    }
  })
  */
})

// 获取菜单
router.get('/menu', async (ctx, next) => {

  let menu = await Menu.find()
  let newMenu = []
  menu.forEach(item => newMenu.push({name: item.name, type: item.type, child: item.child}))
  ctx.body = {menu: newMenu || []}

  // const {status, data: {menu}} = await axios.get(`http://cp-tools.cn/geo/menu?sign=${sign}`)

  // // 将获取到的数据插入数据库
  // await Menu.collection.insertMany(menu, {}, (err, docs) => {
  //   if (err) {
  //     console.info('err');
  //   } else {
  //     console.info('success');
  //   }
  // })

  // status === 200
  // ? ctx.body = {menu}
  // : ctx.body = {menu: []}
})

module.exports = router