let express = require('express');
let axios = require('axios');
let buildUtils = require('../common/buildUtils');
let sysConfig = require('../config/sysconfig.json');
let customerMessage = require('../config/msgconfig.json');
let router = express.Router();

router.get('/technology/category/list', (req, res, next) => {
	const apiKey = 'technologyCategoryList';
	const pageNumber = 1;
	const pageSize = sysConfig.pageSize.all;
	const directionID = req.query.directionID;
	const dataStatus = 'A';
	const parameters = [pageNumber, pageSize, directionID, dataStatus];
	const requestUri = buildUtils.buildRequestApiUri(apiKey, parameters);
  
	axios.get(requestUri)
	  .then(result => {
		res.json({
		  err: !result.data.result,
		  code: result.data.responseCode,
		  msg: result.data.responseMessage,
		  dataList: result.data.responseData
		});
	  })
	  .catch(error => {
		res.json({
		  err: true,
		  code: error.code,
		  msg: customerMessage[error.code]
		});
	  });
  });

module.exports = router;