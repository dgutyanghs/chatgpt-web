<script lang="ts">
import { defineComponent } from 'vue'
import { loginApi } from '@/api/login'

import { router } from '@/router'
export default defineComponent({
  setup() {
    const login = async (account: string, password: string) => {
      console.log('!!! a= %s, b = %s', account, password)
      try {
        const res = await loginApi({ account, password })
        console.log('res:', res)
        localStorage.setItem('userinfo', account)
        router.push({path:'/'})
      } catch (error) {
        console.log('catch error:', error)
        alert("登录失败，Authorization failed")
      }
    }
    return {
      login,
    }
  },
  data() {
    return {
      account: '',
      password: '',
    }
  },
})
</script>

<template>
  <div id="login_wrap" class="clearfix">
    <h2 class="title">
      登陆
    </h2>
    <div id="login">
      <div class="login--account">
        <span>账号：</span>
        <input
          v-model.trim="account"
          type="text"
          placeholder="account"
          name="account"
        >
      </div>
      <div class="login--password">
        <span>密码：</span>
        <input
          v-model.trim="password"
          type="password"
          placeholder="password"
          name="password"
        >
      </div>
      <p class="login--btn">
        <button id="loginBtn" class="theme-all" @click="login(account, password)">
          登录
        </button>
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.title {
    text-align: center;
    font-size: 22px;
    padding-top: 100px;
}
#login_wrap {
    position: relative;
    background: rgba(64, 64, 194, 0.1);
    height: 100vh;
    > div {
        background: #fff;
        width: 479px;
        height: 325px;
        padding: 30px 40px;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        > div {
            padding: 10px 0;
            border-bottom: 1px solid #ddd;
            &.login--account {
                margin: 25px 0 30px;
            }
            span {
                color: #666;
                display: inline-block;
                width: 84px;
                font-size: 20px;
            }
            input {
                background: none;
                font-size: 16px;
                border: none;
                height: 30px;
                width: 280px;
                padding-left: 12px;
                box-sizing: border-box;
                color: #666;
                &.error {
                    border: 1px solid #f00;
                }
                &::-webkit-input-placeholder {
                    color: #aaa;
                }
            }
        }

        p {
            text-align: right;
            &.login--btn {
                button {
                    width: 100%;
                    height: 50px;
                    font-size: 18px;
                    background: #20b95b;
                    border: none;
                    margin-top: 30px;
                    color: #fff;
                    border-radius: 6px;
                    cursor: pointer;
                }
            }
            a {
                color: #fff;
                display: inline-block;
                padding: 0 15px;
                font-size: 14px;
            }
        }
    }
}
</style>
