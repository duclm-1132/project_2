<template>
  <div id="navbar" :class="{ 'witdh-auto': collapse }">
    <div class="logo-container" :class="{ 'witdh-auto': collapse }">
      <div class="mi mi-24 mi-logo-option" @click="collapseMenu"></div>
      <div class="logo-img" :class="{ hide: collapse }"></div>
    </div>
    <div class="menu-item-list">
      <a
        href="#"
        class="menu-item"
        :class="{ active: selectedItem == 0, 'witdh-auto': collapse }"
        @click="selectItem(0)"
      >
        <div class="menu-item-icon">
          <div class="mi mi-24 mi-sidebar-dashboard" :title="$t('nav.dashboard')"></div>
        </div>
        <div class="menu-item-title" :class="{ hide: collapse }">{{$t('nav.dashboard')}}</div>
      </a>
      <div class="menu-item" :class="{ 'witdh-auto': collapse }">
        <NuxtLink
          :to="localePath({path:'/HomePage/EmployeeList'})"
          class="menu-item"
          :class="{active: selectedItem == 1, 'witdh-auto': collapse, }"
          @click.native="selectItem(1)"
        >
          <div class="menu-item-icon">
            <div class="mi-24 mi mi-sidebar-employee" :title="$t('nav.employee')"></div>
          </div>
          <div class="menu-item-title" :class="{ hide: collapse }">{{$t('nav.employee')}}</div>
        </NuxtLink>
      </div>
      <div
        class="menu-item"
        :class="{ active: selectedItem == 5, 'witdh-auto': collapse }"
        @click="selectItem(5)"
      >
        <div class="menu-item-icon">
          <div class="mi mi-24 mi-sidebar-invoice" title="Quản lý hóa đơn"></div>
        </div>
        <div class="menu-item-title" :class="{ hide: collapse }">Quản lý hoá đơn</div>
      </div>
      <div
        class="menu-item"
        :class="{ active: selectedItem == 7, 'witdh-auto': collapse }"
        @click="selectItem(7)"
      >
        <div class="menu-item-icon">
          <div class="mi mi-24 mi-sidebar-tools" :title="$t('nav.setting')"></div>
        </div>
        <div class="menu-item-title" :class="{ hide: collapse }">{{$t('nav.setting')}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	name: 'MyNavbar',
	components: {},
	data() {
		return {
			selectedItem: 0,
			collapse: false
		}
	},
	created() {
		// window.addEventListener("resize", this.getWindowWidth);
		// this.getWindowWidth()
	},
	destroyed() {
		// window.removeEventListener('resize', this.getWindowWidth)
	},
	methods: {
		selectItem(item) {
			this.selectedItem = item
		},
		/**
		 * collapse menu
		 * CreatedBy:DucLM (22/09/2021)
		 * ModifiedBy: DucLm (23/09/2021)
		 */
		collapseMenu() {
			this.collapse = !this.collapse
			this.$emit('collapse', this.collapse)
		}
		/**
		 * Get window width
		 * CreatdBy: DucLM (22/09/2021)
		 */
		// getWindowWidth() {
		// 	const x = window.innerWidth
		// 	if (x <= 1024) {
		// 		this.collapse = true
		// 	} else {
		// 		this.collapse = false
		// 	}
		// 	this.$emit('collapse', this.collapse)
		// }
	}
}
</script>

<style scoped>
.hide {
	display: none;
	width: 48px;
	margin: auto;
}

.witdh-auto {
	width: 48px !important;
	margin: auto;
}
#navbar {
	background: #393a3d;
	position: absolute;
	top: 0;
	left: 0;
	height: 100vh;
	width: 178px;
}
.logo-container {
	width: 100%;
	height: 48px;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
}
.logo-img {
	height: 32px;
	width: 96px;
	background-image: url('../assets/img/VMO_logo.png');
	background-size: cover;
	background-repeat: no-repeat;
	cursor: pointer;
}
.menu-item-list {
	padding-top: 14px;
	height: calc(100vh - 49px);
	overflow-y: auto;
	overflow-x: hidden;
}
.menu-item {
	width: 178px;
	height: 42px;
	display: flex;
	align-items: center;
	cursor: pointer;
	text-decoration: none;
	position: relative;
}
.menu-item::before {
	content: '';
	position: absolute;
	width: 6px;
	height: 100%;
	background: rgb(51, 191, 34);
	top: 0;
	left: 0;
	display: none;
}

.menu-item:hover {
	background: rgba(255, 255, 255, 0.2);
}
.menu-item.active {
	background: rgba(255, 255, 255, 0.2);
}
.menu-item.active::before {
	display: block;
}
.menu-item .menu-item-icon {
	margin-right: 8px;
	margin-left: 16px;
}

.menu-item .menu-item-title {
	color: white;
	font-size: 13px;
	font-weight: 500;
	text-decoration: none;
}
.mi-24 {
	width: 24px;
	height: 24px;
	min-width: 24px;
	min-height: 24px;
}
.mi-14 {
	width: 14px;
	height: 14px;
	min-width: 14px;
	min-height: 14px;
}

.mi-16 {
	width: 16px;
	height: 16px;
	min-width: 16px;
	min-height: 16px;
}

.mi {
	background: url('../assets/Sprites.5f05e81f.svg') no-repeat;
	cursor: pointer;
}

.mi-sidebar-dashboard {
	background-position: -30px -1628px;
}
.active .mi-sidebar-dashboard {
	background-position: -30px -1585px;
}

.mi-sidebar-cash {
	background-position: -73px -1628px;
}

.mi-sidebar-bank {
	background-position: -117px -1628px;
}

.mi-sidebar-pu {
	background-position: -161px -1628px;
}

.mi-sidebar-sale {
	background-position: -204px -1628px;
}

.mi-sidebar-invoice {
	background-position: -249px -1628px;
}
.mi-sidebar-employee {
	background-position: -592px -1631px;
}
.mi-sidebar-stock {
	background-position: -291px -1628px;
}

.mi-sidebar-tools {
	background-position: -336px -1628px;
}

.mi-sidebar-fixed-assets {
	background-position: -378px -1630px;
}

.mi-sidebar-tax {
	background-position: -423px -1630px;
}

.mi-sidebar-price {
	background-position: -467px -1628px;
}

.mi-sidebar-general {
	background-position: -510px -1628px;
}

.mi-sidebar-budget {
	background-position: -378px -1659px;
}

.mi-sidebar-report {
	background-position: -547px -1628px;
}

.mi-sidebar-finance {
	background-position: -204px -1664px;
}

.mi-logo-option {
	background-position: -424px -86px;
	padding: 0 8px;
}

.active .mi {
	background-position-y: -1585px;
}

.active .mi-sidebar-finance {
	background-position: -248px -1664px;
}

.active .mi-sidebar-budget {
	background-position: -423px -1659px;
}
::-webkit-scrollbar {
	width: 7px;
	height: 10px;
}

@media screen and (max-width: 1024px) {
	#navbar {
		width: auto;
	}
}
</style>
