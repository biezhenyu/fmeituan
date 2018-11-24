<template>
  <div class="page-register">
    <div class="header">
      <header>
        <a
          href="/"
          class="site-logo"></a>
        <span class="login">
          <em class="bold">已有美团账号？</em>
          <a href="/login">
            <el-button
              type="primary"
              size="small">登录</el-button>
          </a>
        </span>
      </header>
    </div>
    <section>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item
          label="昵称"
          prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email">
          <el-input v-model="ruleForm.email"/>
          <el-button
            size="mini"
            round
            @click="sendMsg">发送验证码
          </el-button>
          <span class="status">{{ msgStatus }}</span>
        </el-form-item>
        <el-form-item
          label="验证码"
          prop="code">
          <el-input
            v-model="ruleForm.code"
            maxlength="4"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="pwd">
          <el-input
            v-model="ruleForm.pwd"
            type="password"></el-input>
        </el-form-item>
        <el-form-item
          label="确定密码"
          prop="cpwd">
          <el-input
            v-model="ruleForm.cpwd"
            type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="register">同意以下协议并注册
          </el-button>
          <div class="error">{{ error }}</div>
        </el-form-item>
        <el-form-item>
          <a
            class="f1"
            href="http://www.meituan.com/about/terms"
            target="_blank">《美团网用户协议》</a>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
  // import CryptoJS from 'crypto-js'

  export default {
    layout: 'blank',
    data () {
      return {
        msgStatus: '',
        error: '',
        ruleForm: {
          name: '',
          email: '',
          code: '',
          pwd: '',
          cpwd: ''
        },
        rules: {
          name: [{
            required: true, type: 'string', message: '请输入昵称', trigger: 'blur'
          }],
          email: [{
            required: true, type: 'email', message: '请输入邮箱', trigger: 'blur'
          }],
          pwd: [{
            required: true, message: '创建密码', trigger: 'blur'
          }],
          cpwd: [{
            required: true, message: '确认密码', trigger: 'blur'
          }, {
            validator: (rule, value, cb) => {
              if (value === '') {
                cb(new Error('请再次输入密码'))
              } else if (value !== this.ruleForm.pwd) {
                cb(new Error('两次输入密码不一致'))
              } else {
                cb()
              }
            },
            trigger: 'blur'
          }]

        }
      }
    },
    methods: {
      sendMsg () {
        let namePass
        let emailPass
        if (this.timerId) {
          return false
        }
        // 验证用户名
        this.$refs.ruleForm.validate('name', (valid) => {
          namePass = valid
        })
        this.msgStatus = ''
        if (namePass) {
          return false
        }
        // 验证邮箱
        this.$refs.ruleForm.validateField('email', (valid) => {
          emailPass = valid
        })
        if (!namePass && !emailPass) {
          
         
        }
      },
      register () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "~/assets/css/register/index.scss";
</style>
