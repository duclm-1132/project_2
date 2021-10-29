<template>
  <div class="modal" :class="{ hide: hidePopup }">
    <div class="modal__container">
      <div class="body">{{$t('nav.deleteEmployee')}} &lt;{{ employeeClickCode }}&gt;?</div>
      <div class="footer">
        <button class="btn btn-cancel" @click="btnCloseClick">{{$t('nav.btnNo')}}</button>
        <button class="btn btn-submit" @click="btnSubmit">{{$t('nav.btnYes')}}</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
	props: {
		hidePopup: { type: Boolean, default: false },
		employeeClickCode: { type: String, default: null },
		employeeClickId: { type: String, default: null }
	},
	data() {
		return {
			// employeeClickCode: { type: String, default: null },
			// employeeClickId: { type: String, default: null }
		}
	},
	created() {
		this.$emit('hidePopup')
	},
	destroyed() {
		this.$emit('hidePopup')
	},
	methods: {
		/**
		 * exit click
		 * CreatedBy: DucLm (28/09/2021)
		 */
		btnCloseClick() {
			this.$emit('hidePopup')
		},
		/**
		 * click xác nhận xóa
		 * CreatedBy: DucLM (28/09/2021)
		 */
		async btnSubmit() {
			await this.$axios
				.delete(`/employees/${this.employeeClickId}`)
				.then((res) => {
					this.$emit('hidePopup')
					this.$toast.success(`${this.$t('toast.deleteSuccessful')} ${this.employeeClickCode}`)
				})
				.catch((res) => {
					this.$emit('hidePopup')
					this.$toast.error(`${res.userMsg}`)
				})
		}
	}
}
</script>
<style scoped>
.hide {
	display: none !important;
}

.modal {
	background: rgba(0, 0, 0, 0.3);
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 405;
	display: flex;
	justify-content: center;
	align-items: center;
}
.modal .modal__container {
	background: #fff;
	min-width: 363px;
	height: 190px;
	border-radius: 8px;
	position: relative;
	padding: 10px 20px;
}
.modal__container .btn {
	padding: 8px 24px;
	outline: none;
	border: 1px solid #ccc;
	background-color: #fff;
	border-radius: 4px;
	cursor: pointer;
	color: #000;
}
.modal__container .btn-cancel:hover {
	background-color: #ccc;
}
.modal__container .btn-submit {
	background-color: #2ca01c;
	border: none;
	color: #fff;
}
.modal__container .btn-submit:hover {
	background-color: #2eb31c;
	color: #fff;
}
.modal__container .footer {
	position: absolute;
	bottom: 20px;
	right: 20px;
	left: 20px;
	display: flex;
	padding-top: 20px;
	border-top: 1px solid #ccc;
	justify-content: space-between;
}
</style>
