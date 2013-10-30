module.exports = function(code) {
  // very simple and unstrict way
  if (code.indexOf('define("jquery"') > 0 || code.indexOf('jQuery JavaScript Library') > 0) {
    return 'jQuery';
  }
  else if (code.indexOf('$.fn.') > 0 || code.indexOf('jQuery.fn.') > 0) {
    return 'jQueryPlugin';
  }
  // very risky
  else if (code.indexOf('module.exports') > 0) {
    return 'CommonJS';
  } else {
    return 'Normal';
  }
};
