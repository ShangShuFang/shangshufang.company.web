let app = new Vue({
	el: '#app',
	data: {
		cellphone: '',
		cellphoneInValid: false,
		password: '',
		passwordInValid: false,
	},
	methods: {
		checkData: function () {
			let result = true;
			if (dataVerify.isEmpty(this.cellphone)) {
				this.cellphoneInValid = true;
				this.result = false;
			}
			if (dataVerify.isEmpty(this.password)) {
				this.passwordInValid = true;
				this.result = false;
			}
			return result;
		},
		login: function () {
			axios.post('/login', {
				cellphone: this.cellphone,
				password: this.password
			})
			.then(res => {
				if (res.data.err) {
					message.error(localMessage.exception(res.data.code, res.data.msg));
					return false;
				}
				let user = res.data.apiResponse;
				if (dataVerify.isEmpty(user)) {
					messager.show('请输入的账号或密码不存在。');
					return false;
				}
				commonUtility.setCookie(Constants.COOKIE_LOGIN_USER, JSON.stringify(user));
				location.href = '/index';
			})
			.catch(err => {
				messager.error(localMessage.NETWORK_ERROR);
			});
		},
		onLogin: function () {
			if (!this.checkData()) {
				return false;
			}
			this.login();
		}
	}
});