<template>
  <div class="m-geo">
    <i class="el-icon-location" />{{ $store.state.geo.position.city }}
    <nuxt-link
      class="changeCity"
      to="/changeCity">
      切换城市
    </nuxt-link>
    [香河，天津，廊坊]
  </div> 
</template>
<script>
import {mapState} from 'vuex'
export default {
  computed: {
   
  }
}
</script>
<style lang="scss" scoped>

</style>
