let dataVerify = {};
dataVerify.isEmpty = function (v) {
  return v === null || v.length === 0;
}
dataVerify.isUrl = function(v) {
  if (dataVerify.isEmpty(v)) {
    return false;
  }
  let reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
  return reg.test(value);
};
dataVerify.isDate = function (v) {
  v = v.replace(/\//g, '-');
  let dateReg = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
  let rValue = v.match(dateReg);
  if (rValue == null) {
    return false;
  }
  rValue[1] = parseInt(rValue[1], 10);
  rValue[2] = parseInt(rValue[2] - 1, 10);
  rValue[3] = parseInt(rValue[3], 10);
  let dateObj = new Date(rValue[1], rValue[2], rValue[3]);
  return !(dateObj.getFullYear() !== rValue[1] || dateObj.getMonth() !== rValue[2] || dateObj.getDate() !== rValue[3]);

}
dataVerify.isEmail = function (v) {
  if (dataVerify.isEmpty(v)) {
    return false;
  }
  let reg = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;
  return reg.test(v);
}
dataVerify.isCellphone = function (v) {
  if (dataVerify.isEmpty(v)) {
    return false;
  }
  let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
  return reg.test(v);
}
dataVerify.isNumber = function(v) {
  if (dataVerify.isEmpty(v)) {
    return false;
  }
  return !isNaN(v);
};
dataVerify.isDecimal = function (v) {
  if (dataVerify.isEmpty(v)) {
    return false;
  }
  let s = v;
  if (s.indexOf('.') > 0) {
    s = s.replace('.', '');
  }
  return dataVerify.isNumber(s);
}