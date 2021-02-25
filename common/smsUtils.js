let SmsCore = require('@alicloud/pop-core');
let sysConfig = require('../config/sysconfig.json');

exports.sendVerificationCode = function (cellphone, code, callback) {
  let client = new SmsCore({
    accessKeyId: sysConfig.aliSms.accessKeyId,
    accessKeySecret: sysConfig.aliSms.accessKeySecret,
    endpoint: sysConfig.aliSms.endpoint,
    apiVersion: sysConfig.aliSms.apiVersion
  });

  let params = {
    "RegionId": "cn-hangzhou",
    "PhoneNumbers": cellphone,
    "SignName": sysConfig.aliSms.signName,
    "TemplateCode": sysConfig.aliSms.templateCode,
    "TemplateParam": `{"code":"${code}"}`
  }

  let requestOption = {
    method: 'POST'
  };

  client.request('SendSms', params, requestOption).then((apiRes) => {
    callback({result: apiRes.Code === sysConfig.aliSms.resMapping.Success, reqContent: params, resContent: apiRes});
  }, (ex) => {
    callback({result: false, reqContent: params, resContent: ex});
  })
}