let dateUtils = {};

dateUtils.getCurrentDate = function () {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month >= 1 && month <= 9) {
    month = '0' + month;
  }
  if (day >= 0 && day <= 9) {
    day = '0' + day;
  }
  return year + '-' + month + '-' + day;
};

/**
 * 日期加减
 * @param dateString 待加减的日期
 * @param addValue 减价的数值
 */
dateUtils.addDateYear = function (dateString, addValue) {
  let date = new Date(dateString);//当前时间对象，2017-10-31
  date.setFullYear(date.getFullYear() + addValue); //在当前年份上加1年，如果是减就传入负数

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month >= 1 && month <= 9) {
    month = '0' + month;
  }
  if (day >= 0 && day <= 9) {
    day = '0' + day;
  }

  return year + '-' + month + '-' + day;
};