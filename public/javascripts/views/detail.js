let app = new Vue({
	el: '#app',
	data: {
		studentID: 0,
		student: {},
		technologyID: 0,
		technology: {},
		technologyList: [],
		knowledgeList: [],
		exercisesList: [],
		exercisesTitle: '',
		exercisesContent: '',
		talentPool: {
			interviewTime: '',
			interviewTimeInValid: false,
			interviewAddress: '',
			interviewAddressInValid: false,
			memo: '',
		},
		dataStatus: '',
		dataStatusText: '',
		loginUser: null
	},
	methods: {
		initPage: function () {
			if (!this.getParameters()) {
				return false;
			}
			this.searchTalentPoolStatus();
			this.loadStudentInfo();
			this.loadTechnologyList();
		},
		getParameters: function () {
			this.studentID = commonUtility.getUriParameter('student');
			this.technologyID = commonUtility.getUriParameter('technology');
			if (dataVerify.isEmpty(this.studentID) || !dataVerify.isNumber(this.studentID)) {
				messager.error(localMessage.PARAMETER_ERROR);
				return false;
			}
			this.studentID = parseInt(this.studentID);
			if (!dataVerify.isEmpty(this.technologyID)) {
				if (dataVerify.isNumber(this.technologyID)) {
					this.technologyID = parseInt(this.technologyID);
				} else {
					this.technologyID = 0;
				}
			} else {
				this.technologyID = 0;
			}
			
			return true;
		},
		searchTalentPoolStatus: function () {
			if (!commonUtility.isLogin()) {
				return false;
			}
			let companyID = commonUtility.getLoginUser().companyID;
			let that = this;
			axios.get(`/detail/talent/any?companyID=${companyID}&studentID=${that.studentID}`)
				.then(res => {
					if (res.data.err) {
						messager.error(localMessage.SYSTEM_ERROR);
						return false;
					}
					let apiResponse = res.data.apiResponse;
					if (dataVerify.isEmpty(apiResponse)) {
						return false;
					}
					that.dataStatus = apiResponse.dataStatus;
					that.dataStatusText = apiResponse.dataStatusText;
				})
				.catch(err => {
					messager.error(localMessage.NETWORK_ERROR);
				});
		},
		loadStudentInfo: function () {
			let that = this;
			axios.get(`/detail/student?studentID=${that.studentID}`)
				.then(res => {
					if (res.data.err) {
						messager.error(localMessage.SYSTEM_ERROR);
						return false;
					}
					let apiResponse = res.data.apiResponse;
					if (dataVerify.isEmpty(apiResponse)) {
						messager.info(localMessage.NOT_FOUND_STUDENT);
						return false;
					}
					that.student = apiResponse;
				})
				.catch(err => {
					messager.error(localMessage.NETWORK_ERROR);
				});
		},
		loadTechnologyList: function () {
			let that = this;
			axios.get(`/detail/technology/list?studentID=${this.studentID}`)
				.then(res => {
					if (res.data.err) {
						messager.error(localMessage.SYSTEM_ERROR);
						return false;
					}
					that.technologyList = res.data.apiResponse;
					
					if (!dataVerify.isEmpty(that.technologyList)) {
						if (that.technologyID === 0) {
							that.technologyID = that.technologyList[0].technologyID;
						}
						that.technology = that.technologyList.find(technology => technology.technologyID === that.technologyID);
						that.loadKnowledgeList();
						that.loadExercisesList();
					}
				})
				.catch(err => {
					messager.error(localMessage.NETWORK_ERROR);
				});
		},
		onShowAbilityAnalysisResult: function (technology) {
			if (this.technologyID === technology.technologyID) {
				return false;
			}
			this.technology = technology;
			this.loadKnowledgeList();
			this.loadExercisesList();
		},
		loadKnowledgeList: function () { 
			let that = this;
			axios.get(`/detail/knowledge/list?studentID=${this.studentID}&technologyID=${this.technologyID}`)
				.then(res => {
					if (res.data.err) {
						messager.error(localMessage.SYSTEM_ERROR);
						return false;
					}
					that.knowledgeList = res.data.apiResponse;
				})
				.catch(err => {
					messager.error(localMessage.NETWORK_ERROR);
				});
		},
		loadExercisesList: function () { 
			let that = this;
			axios.get(`/detail/comprehensive/list?studentID=${this.studentID}&technologyID=${this.technologyID}`)
				.then(res => {
					if (res.data.err) {
						messager.error(localMessage.SYSTEM_ERROR);
						return false;
					}
					that.exercisesList = res.data.apiResponse;
				})
				.catch(err => {
					messager.error(localMessage.NETWORK_ERROR);
				});
		},
		onShowExercisesContent: function (exercises) {
			this.exercisesTitle = exercises.exercisesTitle;
			this.exercisesContent = exercises.exercisesContent;
			$('#exercises-modal').modal('show');
		},
		onSendInterview: function () {
			if (!commonUtility.isLogin()) {
				messager.info('您尚未登录，请登录后在进行操作');
				return false;
			}
			this.talentPool.interviewTime = '';
			this.talentPool.interviewTimeInValid = false;
			this.talentPool.interviewAddress = '';
			this.talentPool.interviewAddressInValid = false;
			this.talentPool.memo = '';
			$('#interview-modal').modal('show');
		},
		onSaveAttention: function () {
			if (!commonUtility.isLogin()) {
				messager.info('您尚未登录，请登录后在进行操作');
				return false;
			}
			this.saveTalent('1');
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
			this.saveTalent('2');
		},
		saveTalent: function (status) {
			let companyID = commonUtility.getLoginUser().companyID;
			let that = this;
			axios.post('/detail/save/talent', {
				companyID: companyID,
				studentID: this.studentID,
				dataStatus: status,
				interviewTime: this.talentPool.interviewTime,
				interviewAddress: this.talentPool.interviewAddress,
				memo: this.talentPool.memo,
				loginUser: companyID
			})
			.then(function(res) {
				if (res.data.err) {
					messager.error(localMessage.exception(res.data.code, res.data.msg));
					return false;
				}
				if (status === '2') {
					$('#interview-modal').modal('hide');
				};
				that.searchTalentPoolStatus();
			})
			.catch(function(error) {
				messager.error(localMessage.NETWORK_ERROR);
			});
		}
	},
	mounted() {
		this.initPage();
	},
});