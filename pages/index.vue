<template>
  <div class="page-index">
    <el-row>
      <el-col :span="5">
        <Emenu/>
      </el-col>
      <el-col :span="19">
        <!-- <Life/> -->
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <!-- <Artistic/> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import Emenu from '~/components/index/menu.vue'
// import Life from '~/components/index/life.vue'
// import Artistic from '~/components/index/artistic.vue'
export default {
  components: {
    Emenu,
  },
  data() {
    return {
      list: []
    }
  },
  async asyncData() {
    let {status, data: {list}} = await axios.get('http://127.0.0.1:3000/city/list')
    if (status === 200) {
      return {
        list
      }
    }
  }
}
</script>

<style lang="scss">
 @import "~/assets/css/index/index.scss";
</style>
