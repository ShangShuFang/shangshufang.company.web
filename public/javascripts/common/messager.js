let messager = {};
messager.info = function (msg) {
  layer.alert(msg, {
    icon: 0,
    skin: 'layer-ext-moon'
  })
};
messager.error = function (msg) {
  layer.alert(msg, {
    icon: 2,
    skin: 'layer-ext-moon'
  })
};
messager.show = function (msg) {
	layer.msg(msg);
}