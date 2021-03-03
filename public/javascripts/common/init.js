$(document).ready(function () {
	function initProcess () {
		setNavbarRight();
	};
	function setNavbarRight () {
		let user = commonUtility.getLoginUser();
		if (dataVerify.isEmpty(user)) {
			$('.navbar-login').removeClass('hidden');
			return false;
		}
		$('.navbar-user .user-name').text(user.customerName + '(' + user.companyName + ')');
		$('.navbar-user').removeClass('hidden');
	}
	$('#logout').click(function () {
		commonUtility.delCookie(Constants.COOKIE_LOGIN_USER);
		location.reload();
	});
	initProcess();
});