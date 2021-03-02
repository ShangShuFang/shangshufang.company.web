let app = new Vue({
	el: '#app',
	data: {
		companyID: 1, //TODO 从cookie读取登录用户信息
		isLogin: false,
		loginUser: {},
		categoryList: [],
		filterCategory: 0,
		dataStatusList: [],
		filterStatus: 'NULL',
		fromIndex: 0,
        toIndex: 0,
		pageNumber: 1,
        totalCount: 0,
        maxPageNumber: 0,
        studentList: [],
        paginationArray: [],
        prePageNum: -1,
        nextPageNum: -1,
		talentPool: {
			talentID: 0,
			interviewTime: '',
			interviewTimeInValid: false,
			interviewAddress: '',
			interviewAddressInValid: false,
			memo: '',
		},
	},
	methods: {
		initPage: function () {
			// this.isLogin = commonUtility.isLogin();
			// if (!this.isLogin) {
			// 	return false;
			// }
			// this.loginUser = commonUtility.getLoginUser();
			commonUtility.setNavActive(2);
			this.loadDataStatus();
			this.loadStudentList();
		},
		loadDataStatus: function () {
			this.dataStatusList.push({filterStatus: 'NULL', filterStatusText: '全部'});
			this.dataStatusList.push({filterStatus: '1', filterStatusText: '已关注'});
			this.dataStatusList.push({filterStatus: '2', filterStatusText: '发送面试'});
			this.dataStatusList.push({filterStatus: '3', filterStatusText: '接受面试'});
			this.dataStatusList.push({filterStatus: '4', filterStatusText: '未参加面试'});
			this.dataStatusList.push({filterStatus: '5', filterStatusText: '面试未通过'});
			this.dataStatusList.push({filterStatus: '6', filterStatusText: '面试通过'});
			this.dataStatusList.push({filterStatus: '7', filterStatusText: '未入职'});
			this.dataStatusList.push({filterStatus: '8', filterStatusText: '已入职'});
			this.dataStatusList.push({filterStatus: '9', filterStatusText: '已离职'});
		},
		onFilterByStatus: function (status) {
			if (this.filterStatus === status) {
				return false;
			}
			this.filterStatus = status;
			this.pageNumber = 1;
			this.loadStudentList();
		},
		loadStudentList: function () {
			let that = this;
			axios.get('/company/talents/list'
				.concat(`?pageNumber=${that.pageNumber}`)
				.concat(`&companyID=${that.companyID}`)
				.concat(`&technologyID=${that.filterCategory}`)
				.concat(`&dataStatus=${that.filterStatus}`))
				.then(res => {
					if (res.data.err) {
						messager.error(localMessage.SYSTEM_ERROR);
						return false;
					}
					let apiResponse = res.data.apiResponse;
					if (dataVerify.isEmpty(apiResponse.totalCount === 0)) {
						return false;
					}

					that.totalCount = apiResponse.totalCount;
                    that.studentList = apiResponse.dataList;
                    that.maxPageNumber = Math.ceil(apiResponse.totalCount / apiResponse.pageSize);
                    that.paginationArray = apiResponse.paginationArray;
                    that.prePageNum = apiResponse.prePageNum === undefined ? -1 : apiResponse.prePageNum;
                    that.nextPageNum = apiResponse.nextPageNum === undefined ? -1 : apiResponse.nextPageNum;
                    that.fromIndex = apiResponse.dataList === null ? 0 : (that.pageNumber - 1) * apiResponse.pageSize + 1;
                    that.toIndex = apiResponse.dataList === null ? 0 : (that.pageNumber - 1) * apiResponse.pageSize + apiResponse.dataList.length;
				})
				.catch(err => {
					messager.error(localMessage.NETWORK_ERROR);
				});
		},
		onFirstPage: function () {
			if (this.pageNumber === 1) {
				return false;
			}
			this.pageNumber = 1;
			this.loadStudentList();
		},
		onPrePage: function () {
			if (this.pageNumber === 1) {
				return false;
			}
			this.pageNumber--;
			this.loadStudentList();
		},
		onPagination: function (pageNumber) {
			if (this.pageNumber === pageNumber) {
				return false;
			}
			this.pageNumber = pageNumber;
			this.loadStudentList();
		},
		onNextPage: function () {
			if (this.pageNumber === this.maxPageNumber) {
                return false;
            }
            this.pageNumber++;
            this.loadStudentList();
		},
		onLastPage: function () {
			if (this.pageNumber === this.maxPageNumber) {
                return false;
            }
            this.pageNumber = this.maxPageNumber;
            this.loadStudentList();
		},
		onSendInterview: function (talentID) {
			this.talentPool.talentID = talentID;
			this.talentPool.interviewTime = '';
			this.talentPool.interviewTimeInValid = false;
			this.talentPool.interviewAddress = '';
			this.talentPool.interviewAddressInValid = false;
			this.talentPool.memo = '';
			$('#interview-modal').modal('show');
		},
		checkData: function () {
			let result = true;
			this.talentPool.interviewTimeInValid = false;
			this.talentPool.interviewAddressInValid = false;
			if (dataVerify.isEmpty(this.talentPool.interviewTime)) {
				this.talentPool.interviewTimeInValid = true;
				result = false;
			}
			if (dataVerify.isEmpty(this.talentPool.interviewAddress)) {
				this.talentPool.interviewAddressInValid = true;
				result = false;
			}
			return result;
		},
		onSubmitInterview: function () {
			if (!this.checkData()) {
				return false;
			}
			this.changeInterview();
		},
		changeInterview: function () {
			axios.put('/company/talents/change', {
				talentID: this.talentPool.talentID,
				interviewTime: this.talentPool.interviewTime,
				interviewAddress: this.talentPool.interviewAddress,
				memo: this.talentPool.memo,
				dataStatus: '2',
				loginUser: this.companyID
			})
			.then(res => {
				if (res.data.err) {
					message.error(localMessage.exception(res.data.code, res.data.msg));
					return false;
				}
				$('#interview-modal').modal('hide');
				this.loadStudentList();
				messager.show('面试邀请已发送');
			})
			.catch(err => {
				messager.error(localMessage.NETWORK_ERROR);
			});
		},
		onChangeStatus: function (talentID, status) {
			axios.put('/company/talents/change/status', {
				talentID: talentID,
				dataStatus: status,
				loginUser: this.companyID
			})
			.then(res => {
				if (res.data.err) {
					message.error(localMessage.exception(res.data.code, res.data.msg));
					return false;
				}
				this.loadStudentList();
				messager.show('状态已更新');
			})
			.catch(err => {
				messager.error(localMessage.NETWORK_ERROR);
			});
		}
	},
	mounted() {
		this.initPage();
	},
});