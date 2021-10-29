<template>
	<div class="lang-container" @click="selectLang">
		<i class="left-icon icon" :class="{ 'icon-vi': lang }"></i>
		<i class="left-icon icon" :class="{ 'icon-en': !lang }"></i>
		<div class="select-value">{{ textLang }}</div>
		<div class="dropdown" :class="{ hide: hide }">
			<div class="flex" @click="changeLang('en')">
				<i class="icon icon-en mg-r8 mg-l8"></i>
				<div class="select-value">
					<nuxt-link :to="switchLocalePath('en')" class="text">
						{{ $t('nav.langEn') }}
					</nuxt-link>
				</div>
			</div>
			<div class="flex" @click="changeLang('vi')">
				<i class="icon icon-vi mg-r8 mg-l8"></i>
				<div class="select-value">
					<nuxt-link :to="switchLocalePath('vi')" class="text">
						{{ $t('nav.langVi') }}
					</nuxt-link>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			lang: true,
			textLang: '',
			hide: true
		}
	},
	created() {
		if (this.$cookies.get('langChange') === 'vi') {
			this.lang = true
			this.textLang = 'Tiếng Việt'
		} else {
			this.lang = false
			this.textLang = 'English'
		}
	},
	methods: {
		selectLang() {
			this.hide = !this.hide
		},
		changeLang(lang) {
			this.$cookies.set('langChange', lang, {
				maxAge: 60 * 60 * 10
			})
		}
	}
}
</script>
<style scoped>
.hide {
	display: none;
}
.text {
	text-decoration: none;
	color: #000;
}
.lang-container {
	position: absolute;
	top: 24px;
	right: 24px;
	width: 120px;
	height: 32px;
	z-index: 99;
	border-radius: 4px;
	background: rgba(255, 255, 255, 0.1);
	border: 1px solid rgba(255, 255, 255, 0.1);
	line-height: 32px;
	color: #f8f8f8;
	padding: 0 16px 0 38px;
	cursor: pointer;
}
.lang-container .selected-value {
	line-height: 32px;
	height: 100%;
}
.left-icon {
	position: absolute;
	left: 8px;
	top: 7px;
}
.icon {
	cursor: pointer;
	display: inline-block;
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	height: 16px;
	width: 21px;
}
.icon-vi {
	background-image: url('../assets/icon/vietnam.png');
}
.icon-en {
	background-image: url('../assets/icon/united-kingdom.png');
}
.dropdown {
	background: #fff;
	position: absolute;
	left: 0;
	right: 0;
}
</style>
