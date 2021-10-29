<template>
  <div>
    <div class="box">
      <div class="content-item">
        <div class="content-item-text">{{$t('nav.employee')}}</div>
        <div class="component-btn">
          <button class="btn-btn color" @click="btnAdd">{{$t('btn.addEmployee')}}</button>
        </div>
      </div>
    </div>
    <div class="content-table">
      <div class="item">
        <div class="text-msg">{{ msg }}</div>
        <div class="item-right">
          <input
            v-model="filter"
            type="text"
            :placeholder="$t('placeholder.filter')"
            class="input-search2 input"
            @input="onChangeInputEmployeeFilter"
          />
          <div class="content-icon refresh" title="Lấy lại dữ liệu" @click="btnRefreshClick"></div>
        </div>
      </div>
      <div class="content-table-height">
        <table class="tblListEmployee" width="100%">
          <thead>
            <tr>
              <td class="table-input-checkbox fix-left">
                <input type="checkbox" class="check-box" />
              </td>
              <th style="min-width: 132px; border-left: none">{{$t('employee.employeeCode')}}</th>
              <th style="min-width: 200px">{{$t('employee.employeeName')}}</th>
              <th>{{$t('employee.gender')}}</th>
              <th style="align-items: center; text-align: center">{{$t('employee.dateOfBirth')}}</th>
              <th style="min-width: 200px">{{$t('employee.identifyNumber')}}</th>
              <th style="min-width: 230px">{{$t('employee.employeePosition')}}</th>

              <th class="table-right-style">{{$t('nav.feature')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(employee, index) in employees"
              :key="index"
              @dblclick="dblClickTable(employee.id)"
            >
              <td class="fix-left1">
                <input type="checkbox" class="check-box" />
              </td>
              <td>{{ employee.employeeCode }}</td>
              <td style="min-width: 230px">{{ employee.employeeName }}</td>
              <td>{{ employee.gender | showGender }}</td>
              <td style="align-items: center; text-align: center">
                {{
                employee.dateOfBirth | dateFormatDDMMYY(employee.dateOfBirth)
                }}
              </td>
              <td style="min-width: 200px">{{ employee.identityNumber }}</td>
              <td style="min-width: 230px">{{ employee.employeePosition }}</td>

              <div class="table-right-style1" :style="{ 'z-index': 100 - index }">
                <div class="btn-edit">
                  <button class="btn-btn hover">
                    <div class="flex btn-btn-text">
                      <span
                        class="pr-4"
                        style="color: #0075c0; font-weight: 600"
                        @click="
                          btnEditClick(employee.id, employee.employeeCode)
                        "
                      >{{$t('btn.edit')}}</span>
                    </div>
                  </button>
                </div>
                <div
                  class="btn-delete"
                  @click="btnDeleteClick(employee.id, employee.employeeCode)"
                >{{$t('btn.delete')}}</div>
              </div>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="content-navpage">
        <div
          class="content-navpage-text-left"
        >{{$t('nav.total')}}: {{ totalRecord }} {{$t('nav.record')}}</div>
        <div class="flex">
			<div class="footer-complete">
          <select class="input" :value="pageSize" @change.prevent="onSelectedValue">
            <option value="5">5 bản ghi trên 1 trang</option>
            <option value="10">10 bản ghi trên 1 trang</option>
            <option value="30">30 bản ghi trên 1 trang</option>
            <option value="50">50 bản ghi trên 1 trang</option>
            <option value="100">100 bản ghi trên 1 trang</option>
          </select>
        </div>
        <div class="flex">
          <div
            class="btn-pre-page"
            @click="changePage(-1)"
          ></div>
		  <div
            class="btn-next-page"
            @click="changePage(1)"
          ></div>
        </div>
		</div>
      </div>
    </div>
    <!-- load icon -->
    <div v-if="isBusy" class="fa-3x">
      <i class="fas fa-spinner fa-spin" style="color: green"></i>
    </div>
    <EmployeeDetail
      :flag="status"
      :hide="hide"
      :employee="selectEmployee"
      @hideDialogNotLoad="hideDialogNotLoad"
      @hideDialog="hideDialog"
    />
    <Popup
      :employee-click-code="recordCode"
      :employee-id="recordId"
      :hide-popup="popHide"
      @hidePopup="hidePopup"
    />
  </div>
</template>
<script>
import EmployeeDetail from './EmployeeDetail.vue'
import Popup from './Popup.vue'

export default {
	components: {
		EmployeeDetail,
		Popup
	},
	filters: {
		showGender(value) {
			if (value === '1') {
				return 'Nam'
			} else if (value === '0') {
				return 'Nữ'
			} else if (value === '2') {
				return 'Không xác định'
			}
		},
		showDepartment(value) {
			if (!value) return ''
			if (value === '11452b0c-768e-5ff7-0d63-eeb1d8ed8cef') {
				return 'Phòng nhân sự'
			} else if (value === '142cb08f-7c31-21fa-8e90-67245e8b283e') {
				return 'Phòng marketing'
			} else if (value === '17120d02-6ab5-3e43-18cb-66948daf6128') {
				return 'Phòng kế toán'
			} else if (value === '469b3ece-744a-45d5-957d-e8c757976496') {
				return 'Phòng nghiên cứu'
			} else if (value === '4e272fc4-7875-78d6-7d32-6a1673ffca7c') {
				return 'Phòng đào tạo'
			}
		},
		dateFormatDDMMYY(date) {
			if (date == null) return ''
			if (date === '0001-01-01T00:00:00') return ''
			const newDate = new Date(date)
			let day = newDate.getDate()
			let month = newDate.getMonth() + 1
			const year = newDate.getFullYear()
			day = day < 10 ? '0' + day : day
			month = month < 10 ? '0' + month : month
			return `${day}/${month}/${year}`
		}
	},
	props: {
		colapseClick: { type: Boolean, default: false } // responsive khi đóng mở navbar
	},

	data() {
		return {
			employees: [], // mảng danh sách nhân viên
			isBusy: false, // Trạng thái của icon Loading
			msg: '', // message error
			totalRecord: 0,
			hide: true, // ẩn component EmployeeDetail
			status: null, // trạng thái sửa, thêm mới
			selectEmployee: {}, // data 1 nhân viên khi dblClick hoặc click btn Sửa
			// employeeTemp: {},
			popHide: true,
			recordId: null, // Lưu giá trị của EmployeeId để truyền qua Popup
			recordCode: null, // Lưu giá trị Employeecode truyền qua Popup
			pageSize: 5,
			pageIndex: 1,
			filter: '',
			totalPages: 1
		}
	},
	created() {
		this.loadData()
	},
	methods: {
		/**
		 * funtion load data
		 * CreatedBy: DucLM (23/09/2021)
		 */
		async loadData() {
			const userData = this.$cookies.get('user')
			this.msg = ''
			this.isBusy = true
			setTimeout(() => {
				this.isBusy = false
			}, 5000)
			const res = await this.$axios.get(
				`/employees?userId=${userData.id}`
			)

			if (res.status === 200) {
				this.employees = res.data
				this.totalRecord = this.employees.length
				if (this.employees.length === 0) {
					this.msg = 'Không có dữ liệu'
				}
				this.isBusy = false
			}
		},
		onSelectedValue(e) {
			const val = e.target.value
			this.pageSize = val
			// console.log(this.filter)
			this.filterData()
		},
		async filterData() {
			this.isBusy = true
			await this.$axios
				.get(
					`/employees?q=${this.filter}&_page=${this.pageIndex}&_limit=${this.pageSize}`
				)
				.then((response) => {
					// console.log(response)
					this.employees = response.data
					this.totalPages = response.data.totalPages

					// console.log(this.totalPages)
				})
				.catch(() => {
					// console.log(response)
				})
				.then(() => {
					this.isBusy = false
				})
		},
		changePage(page){
			this.pageIndex += page;
			this.filterData()
		},
		/**
		 * click button refresh -> call load data
		 * CreatedBy: DucLM (23/09/2021)
		 */
		btnRefreshClick() {
			this.filterData()
		},
		hidePopup() {
			this.popHide = true
			this.loadData()
		},
		btnDeleteClick(employeeId, employeeCode) {
			this.popHide = false
			this.recordId = employeeId
			// console.log(this.recordId)
			this.recordCode = employeeCode
		},
		/**
		 * Click button Thêm nhân viên
		 * CreatedBy: DucLM (27/09/2021)
		 */
		btnAdd() {
			const userData = this.$cookies.get('user')
			this.hide = false
			this.status = 'add'
			this.selectEmployee = {}
			this.selectEmployee.userId = userData.id
		},
		/**
		 * hide employeeDetail not load data
		 * CreatedBy: DucLM (27/09/2021)
		 */
		hideDialogNotLoad() {
			this.hide = true
		},
		/**
		 * hide employeeDetail and load data
		 * CreatedBy: DucLM (27/09/2021)
		 */
		hideDialog() {
			this.hide = true
			this.filterData()
		},
		/**
		 * btn edit click
		 * CreatedBy: DucLM (27/09/2021)
		 */
		btnEditClick(employeeClickId) {
			this.dblClickTable(employeeClickId)
		},
		/**
		 * double click on table
		 * CreatedBy: DucLM (27/09/2021)
		 */
		async dblClickTable(eId) {
			// gán cờ thành nút sửa
			this.status = 'edit'
			// Lấy ra id của employee
			// this.id = eId;
			// show Dialog
			this.hide = false
			// Fill employee vào dialog
			const userData = this.$cookies.get('user')
			await this.$axios
				.get(`/employees?userId=${userData.id}&&id=${eId}`)
				.then((response) => {
					// console.log(response);
					this.selectEmployee = response.data[0]
					// format lại dữ liệu hiển thị
					this.selectEmployee.dateOfBirth = this.dateFormatYYMMDD(
						this.selectEmployee.dateOfBirth
					)
					this.selectEmployee.identityDate = this.dateFormatYYMMDD(
						this.selectEmployee.identityDate
					)

					// copy data object
					// this.employeeTemp = Object.assign({}, this.selectEmployee)
				})
				.catch(() => {
					// console.log(response)
				})
		},
		onChangeInputEmployeeFilter(e) {
			const val = e.target.value
			clearTimeout(this.timeOut)
			this.timeOut = setTimeout(() => {
				this.filter = val
				// this.pageSize = 1000
				this.pageIndex = 1
				// console.log(this.filter)
				this.filterSetTotalRecord()
			}, 1000)
		},
		async filterSetTotalRecord() {
			this.isBusy = true
			await this.$axios
				.get(
					`/employees?q=${this.filter}&_page=${this.pageIndex}&_limit=${this.pageSize}`
				)
				.then((res) => {
					this.employees = res.data
					this.totalRecord = this.employees.length
					this.totalPages = res.data.totalPages
				})
				.catch(() => {})
				.then(() => {
					this.isBusy = false
				})
		},
		/**
		 * format date yyMMdd
		 * CreatedBy: DucLM (27/09/2021)
		 */
		dateFormatYYMMDD(date) {
			const newDate = new Date(date)
			let day = newDate.getDate()
			let month = newDate.getMonth() + 1
			const year = newDate.getFullYear()
			day = day < 10 ? '0' + day : day
			month = month < 10 ? '0' + month : month
			return `${year}-${month}-${day}`
		}
	}
}
</script>
<style scoped>
@import url('../../assets/css/table.css');

.content .box {
	padding: 22px 0 16px 0;
}
.box .content-item {
	align-items: center;
	display: flex;
	justify-content: space-between;
}
.content-item .content-item-text {
	font-size: 24px;
	color: black;
	background-size: contain;
	background-position: center;
	font-weight: bold;
}
.component-btn {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.btn-utilities {
	display: flex;
	margin-right: 12px;
}
.btn-edit {
	position: relative;
	display: flex;
	align-items: center;
}
.btn-btn {
	padding: 0 16px;
	border-radius: 4px;
	color: #111;
	height: 36px;
	position: relative;
	border: 1px solid #8d9096;
	background-color: transparent;
	transition: all 0.2s ease;
	cursor: pointer;
	box-sizing: border-box;

	/* background: 0 0; */
	overflow: visible;
	outline: none;
}
.btn-btn-text {
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
.btn-delete {
	padding: 6px 10px;
	outline: none;
	border: 1px solid #ccc;
	background-color: #dc3545;
	border-radius: 4px;
	cursor: pointer;
	color: #fff;
}
.btn-delete:hover {
	opacity: 0.7;
}
.pr-4 {
	padding-right: 4px !important;
}

.flex {
	display: flex !important;
}
.header-icon {
	background: url('../../assets/Sprites.5f05e81f.svg') no-repeat;
	cursor: pointer;
	min-width: 16px;
	min-height: 16px;
	height: 16px;
	width: 16px;
}
.arrow-up--black {
	background-position: -560px -359px;
}
.arrow-up--white {
	background-position: -848px -359px;
}
.line {
	left: -16px;
	height: 20px;
	top: 0;
	position: absolute;
	border: 1px solid transparent;
	border-left-color: #fff;
}
.color {
	color: #fff;
	background-color: #2ca01c;
	padding: 8px 20px 8px 20px;
	height: 36px;
	border: none;
}
.color:hover {
	background-color: #2eb31c;
	color: #fff;
}
.border {
	border-radius: 0 30px 30px 0;
	border: none;
}
.back {
	cursor: pointer;
	width: max-content;
	justify-items: center;
	align-items: center;
	color: #0075c0;
}
.chevron-left--primary {
	background-position: -224px -360px;
}
.content-icon {
	background: url('../../assets/Sprites.5f05e81f.svg') no-repeat;
	cursor: pointer;
	min-width: 24px;
	min-height: 24px;
	margin-left: 8px;
	height: 24px;
	width: 24px;
}

.content .content-table {
	background-color: white !important;
	position: absolute;
	top: 95px;
	bottom: 0;
	right: 30px;
	left: 20px;
}
.content-table .item {
	padding: 16px 10px 10px 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.content-table .text-msg {
	color: red;
	font-size: 13px;
}

.tblListEmployee table tr,
th {
	display: table-cell;
	cursor: pointer;
	padding: 0 10px;
}
.tblListEmployee table tbody tr:hover {
	background-color: #d4f0f0;
}
.tblListEmployee .fix-left {
	z-index: 5;
	position: sticky;
	top: 0;
	display: table-cell;
	left: 0;
	border-right: 1px dotted #c7c7c7;
}
.tblListEmployee .fix-left1 {
	z-index: 4;
	position: sticky;
	top: 0;
	display: table-cell;
	left: 0;
	border-right: 1px dotted #c7c7c7;
}
.tblListEmployee .table-right-style {
	min-width: 120px;
	top: 0;
	right: 0;
	align-items: center;
	text-align: center;
	border-right: none;
	width: 60px;
	border-left: 1px solid #c7c7c7;
	z-index: 101;
}
.tblListEmployee .table-right-style1 {
	min-width: 120px;
	position: sticky;
	display: flex;
	text-align: center;
	align-items: center;
	top: 0;
	right: 0;
	padding: 0 18px;
	border-right: none;
	width: 60px;
	border-left: 1px dotted #c7c7c7;
	background: #fff;
}
.table-input-checkbox {
	border-right: 1px solid #c7c7c7;
	background-color: #eceef1;
	max-width: 40px !important;
	align-items: center;
	width: 40px;
}
.item .item-right {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.content-table .content-table-height {
	height: calc(100% - 150px);
	overflow-y: auto;
	margin: 0 24px 0 16px;
}
.refresh {
	background-position: -423px -201px;
}
.excel__nav {
	background-position: -704px -200px;
}
.setting__list {
	background-position: -88px -200px;
}
.check-box {
	height: 16px;
	width: 18px;
}
.content-navpage {
	position: absolute;
	height: 60px;
	bottom: 0;
	right: 24px;
	box-sizing: border-box;
	left: 16px;
	align-items: center;
	display: flex;
	justify-content: space-between;
}
.content-navpage .content-navpage-button {
	display: flex;
}
.content-navpage .content-navpage-text-right {
	margin-right: 10px;
}
.arrow-up--blue {
	background-position: -896px -359px;
}
.hover {
	border: none;
	padding: 6px 0 6px 16px;
}
.padding {
	padding: 0 0 0 10px;
}
.hoverxx:hover {
	background-color: #eceaea;
}
.fa-3x {
	position: absolute;
	left: 45%;
	top: 43%;
	transform: translate(-50%, -50%);
}
.dropdown {
	position: relative;
}
.dropdown .dropdown-content {
	position: absolute;
	height: 93px;
	width: 123px;
	right: -25px;
	top: 30px;
	background: red;
	z-index: 1000;
}
.display {
	display: none;
}
.footer-complete {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.autocomplete {
	display: flex;
	min-height: 32px;
	border: 1px solid #babec5;
	border-radius: 2px;
	background-color: #fff;
	height: 32px;
	width: 200px;
}
.selected-option {
	display: flex;
	flex-basis: 100%;
	flex-grow: 1;
	flex-wrap: wrap;
	width: calc(100% - 32px);
	align-items: center;
	padding: 6px 0 6px 12px;
}
.style {
	border: none;
	background-color: white;
}
.margin {
	margin-left: 20px;
}
.disable {
	cursor: not-allowed;
}
.active {
	font-weight: 700;
}
.btn-pre-page{
	background-image: url('../../assets/icon/btn-prev-page.svg');
	height: 24px;
	width: 24px;
	background-position: center;
	cursor: pointer;

}
.btn-next-page{
	background-image: url('../../assets/icon/btn-next-page.svg');
	height: 24px;
	width: 24px;
	background-position: center;
	cursor: pointer;

}
</style>
