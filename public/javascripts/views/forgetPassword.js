let app = new Vue({
	el: '#app',
	data: {
		step: 1,
		cellphone: '',
		cellphoneInValid: false,
		cellphoneInValidMsg: '',

		verificationCode: '',
		verificationCodeInValid: false,
		verificationCodeInValidMsg: '',

		password: '',
		passwordInValid: false,
		confirmPassword: '',
		confirmPasswordInValid: false,
		confirmPasswordInValidMsg: '',

		isSent: false,
		countdown: 60,
		btnSendCodeText: '免费发送验证码'
	},
	methods: {
		onNextStep1: function () {
			this.cellphoneInValid = false;
			if (dataVerify.isEmpty(this.cellphone)) {
				this.cellphoneInValid = true;
				this.cellphoneInValidMsg = '请输入手机号码';
				return false;
			}
			axios.get('/common/cellphone/count'
				.concat(`?cellphone=${this.cellphone}`))
				.then(res => {
					if (res.data.err) {
						messager.error(localMessage.SYSTEM_ERROR);
						return false;
					}
					let count = res.data.count;
					if (count === 0) {
						this.cellphoneInValid = true;
						this.cellphoneInValidMsg = '该手机号码不存在';
						return false;
					}
					this.step = 2;
				})
				.catch(err => {
					messager.error(localmessager.NETWORK_ERROR);
				});
		},
		onProStep2: function () {
			this.step = 1;
		},
		onNextStep2: function () {
			this.verificationCodeInValid = false;
			if (dataVerify.isEmpty(this.verificationCode)) {
				this.verificationCodeInValid = true;
				this.verificationCodeInValidMsg = '请输入手机验证码';
				return false;
			}

			//#region 判断验证码是否正确
			let that = this;
			axios.get(`/common/verificationCode/check?cellphone=${that.cellphone}&code=${that.verificationCode}`)
				.then(res => {
					if (res.data.err) {
						messager.error(localMessage.exception(res.data.code, res.data.msg));
						return false;
					}
					if (!res.data.result) {
						that.verificationCodeInValid = true;
						that.verificationCodeInValidMsg = res.data.msg;
						return false;
					}
					this.step = 3;
				})
				.catch(error => {
					messager.error(localMessage.NETWORK_ERROR);
				});
			//#endregion
		},
		onProStep3: function () {
			this.step = 2;
		},
		onChangePassword: function () {
			let checkResult = true;
			this.passwordInValid = false;
			this.confirmPasswordInValid = false;
			if (dataVerify.isEmpty(this.password)) {
				this.passwordInValid = true;
				checkResult = false;
			}
			if (dataVerify.isEmpty(this.confirmPassword)) {
				this.confirmPasswordInValid = true;
				this.confirmPasswordInValidMsg = '请再次输入密码';
				checkResult = false;
			}
			if (!dataVerify.isEmpty(this.password) && !dataVerify.isEmpty(this.confirmPassword) && this.password !== this.confirmPassword) {
				this.confirmPasswordInValid = true;
				this.confirmPasswordInValidMsg = '两次输入的密码不一致';
				checkResult = false;
			}
			if (!checkResult) {
				return false;
			}
			this.changePassword();
		},
		startCountdown: function () {
			let timer = setInterval(() => {
				if (this.countdown === 0) {
					this.isSent = false;
					this.countdown = 60;
					this.btnSendCodeText = '免费发送验证码';
					clearInterval(timer);
					return false;
				} else {
					this.countdown--;
					this.isSent = true;
					this.btnSendCodeText = `${this.countdown}秒后重新发送`;
				}
			}, 1000);
		},
		onSendCode: function () {
			let that = this;
			axios.get('/common/verificationCode/generate')
				.then(res => {
					axios.post('/common/verificationCode/send', {
						systemFunction: 'register',
						cellphone: that.cellphone,
						verificationCode: res.data.code,
					})
						.then(res => {
							if (res.data.err) {
								messager.error(localMessage.exception(res.data.code, res.data.msg));
								return false;
							}
							that.isSent = true;
							that.startCountdown();
						})
						.catch(err => {
							messager.error(localMessage.NETWORK_ERROR);
						});
				})
				.catch(err => {
					messager.error(localMessage.NETWORK_ERROR);
				});
		},
		changePassword: function () {
			let that = this;
			axios.put('/forgetPassword', {
				cellphone: this.cellphone,
				password: this.password,
				loginUser: 0
			})
				.then(function (res) {
					if (res.data.err) {
						messager.error(localMessage.exception(res.data.code, res.data.msg));
						return false;
					}
					that.step = 4;
				})
				.catch(function (error) {
					messager.error(localMessage.NETWORK_ERROR);
				});
		}
	}
});