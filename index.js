var fs = require('fs');
var path = require('path');
var wrapper = require('./lib/cmd-wrapper');
var checkType = require('./lib/check-type');
var detectGlobal = require('./lib/detect-global');

module.exports = function(code, options, callback) {

  code = code.toString().trim();
  var type = checkType(code);

  if (type === 'CommonJS' || type === 'jQueryPlugin') {
    callback && callback(wrapper(code, {
      type: type
    }));
  } else {
    detectGlobal(code, function(variables) {
      var result = wrapper(code, options, variables);
      callback && callback(result);
    });
  }

};

