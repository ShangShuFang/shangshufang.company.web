let tracking = {
  view: function (viewID) {
    let clientObject = commonUtility.getClientObject();
    let cityIP = commonUtility.isEmpty(clientObject) ? 0 : clientObject.city_ip;
    let cityID = commonUtility.isEmpty(clientObject) ? 0 : clientObject.city_id;
    let cityName = commonUtility.isEmpty(clientObject) ? 0 : clientObject.city_name;
    let customer = commonUtility.isLogin() ? commonUtility.getLoginUser().cellphone : trackingSetting.guest;
    let device = commonUtility.getDeviceName();
    let browser = commonUtility.getBrowserName();
    let systemID = trackingSetting.system.student;

    axios.post('/common/tracking', {
      cityIP: cityIP,
      cityID: cityID,
      cityName: cityName,
      customer: customer,
      device: device,
      browser: browser,
      systemID: systemID,
      viewID: viewID
    })
    .then(function (res) {
      if (res.data.err) {
        console.log('save tracking info error.');
        return false;
      }
    })
    .catch(function(error) {
      console.log('internet error.');
    });
  }
};