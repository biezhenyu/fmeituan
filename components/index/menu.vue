<template>
  <div class="m-menu">
    <dl
      class="nav"
      @mouseleave="mouseleave">
      <dt>全部分类</dt>
      <dd
        v-for="(item, index) in $store.state.home.menu"
        :key="index"
        @mouseenter="enter">
        <i :class="item.type"></i>
        {{ item.name }}
        <span class="arrow"></span>
      </dd>
    </dl>
    <div
      v-if="kind"
      class="detail"
      @mouseenter="sover"
      @mouseleave="sout">
      <template
        v-for="(item, index) of curdetail.child">
        <h4 :key="index">{{ item.title }}</h4>
        <span
          v-for="v of item.child"
          :key="v">{{ v }}</span>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        kind: '',
        menu: []
      }
    },
    computed: {
      curdetail () {
        return this.$store.state.home.menu.filter(item => item.type === this.kind)[0]
      }
    },
    methods: {
      mouseleave () {
        this._timer = setTimeout(() => {
          this.kind = ''
        }, 150)
      },
      enter (e) {
        this.kind = e.target.querySelector('i').className
      },
      sover () {
        clearTimeout(this._timer)
      },
      sout () {
        this.kind = ''
      }
    }
  }
</script>

<style lang="scss">

</style>
