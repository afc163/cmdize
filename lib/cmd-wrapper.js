var intro = 'define(function(require, exports, module) {\n';
var outro = '\n});';

module.exports = function(code, variables, options) {
  variables = variables || [];
  if (variables === []) {
    // do nothing
  } else if (variables.length > 1) {
    for (var i=0; i<variables.length; i++) {
      code = code + '\n' + 'exports.' + variables[i] + ' = ' + variables[i] + ';';
      if (options.clearGlobal) {
        code = clearFromWindowSafely(code, variables[i]);
      }
    }
  } else if (variables.length === 1) {
    code = code + '\n' + 'module.exports = ' + variables[0] + ';';
    if (options.clearGlobal) {
      code =  clearFromWindowSafely(code, variables[0]);
    }
  }

  return intro + code + outro;
};

function clearFromWindowSafely(code, v) {
  return code + '\n' + 'try { delete window.' + v
              + ' } catch(e) { window.' + v + ' = null }';
}

