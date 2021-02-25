exports.processNumberParameter = function (parameter, defaultValue) {
  if(parameter === undefined){
    return defaultValue;
  }
  if(Number.isNaN(parameter)){
    return defaultValue;
  }
  return parameter;
};