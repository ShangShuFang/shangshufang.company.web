let messager = {};
messager.info = function (msg) {
  layer.alert(msg, {
    icon: 0,
    skin: 'layer-ext-moon'
  })
};
messager.error = function (msg) {
  layer.alert(msg, {
    icon: 1,
    skin: 'layer-ext-moon'
  })
};