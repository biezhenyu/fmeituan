<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col
        :span="3"
        class="left">
        <img
          src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png"
          alt="美团"/>
      </el-col>
      <el-col
        :span="15"
        class="center">
        <div class="wrapper">
          <el-input
            placeholder="搜索商家或地点"/>
          <button
            class="el-button el-button--primary">
            <i class="el-icon-search"></i>
          </button>
          <dl
            v-if="false"
            class="hotPlace">
            <dt>热门搜索</dt>
            <dd>
              
            </dd>
          </dl>
          <dl
            v-if="false"
            class="searchList">
            <dd>
              
            </dd>
          </dl>
        </div>
        <p class="suggest">
          <a></a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link
              to="/"
              class="takeout">美团外卖
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="movie">猫眼电影
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="hotel">美团酒店
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="apartment">民宿/公寓
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="business">商家入驻
            </nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col
        :span="6"
        class="right">
        <ul class="security">
          <li>
            <i class="refund"></i>
            <p class="txt">随时退</p>
          </li>
          <li>
            <i class="single"></i>
            <p class="txt">不满意免单</p>
          </li>
          <li>
            <i class="overdue"></i>
            <p class="txt">过期退</p>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import _ from 'lodash'

  export default {
    data () {
      return {
        search: '',
        isFocus: false,
        hotPlace: [],
        searchList: []
      }
    },
    computed: {
     
    },
    methods: {
     
    }
  }
</script>

<style lang="css">

</style>
