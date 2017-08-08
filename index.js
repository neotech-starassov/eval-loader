var loaderUtils = require('loader-utils')
var defaultOptions = {
  params: null,
  context: null
};

module.exports = function(source) {
  this.cacheable();
  var module2 = {};
  source.replace('module.exports','module2.exports');

  var options = Object.assign(
    {},
    defaultOptions,
    loaderUtils.getOptions(this),
  );

  var params = options.params;
  var paramsNames = ['module'];
  var module = {exports: {}};
  var paramsValues = [module];
  
  if( (typeof params === "object" && params !== null) {
    paramsNames = paramsNames.concat(Object.keys(options));
    paramsValues = paramsValues.concat(paramsNames.map(function(key) {
      return params[key];
    }));
  }

  (new (Function.prototype.bind.apply(Function, paramsNames))).apply(params.context, paramsValues);

  return module.exports;
};
