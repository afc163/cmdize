var intro = 'define(function(require, exports, module) {\n';
var outro = '\n});';
var jQueryPluginIntro = intro + 'var $ = require(\'$\');\n';

module.exports = function(code, options, variables) {

  // jQuery Plugin
  if (options.type === 'jQueryPlugin') {
    return jQueryPluginIntro + code + outro;
  }

  // CommonJS
  else if (options.type === 'CommonJS') {
    return intro + code + outro;
  }

  // Normal File
  else {
    if (variables.length > 1) {
      for (var i=0; i<variables.length; i++) {
        code = code + '\n' + 'exports.' + variables[i] + ' = ' + variables[i] + ';';
        if (options.clearGlobal) {
          code += clearGlobalCode(variables[i]);
        }
      }
    } else if (variables.length === 1) {
      code = code + '\n' + 'module.exports = ' + variables[0] + ';';
      if (options.clearGlobal) {
        code += clearGlobalCode(variables[0]);
      }
    }
    return intro + code + outro;
  }
};

function clearGlobalCode(v) {
  return '\ntry { delete window.' + v + ' } catch(e) { window.' + v + ' = null }';
}
