<template>
  <div class="modal" :class="{ hide: hide }">
    <div class="modal__container">
      <div class="modal--close" @click="btnCloseClick()"></div>
      <header class="modal--header">
        <div class="header--text">Thông tin nhân viên</div>
      </header>
      <div class="modal--body">
        <div class="row col-full flex">
          <div class="col-half flex mg-r20">
            <div class="form-group">
              <label for="employeeCode" class="text-label">
                Mã
                <span class="text-red">*</span>
              </label>
              <input
                id="employeeCode"
                ref="employeeCode"
                v-model="$attrs.employee.employeeCode"
                type="text"
                maxlength="10"
                required
                class="input"
                placeholder="Mã nhân viên"
              />
              <!-- <div class="text-msg" :class="{ 'text-muted': textMuteEmployeeCode }">{{msg}}</div> -->
            </div>
            <div class="col-half">
              <label for="employeeName" class="text-label">
                Tên
                <span class="text-red">*</span>
              </label>
              <input
                id="employeeName"
                ref="employeeName"
                v-model="$attrs.employee.employeeName"
                type="text"
                required
                class="input"
                placeholder="Tên nhân viên"
              />
              <!-- <div class="text-msg" :class="{ 'text-muted': textMuteEmployeeName }">{{msg}}</div> -->
            </div>
          </div>
          <div class="col-half flex">
            <div class="form-group col-half">
              <label for="dateOfBirth" class="text-label">Ngày sinh</label>
              <input
                id="dateOfBirth"
                v-model="$attrs.employee.dateOfBirth"
                type="date"
                class="input"
                placeholder="dd/mm/yyyy"
              />
            </div>
            <div class="col-half">
              <label class="text-label">Giới tính</label>
              <div class="flex form-radio">
                <label for="men">Nam</label>
                <input
                  id="men"
                  v-model="$attrs.employee.gender"
                  type="radio"
                  class="radio"
                  name="gender"
                  value="1"
                />
                <label for="women">Nữ</label>
                <input
                  id="women"
                  v-model="$attrs.employee.gender"
                  type="radio"
                  class="radio"
                  name="gender"
                  value="0"
                />
                <label for="other">Khác</label>
                <input
                  id="other"
                  v-model="$attrs.employee.gender"
                  type="radio"
                  class="radio"
                  name="gender"
                  value="2"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row col-full flex">
          <div class="col-half mg-r20">
            <div class>
              <label class="text-label" for="department">Đơn vị</label>
              <select id="department" v-model="$attrs.employee.departmentId" class="input">
                <option
                  v-for="(department, index) in departments"
                  :key="index"
                  :value="department.departmentId"
                >{{ department.departmentName }}</option>
              </select>
            </div>
          </div>
          <div class="col-half flex">
            <div class="form-group col-6">
              <label for="identityNumber" class="text-label">Số CMND</label>
              <input
                id="identityNumber"
                v-model="$attrs.employee.identityNumber"
                type="number"
                class="input"
                placeholder="Số CCCD/CMND"
              />
            </div>
            <div class="col-4">
              <label for="identityDate" class="text-label">Ngày cấp</label>
              <input
                id="identityDate"
                v-model="$attrs.employee.identityDate"
                type="date"
                class="input"
                placeholder="dd/mm/yyyy"
              />
            </div>
          </div>
        </div>
        <div class="row col-full flex">
          <div class="col-half mg-r20">
            <div class="form-group col-full">
              <label for="position" class="text-label">Chức danh</label>
              <input
                id="position"
                v-model="$attrs.employee.employeePosition"
                type="text"
                class="input"
                placeholder="Chức danh"
              />
            </div>
          </div>
          <div class="col-half">
            <div class="form-group col-full">
              <label for="identityPlace" class="text-label">Nơi cấp</label>
              <input
                id="identityPlace"
                v-model="$attrs.employee.identityPlace"
                type="text"
                class="input"
                placeholder="Nơi cấp"
              />
            </div>
          </div>
        </div>
        <div class="row col-full mg-t20">
          <div class="form-group col-full">
            <label for="address" class="text-label">Địa chỉ</label>
            <input
              id="address"
              v-model="$attrs.employee.address"
              type="text"
              class="input"
              placeholder="Địa chỉ"
            />
          </div>
        </div>
        <div class="row col-ful flex">
          <div class="row col-5 mg-r8">
            <div class="form-group col-full">
              <label for="phoneNumber" class="text-label">ĐT di động</label>
              <input
                id="phoneNumber"
                v-model="$attrs.employee.phoneNumber"
                type="text"
                class="input"
                placeholder="Số điện thoại di động"
              />
            </div>
          </div>
          <div class="row col-5 mg-r8">
            <div class="form-group col-full">
              <label for="telephoneNumber" class="text-label">ĐT cố định</label>
              <input
                id="telephoneNumber"
                v-model="$attrs.employee.telephoneNumber"
                type="text"
                class="input"
                placeholder="Số điện thoại có định"
              />
            </div>
          </div>
          <div class="row col-5">
            <div class="form-group col-full">
              <label for="email" class="text-label">Email</label>
              <input
                id="email"
                v-model="$attrs.employee.email"
                type="email"
                class="input"
                placeholder="thaont@example.com"
              />
            </div>
          </div>
        </div>
        <div class="row col-ful flex">
          <div class="row col-5 mg-r8">
            <div class="form-group col-full">
              <label for="bankAccount" class="text-label">Tài khoản ngân hàng</label>
              <input
                id="bankAccount"
                v-model="$attrs.employee.bankAccountNumber"
                type="text"
                class="input"
                placeholder="Tài khoản ngân hàng"
              />
            </div>
          </div>
          <div class="row col-5 mg-r8">
            <div class="form-group col-full">
              <label for="bankName" class="text-label">Tên ngân hàng</label>
              <input
                id="bankName"
                v-model="$attrs.employee.bankName"
                type="text"
                class="input"
                placeholder="Tên ngân hàng"
              />
            </div>
          </div>
          <div class="row col-5">
            <div class="form-group col-full">
              <label for="branchBankName" class="text-label">Chi nhánh</label>
              <input
                id="branchBankName"
                v-model="$attrs.employee.bankBranchName"
                type="text"
                class="input"
                placeholder="Tên chi nhánh"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="modal--footer">
        <div class="footer-left">
          <button class="btn btn-cancel" @click="btnCloseClick">Hủy</button>
        </div>
        <div class="footer-right">
          <button class="btn btn-save" @click="btnSaveClick">Lưu</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	comments: {},
	props: {
		hide: { type: Boolean, default: false }, // ẩn component EmployeeDetail
		flag: { type: String, default: null }, // flag check add or edit
		// employeeData: { type: Object, default: null } // Đối tượng nhân viên được truyền từ EmployeeList sang
		// textMuteEmployeeCode: { type: Boolean, default: true },
		// textMuteEmployeeName: { type: Boolean, default: true }
	},

	data() {
		return {
			departments: [],
			msg: '',
			employee: Object.assign({}, this.employeeData)
		}
	},

	watch: {
		getData() {
			this.employee = Object.assign({}, this.$attrs.employee)
		}
	},
	created() {
		this.getDepartments()
		this.autofocus()
		this.$emit('hideDialogNotLoad')
		this.getData()
		//  this.employee =  Object.assign({}, this.employeeData)
		// this.$refs.employeeCode.focus();
		// console.log(this.employee)
	},

	destroyed() {
		this.autofocus()
		this.$emit('hideDialogNotLoad')
		this.getDepartments()
	},

	methods: {
		/**
		 * exit click
		 * CreatedBy: DucLm (28/09/2021)
		 */
		btnCloseClick() {
			this.$emit('hideDialogNotLoad')
			// this.$nextTick(()=>{
			//   this.employee = {}
			// })
		},
		getData() {
			this.employee = Object.assign({}, this.employeeData)
		},
		/**
		 * Get departments
		 * CreatedBy: DucLm (28/09/2021)
		 */
		async getDepartments() {
			await this.$axios
				.get('/departments')
				.then((res) => {
					this.departments = res.data
				})
				.catch(() => {
					// console.log(res)
				})
		},
		/**
		 * auto focus input employeeCode
		 * CreatedBy: DucLm (28/09/2021)
		 */
		autofocus() {
			while (this.valueForcusInput === true) {
				if (this.$refs.employeeCode !== undefined) {
					this.$refs.employeeCode.focus()
				}
				this.valueForcusInput = false
			}
			if (this.state === false) {
				this.valueForcusInput = true
			}
		},
		/**
		 * btn save click
		 * CreatedBy: DucLM (28/09/2021)
		 */
		btnSaveClick() {
			if (this.checkEmployee) {
				if (this.flag === 'add') {
					this.postEmplyee()
				} else if (this.flag === 'edit') {
					this.putEmployee()
				}
			} else {
				alert('this.msg')
			}
		},
		/**
		 * Check employeeCode and employeeName
		 */
		checkEmployee() {
			this.msg = 'Không được để trống'
			if (!this.employee.employeeCode) {
				// this.textMuteEmployeeCode = false;
				this.$refs.employeeCode.focus()
			} else if (!this.employee.employeeName) {
				// this.textMuteEmployeeName = false;
				this.$refs.employeeName.focus()
			} else {
				// this.textMuteEmployeeName = true;
				return true
			}
			return false
		},
		/**
		 * Post dữ liệu lên server
		 * CreatedBy: LMDuc (19/05/2021)
		 */
		async postEmplyee() {
			await this.$axios
				.post('http://localhost:3000/employees', this.$attrs.employee)
				.then((res) => {
					// console.log(res)
					this.$emit('hideDialog')
					this.$toast.success('Thêm thành công')
				})
				.catch(() => {
					// console.log(res.response.data.devMsg)
					this.$toast.error('Thêm thất bại')
				})
		},
		/**
		 * thực hiện Update dữ liệu
		 * CreatedBy: LMDuc(20/05/2021)
		 */
		async putEmployee() {
			await this.$axios
				.put('/employees/' + this.$attrs.employee.id, this.$attrs.employee)
				.then((res) => {
					// console.log(res.data)
					this.$emit('hideDialog')
					this.$toast.success('Sửa thành công')
				})
				.catch(() => {
					// console.log(res.data)
					// console.log(this.employee)
					this.$toast.error('Sửa thất bại')
					// this.$emit("hideDialog");
				})
		}
	}
}
</script>
<style scoped>
.hide {
	display: none !important;
}

.text-msg {
	color: red;
	font-size: 12px;
}

.text-muted {
	display: none;
}
.modal {
	background: rgba(0, 0, 0, 0.3);
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 400;
	display: flex;
	justify-content: center;
	align-items: center;
}
.modal .modal__container {
	background: #fff;
	width: 900px;
	min-width: 300px;
	height: 90vh;
	border-radius: 8px;
	position: relative;
	padding: 10px 20px;
}
.modal__container .modal--close {
	background: url('../../assets/icon/x.svg') no-repeat center;
	padding: 18px;
	position: absolute;
	right: 0;
	top: 0;
	cursor: pointer;
}
.modal__container .modal--close:hover {
	background-color: #ccc;
}

.modal__container .header--text {
	font-size: 24px;
	padding: 10px 20px;
}
.modal__container .modal--body {
	width: 100%;
	display: block;
}
.modal__container .form-group {
	margin-right: 8px;
	align-items: center;
}

.modal__container .form-radio {
	height: 40px;
	box-sizing: border-box;
	margin: 10px;
}
.modal__container .radio {
	height: 100%;
	width: 100%;
	margin: 6px;
}

.modal__container .text-label {
	font-weight: bold;
}

.modal__container .modal--footer {
	position: absolute;
	bottom: 20px;
	right: 20px;
	left: 20px;
	display: flex;
	padding-top: 20px;
	border-top: 1px solid #ccc;
	justify-content: space-between;
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
.modal__container .btn-save {
	margin-right: 10px;
}
.modal__container .btn-save-more {
	background-color: #2ca01c;
	border: none;
	color: #fff;
}
.modal__container .btn-save-more:hover,
.modal__container .btn-save:hover {
	background-color: #2eb31c;
	color: #fff;
}
</style>
