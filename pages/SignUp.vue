<template>
  <div class="sign-up">
    <div class="container">
      <div class="container__item">
        <div class="container--header">
          <div class="header-text">{{$t('nav.signIn')}} VMO</div>
          <div class="back-sign-in">
            <p>
              {{$t('nav.formRegisterSubTitle')}}
              <nuxt-link :to="localePath('/')" class="color-text-green">{{$t('nav.login')}}</nuxt-link>
            </p>
          </div>
        </div>
        <div class="container-form">
          <div class="form-name">
            <div class="form-item firstName">
              <label for="firstName">{{$t('account.firstName')}}</label>
              <input
                id="firstName"
                ref="firstName"
                v-model="user.firstName"
                type="text"
                class="input"
                :placeholder="$t('placeholder.enterFirstName')"
              />
              <div class="text-error" :class="{ 'text-muted': textMuteFirstName }">{{ msg }}</div>
            </div>
            <div class="form-item lastName">
              <label for="lastName">{{$t('account.lastName')}}</label>
              <input
                id="lastName"
                ref="lastName"
                v-model="user.lastName"
                type="text"
                class="input"
                :placeholder="$t('placeholder.enterLastName')"
              />
              <div class="text-error" :class="{ 'text-muted': textMuteLastName }">{{ msg }}</div>
            </div>
          </div>
          <div class="form-item">
            <label for="companyName">{{$t('account.companyName')}}</label>
            <input
              id="companyName"
              ref="companyName"
              v-model="user.companyName"
              type="text"
              class="input"
              name
              :placeholder="$t('placeholder.enterCompanyName')"
            />
            <div class="text-error" :class="{ 'text-muted': textMuteCompanyName }">{{ msg }}</div>
          </div>
          <div class="form-item">
            <label for="username">{{$t('account.username')+'\/'+$t('account.email')}}</label>
            <input
              id="username"
              ref="username"
              v-model="user.username"
              type="text"
              class="input"
              name
              :placeholder="$t('placeholder.enterUserName')"
            />
            <div class="text-error" :class="{ 'text-muted': textMuteUsername }">{{ msg }}</div>
          </div>
          <div class="form-item">
            <label for="password">{{$t('account.password')}}</label>
            <input
              id="password"
              ref="password"
              v-model="user.password"
              type="password"
              minlength="8"
              class="input"
              :placeholder="$t('placeholder.enterPassword')"
            />
            <div class="text-error" :class="{ 'text-muted': textMutePassword }">{{ msg }}</div>
          </div>
          <div class="form-item">
            <input type="submit" class="input btn-submit" :value="$t('nav.signIn')" @click="btnClickSignUp()" />
          </div>
        </div>
      </div>
      <TheDropdownLanguage />
    </div>
  </div>
</template>
<script>
import TheDropdownLanguage from '../components/TheDropdownLanguage.vue'
export default {
	name: 'SignUp',
	comments: {
		TheDropdownLanguage
	},
	data() {
		return {
			msg: '',
			user: { type: Object },
			textMuteFirstName: { type: Boolean, default: true },
			textMuteLastName: { type: Boolean, default: true },
			textMuteCompanyName: { type: Boolean, default: true },
			textMuteUsername: { type: Boolean, default: true },
			textMutePassword: { type: Boolean, default: true }
		}
	},

	methods: {
		/**
		 * validate input null
		 * CreatedBy: DucLM (20/09/2021)
		 */
		validate() {
			this.msg = 'Không được để trống'
			if (!this.user.firstName) {
				this.textMuteFirstName = false
				this.$refs.firstName.focus()
			} else {
				this.textMuteFirstName = true
			}
			if (!this.user.lastName) {
				this.textMuteLastName = false
				this.$refs.lastName.focus()
			} else {
				this.textMuteLastName = true
			}
			if (!this.user.companyName) {
				this.textMuteCompanyName = false
				this.$refs.companyName.focus()
			} else {
				this.textMuteCompanyName = true
			}
			if (!this.user.username) {
				this.textMuteUsername = false
				this.$refs.username.focus()
			} else {
				this.textMuteUsername = true
			}
			if (!this.user.password) {
				this.textMutePassword = false
				this.$refs.password.focus()
			} else {
				this.textMutePassword = true
				return true
			}
			return false
		},
		/**
		 * click sign up
		 * CreatedBy: DucLM (20/09/2021)
		 */
		btnClickSignUp() {
			if (this.validate()) {
				this.postUser()
			}
		},
		async postUser() {
			await this.$axios
				.$post('http://localhost:3000/users', this.user)
				.then((res) => {
					this.$toast.success('Đăng ký thành công')
					this.$router.push('/')
				})
				.catch((res) => {
					this.$toast.error(`${res.userMsg}`)
				})
		}
	}
}
</script>
<style>
/* @import url('../assets/css/input.css'); */
.color-text-green {
	text-decoration: none;
	color: #0073e6;
}

.color-text-green:hover {
	opacity: 0.9;
	color: #384fd5;
}

.text-error {
	color: red !important;
	font-size: 12px;
}
.text-suscess {
	color: #27ff00 !important;
}
.text-muted {
	display: none;
}
.sign-up {
	background-image: url('../assets/img/bg6.jpg');
	background-size: cover;
	height: 100vh;
}

.container {
	padding: 0 15px;
	height: 100vh;
	align-items: center;
	display: flex;
	justify-content: center;
}

.container__item {
	width: 460px;
	padding: 10px 20px;
	min-height: 400px;
	background: #fff;
	border-radius: 8px;
}

.container__item .container--header {
	align-items: center;
	text-align: center;
	padding-top: 10px;
	line-height: 1.4;
}

.container__item .header-text {
	font-size: 24px;
	font-weight: 800;
}
.container__item .form-item {
	margin-top: 10px;
}
.container__item .form-name {
	display: flex;
	width: 100%;
	justify-content: space-between;
	margin-top: 20px;
}

.container__item .form-name .firstName {
	width: 60%;
	margin-right: 8px;
}

.container__item .form-name .lastName {
	width: 40%;
}

.container__item .btn-submit {
	background: #0073e6;
	font-weight: 500;
	font-size: 16px;
	color: #fff;
}
.container__item .btn-submit:hover {
	opacity: 0.9;
	background-color: #384fd5;
}

@media (max-width: 576px) {
	.container__item .form-name {
		display: block;
		width: 100%;
		justify-content: space-between;
		margin-top: 20px;
	}
	.container__item .form-name .firstName,
	.container__item .form-name .lastName {
		width: 100%;

		/* margin-right: 8px; */
	}
}
</style>


