<template>
  <div class="sign-in">
    <div class="container">
      <div class="sign-in__container">
        <div class="sign-in--logo">
          <div class="logo-icon"></div>
          <div class="logo-text">VMO</div>
        </div>
        <div class="sign-in--form">
          <div class="form">
            <div class="form--input">
              <input
                ref="username"
                v-model="username"
                type="text"
                required
                class="input"
                name="username"
                :placeholder="$t('placeholder.enterUserName')"
              />
              <div class="text-msg" :class="{ 'text-muted': textMuteUserName }">
                {{ msg }}
              </div>
            </div>
            <div class="form--input">
              <input
                ref="password"
                v-model="password"
                type="password"
                required
                class="input"
                name
                :placeholder="$t('placeholder.enterPassword')"
              />
              <div class="text-msg" :class="{ 'text-muted': textMutePassword }">
                {{ msg }}
              </div>
            </div>
            <div class="form--forgot-password">
              <a href="#" class="color-text">{{ $t('nav.forgotPassword') }}</a>
            </div>
            <div class="form--input">
              <input
                type="submit"
                class="input form--btn"
                :value="$t('nav.login')"
                @click="btnSignInClick()"
              />
            </div>
            <div class="form--sign-up">
              {{ $t('nav.DontHaveCompany') }}
              <nuxt-link :to="localePath('/SignUp')" class="color-text">
                {{ $t('nav.signIn') }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <DropdownLanguage />
    </div>
  </div>
</template>
<script>
import DropdownLanguage from '../components/DropdownLanguage.vue'

export default {
  components: {
    DropdownLanguage,
  },

  data() {
    return {
      data1: {},
      msg: '',
      username: '',
      password: '',
      textMuteUserName: { type: Boolean, default: true },
      textMutePassword: { type: Boolean, default: true },
    }
  },
  created() {},
  methods: {
    /**
     * sign in click
     * CreatedBy: DucLM (20/09/2021)
     * 1. check null user password : not null then call api
     * 2. call api get user by username
     * 	- data is null then show message: "Tài khoản không tồn tại"
     * 3. check password
     * 	- true: go to HomePage
     *  - false: show msg
     */
    async btnSignInClick() {
      // 1. check null user password
      if (this.validate()) {
        // 2 call api
        const data = await this.$axios.get(`/users?username=${this.username}`)
        if (data.status === 200) {
          this.data1 = data.data[0]
          if (!this.data1) {
            this.$toast.error(this.$t('toast.accountExist'))
          }
          // 3. check password
          else if (this.data1.password === this.password) {
            this.$cookies.set('user', this.data1, {
              maxAge: 60 * 60 * 100,
            })
            this.$toast.success(this.$t('toast.loginSuccessful'))
            this.$router.push(this.localePath({ path: '/HomePage' }))
          } else {
            this.msg = this.$t('toast.wrongPassword')
            this.textMutePassword = false
            this.$refs.password.focus()
          }
        } else {
          this.$toast.error(data.msg)
        }
      }
    },

    /**
     * vaidate data username, password
     * CreatedBy: DucLM (20/09/2021)
     */

    validate() {
      this.msg = this.$t('toast.required')
      if (!this.username && !this.password) {
        this.textMuteUserName = false
        this.textMutePassword = false
        this.$refs.username.focus()
      } else {
        if (!this.username) {
          this.textMuteUserName = false
          this.$refs.username.focus()
        } else {
          this.textMuteUserName = true
        }
        if (!this.password) {
          this.textMutePassword = false
          this.$refs.password.focus()
        } else {
          this.textMutePassword = true
          return true
        }
      }
      return false
    },
  },
}
</script>

<style scoped>
.text-msg {
  color: red;
  font-size: 12px;
}
.text-muted {
  display: none;
}

.res-fail {
  text-align: center;
  margin-bottom: 10px;
}
.sign-in {
  background-image: url('../assets/img/bg_login.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  overflow-y: auto;
}
.container {
  justify-content: center;

  /* padding: 15px; */
  align-items: center;
  width: 100%;
  display: flex;
}
.sign-in__container {
  width: 400px;
  margin: 5px;
  min-height: 400px;
  background: #fff;
  border-radius: 8px;
  padding: 55px 15px 37px 15px;
  display: block;
}

.sign-in--logo {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}
.sign-in--logo .logo-icon {
  background: url('../assets/Sprites.5f05e81f.svg') no-repeat -1488px -872px;
  width: 64px;
  height: 64px;
}
.sign-in--logo .logo-text {
  font-size: 50px;
  padding: 10px;
  line-height: 56px;
  font-weight: 800;
}

.sign-in--form {
  width: 100%;
}

.form--forgot-password {
  margin-bottom: 20px;
}

.sign-in--form .color-text {
  text-decoration: none;
  color: #0073e6;
}

.sign-in--form .color-text:hover {
  opacity: 0.9;
  color: #384fd5;
}

.form--sign-up {
  text-align: center;
  margin-top: 20px;
}

.form--sign-up a {
  cursor: pointer;
}

.form--btn {
  background: #0073e6;
  font-weight: 500;
  font-size: 16px;
  color: #fff;
}
.form--btn:hover {
  opacity: 0.9;
  background-color: #384fd5;
}

@media (max-width: 576px) {
  .sign-in__container {
    padding: 55px 15px 37px 15px;
  }
}
</style>
