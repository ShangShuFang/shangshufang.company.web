let sysConfig = require('../config/sysconfig.json');

exports.getPaginationArray = function(pageNumber, pageSize, totalCount){
  let paginationArray = []; //返回的页码内容
  let paginationSize = sysConfig.paginationSize; //最多显示多少个页码
  let maxPageNum = Math.ceil(totalCount / pageSize); //根据数据总数及每页显示的数据条数，计算理论上有多少页码

  let startPageNumber = 1;
  if(maxPageNum > paginationSize){
    //如果理论上应该显示的页码总数大于设置的最大页码总数，则只显示最大的页码总数
    if(pageNumber > 6){
      startPageNumber = pageNumber - 5;
    }
    for(let i = 1; i <= paginationSize; i++){
      if(startPageNumber <= maxPageNum){
        paginationArray.push(startPageNumber);
      }
      startPageNumber++;
    }
  }else{
    for(let i = 1; i <= maxPageNum; i++){
      paginationArray.push(i);
    }
  }

  return paginationArray;
};

exports.getPrePaginationNum = function (pageNumber) {
  let prePageNum = 0;
  if(parseInt(pageNumber)  > 0){
    prePageNum = pageNumber - 1;
  }
  return prePageNum;
};

exports.getNextPaginationNum = function (pageNumber, pageSize, totalCount) {
  let nextPageNum = -1;
  let maxPageNum = Math.ceil(totalCount / pageSize); //根据数据总数及每页显示的数据条数，计算理论上有多少页码
  if(parseInt(pageNumber) < maxPageNum){
    nextPageNum = parseInt(pageNumber) + 1;
  }
  return nextPageNum;
};