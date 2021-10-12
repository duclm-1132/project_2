<template>
  <div class="header" :class="{'position-left-48' : colapseClick}">
    <div class="header-left flex">
      <div class="header-icon three-tripes"></div>
      <div class="flex header-branch">
        <div class="header-branch-name text-uppercase">{{user.companyName}}</div>
        <div class="header-icon chevron-right"></div>
      </div>
    </div>
    <div class="header-right flex">
      <button class="button">
        <div class="flex button-text">
          <div class="header-icon bell__nav"></div>
        </div>
      </button>
      <div class="flex header-branch">
        <div class="header-icon user-avatar" @click="showDropdownClick"></div>
        <div class="header-branch-name">{{user.firstName}} {{user.lastName}}</div>
        <div class="header-icon chevron-right" @click="showDropdownClick"></div>
      </div>
      <div class="header__menu-dropdown" :class="{'hide' : hideDropdown}">
        <div class="container-item flex">
          <div class="avatar">
            <img src="../assets/img/default-avatar.jpg" alt="Ảnh đại diện" />
          </div>
          <div class="header-branch-name">
            <div class="text-name">{{user.firstName}} {{user.lastName}}</div>
            <a href="#">Thông tin tài khoản</a>
          </div>
        </div>

        <div class="item-setting flex">
          <div class="header-icon setting__nav"></div>
          <div class="text">Cài đặt</div>
        </div>
        <div class="footer">
          <button class="btn-sign-out" @click="btnSignOutClick">Đăng xuất</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import router from "../../router/index";

export default {
	props: {
		// user: { type: Object },

		colapseClick: { type: Boolean, default: false }
	},
	data() {
		return {
            user:{
                "firstName": "Lee",
                "lastName": "Nguyen",
                "companyName": "Dược Hà Nội",
                "username": "minhduc1234",
                "password": "12345678",
                "id": 6
            },
			hideDropdown: { type: Boolean, default: true }
		}
	},
	created() {},
	methods: {
		/**
		 * click sign-out
		 * CreateBy: DucLM (22/09/2021)
		 * ModifiedBy: DucLM (23/09/2021)
		 * Detail Modified: chuyển hướng thẳng về trang login chứ không cần xóa cookies
		 */
		btnSignOutClick() {
			// router.push({ path: "/" });
		},
		/**
		 * show dropdown
		 * CreatedBy: DucLM (22/09/2021)
		 * ModifiedBy: DucLM (23/09/2021)
		 */
		showDropdownClick() {
			this.hideDropdown = !this.hideDropdown
		}
	}
}
</script>
<style scoped>
.hide {
	display: none;
}

.position-left-48 {
	left: 48px !important;
}
.header {
	position: absolute;
	top: 0;
	left: 178px;
	right: 0;
	height: 48px;
	display: flex !important;
	align-items: center;
	justify-content: space-between;
}
.text-uppercase {
	text-transform: uppercase;
}
.header .header-left {
	line-height: 32px;
	box-sizing: border-box;
}
.header .header-right {
	line-height: 32px;
	margin-right: 16px;
	box-sizing: border-box;
}
.header__menu-dropdown {
	background: rgb(245 245 245);
	width: 300px;
	height: 200px;
	position: absolute;
	right: 24px;
	top: 48px;
	border-radius: 8px;
	z-index: 300;
	animation: modalFaceIn ease 0.5s;
}

.header__menu-dropdown .container-item {
	font-size: 13px;
	padding: 5px;
	background-color: #d5d9dd;
}

.header__menu-dropdown .container-item a {
	color: #0075c0;
	cursor: pointer;
	text-decoration: none;
}
.header__menu-dropdown .container-item a:hover {
	color: #0075c0;
	opacity: 0.7;
}

.header__menu-dropdown .avatar {
	display: block;
	align-items: center;
	text-align: center;
	padding: 0 16px;
}

.header__menu-dropdown .avatar img {
	width: 48px;
	height: 48px;
	border-radius: 50%;
}
.header__menu-dropdown .item-setting {
	padding: 5px 10px;
}

.header__menu-dropdown .footer {
	position: absolute;
	bottom: 10px;
	text-align: center;
	margin: auto;
	width: 100%;
}
.header__menu-dropdown .footer .btn-sign-out {
	padding: 8px 50px;
	cursor: pointer;
	border: 1px solid #000;
	border-radius: 4px;
}
.header__menu-dropdown .footer .btn-sign-out:hover {
	opacity: 0.7;
	color: #000;
	background: #ccc;
}
.header-icon {
	background: url('../assets/Sprites.5f05e81f.svg') no-repeat;
	cursor: pointer;
	min-width: 24px;
	min-height: 24px;
	height: 24px;
	width: 24px;
	margin-left: 8px;
	margin-right: 8px;
}
.header .header-branch {
	cursor: pointer;
}
.header-branch-name {
	font-size: 13px;
	line-height: 32px;
}
.three-tripes {
	background-position: -843px -30px;
}
.chevron-right {
	background-position: -76px -357px;
	transform: rotate(90deg);
}
.flex {
	display: flex;
	align-items: center;
}
.header .space-beetween {
	width: 20%;
}
.margin {
	margin-right: 10px;
}
.button {
	height: 100%;
	position: relative;
	transition: all 0.2s ease;
	border: 0;
	width: 44px;
	cursor: pointer;
	overflow: hidden;
	color: #fff;
	box-sizing: border-box;
	background: 0 0;
}
.button-text {
	font-weight: 600;
	position: relative;
	color: inherit;
	display: inline-block;
	transition: all 0.25s ease;
	white-space: nowrap;
	font-size: 13px;
	line-height: 13px;
	justify-content: center;
	align-items: center;
}
.category {
	background-position: -568px -30px;
}
.setting__nav {
	background-position: -675px -30px;
}
.chat__nav {
	background-position: -899px -30px;
}
.help__nav {
	background-position: -731px -30px;
}
.bell__nav {
	background-position: -788px -30px;
}
.user-avatar {
	background-position: -352px -894px;
	width: 32px;
	height: 32px;
	border-radius: 50%;
}
@keyframes modalFaceIn {
	from {
		opacity: 0;
		transform: translateY(-200px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
