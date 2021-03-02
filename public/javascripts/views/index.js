let app = new Vue({
	el: '#app',
	data: {
		categoryList: [],
		filterCategory: 0,
		fromIndex: 0,
        toIndex: 0,
		pageNumber: 1,
        totalCount: 0,
        maxPageNumber: 0,
        studentList: [],
        paginationArray: [],
        prePageNum: -1,
        nextPageNum: -1
	},
	methods: {
		initPage: function () {
			commonUtility.setNavActive(1);
			this.loadCategoryList();
			this.loadStudentList();
		},
		loadCategoryList: function () {
			axios.get(`/common/technology/category/list?directionID=${this.filterCategory}`)
			.then(res => {
				if (res.data.err) {
					messager.error(localMessage.SYSTEM_ERROR);
					return false;
				}
				
				this.categoryList = [];
				this.categoryList.push({technologyCategoryID: 0, technologyCategoryName: '全部'});
				res.data.dataList.forEach((data) => {
					this.categoryList.push({technologyCategoryID: data.technologyCategoryID, technologyCategoryName: data.technologyCategoryName});
				});
			})
			.catch(err => {
				messager.error(localMessage.NETWORK_ERROR);
			});
		},
		onFilterByCategory: function (technologyCategoryID) {
			if (this.filterCategory === technologyCategoryID) {
				return false;
			}
			this.filterCategory = technologyCategoryID;
			this.loadStudentList();
		},
		openDetail: function (student) {
			window.open(`/detail?student=${student.studentID}&technology=${student.technologyID}`);
		},
		loadStudentList: function () {
			let that = this;
			axios.get('/index/list'
				.concat(`?pageNumber=${that.pageNumber}`)
				.concat(`&categoryID=${that.filterCategory}`))
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
	},
	mounted() {
		this.initPage();
	},
});