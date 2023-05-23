<template>
  <div class="login-container">
    <div class="login-container__content">
      <div class="login-container__content__bg"></div>
      <div class="login-container__content__form">
        <el-scrollbar always>
          <div class="login-container__content__form__content">
            <div class="login-logo"></div>
            <h1 style="margin: 0">登录</h1>
            <div class="login-form">
              <div class="login-form__item">
                <el-input
                  v-model="form.UserName.value"
                  placeholder="用户名/手机号"
                  size="large"
                  @focus="() => (form.UserName.focus = true)"
                  @blur="() => (form.UserName.focus = false)"
                ></el-input>
                <div class="login-form__item__focus" v-show="form.UserName.focus"></div>
                <div class="login-form__item__error" v-show="form.UserName.error">
                  用户名/手机号不允许为空{{ form.UserName.error }}
                </div>
              </div>
              <div class="login-form__item">
                <el-input
                  v-model="form.Password.value"
                  placeholder="密码"
                  size="large"
                  type="password"
                  @focus="() => (form.Password.focus = true)"
                  @blur="() => (form.Password.focus = false)"
                ></el-input>
                <div class="login-form__item__focus" v-show="form.Password.focus"></div>
                <div class="login-form__item__error" v-show="form.Password.error">
                  密码不允许为空{{ form.Password.error }}
                </div>
              </div>
              <div class="login-form__item">
                <div class="login-form-item__verify">
                  <el-input
                    class="login-form-item__verify__input"
                    v-model="form.VerifyCode.value"
                    placeholder="验证码"
                    size="large"
                    @focus="() => (form.VerifyCode.focus = true)"
                    @blur="() => (form.VerifyCode.focus = false)"
                  ></el-input>
                  <div class="login-form-item__verify__code">
                    <img :src="img" alt="验证码" @click="onClickVerifyCode" />
                  </div>
                </div>
                <div class="login-form__item__focus" v-show="form.VerifyCode.focus"></div>
                <div class="login-form__item__error" v-show="form.VerifyCode.error">
                  验证码不允许为空
                  {{ form.VerifyCode.error }}
                </div>
              </div>
              <div class="login-form__btn">
                <el-button
                  style="width: 100%"
                  size="large"
                  color="rgb(18 94 254)"
                  @click="onClickLogin"
                  >登录</el-button
                >
              </div>
              <div class="login-form__status">
                <el-checkbox v-model="form.RememberMe.value" label="7天内自动登录" size="large" />
                还没注册？去注册 | 去登陆
              </div>
              <div class="login-form__copyright">
                Copyright © 2023 无忧易售
                <br />
                All Rights Reserved.粤ICP备18054020号
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import * as userApi from '@/apis/user/user/user'

const form = reactive({
  UserName: {
    value: 'keguangqiang14',
    error: '',
    focus: false,
  },
  Password: {
    value: 'a123456',
    error: '',
    focus: false,
  },
  RememberMe: {
    value: true,
    error: '',
    focus: false,
  },
  VerifyCode: {
    value: '',
    error: '',
    focus: false,
  },
})
const router = useRouter()
const img = ref('')

const onClickLogin = () => {
  userApi
    .postSupplier({
      UserName: 'keguangqiang14',
      Password: 'a123456',
      RememberMe: true,
      VerifyCode: form.VerifyCode.value,
    })
    .then((res) => {
      router.push({ name: 'ROOT_HOME' })
    })
}
const onClickVerifyCode = () => {
  userApi
    .getVerifyCode({
      Type: 2,
    })
    .then((res) => {
      img.value = res
    })
}

onClickVerifyCode()
</script>
<style lang="scss" scoped>
.login-container {
  width: 100vw;
  height: 100vh;
}

.login-logo {
  width: 100%;
  height: 80px;
  margin: 20px 0 0;
  background: url('@/assets/images/login-logo.png') no-repeat center;
  background-size: contain;
}

.login-form {
  width: 60%;

  :deep(.el-input__wrapper) {
    box-shadow: 0 0 0 0 var(--el-input-border-color, var(--el-border-color)) inset;
    padding: 0;
  }

  .login-form__item {
    margin: 20px 0;
    border-bottom: 1px solid #dcdcdc;

    .login-form-item__verify {
      display: flex;

      .login-form-item__verify__input {
        flex: 1;
        width: 0;
      }

      .login-form-item__verify__code {
        flex-basis: 20%;
        border-radius: 5px;
        border: 1px solid #aaa;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          vertical-align: middle;
        }
      }
    }

    .login-form__item__focus {
      width: 100%;
      height: 3px;
      margin: 5px 0;
      background-color: rgb(18 94 254);
    }

    .login-form__item__error {
      text-align: left;
      color: red;
    }
  }

  .login-form__status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.8rem;

    :deep(.el-checkbox) {
      --el-checkbox-checked-text-color: rgb(18 94 254);
      --el-checkbox-checked-bg-color: rgb(18 94 254);
    }
  }

  .login-form__copyright {
    margin: 20px 0;
    font-size: 0.8rem;
    color: #666;
  }
}

/*    设置了浏览器宽度大于或等于768px时   */
@media only screen and (min-width: 768px) {
  .login-container__content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
  }

  .login-container__content__bg {
    flex-basis: 30%;
    background: rgb(18 94 254) url('@/assets/images/login-banner.png') no-repeat center;
    background-size: contain;
  }

  .login-container__content__form {
    flex: 1;
    width: 0;
  }

  .login-container__content__form__content {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
}

/*    设置了浏览器宽度小于或等于768px时   */
@media only screen and (max-width: 768px) {
  .login-container__content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .login-container__content__bg {
    flex-basis: 30%;
    background: rgb(18 94 254) url('@/assets/images/login-banner.png') no-repeat center;
    background-size: contain;
  }

  .login-container__content__form {
    flex: 1;
    height: 0;
  }

  .login-container__content__form__content {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
}
</style>
