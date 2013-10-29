var fs = require('fs');
var path = require('path');
var exists = fs.existsSync || path.existsSync;
var spawn = require('win-spawn');
var wrapper = require('./lib/cmd-wrapper');

module.exports = function(code, options, callback) {

  code = code.toString().trim();

  if (supportCommonJS(code)) {
    callback && callback(wrapper(code));
    return;
  }

  fs.writeFileSync('/tmp/cmdize-tmp.html', '<script>' + code + '</script>');

  var phantomjs;
  for (var i=0; i < module.paths.length; i++) {
    var bin = path.join(module.paths[i], '.bin/phantomjs');
    if (process.platform === 'win32') {
      bin += '.cmd';
    }
    if (exists(bin)) {
      phantomjs = bin;
      break;
    }
  }
  if (phantomjs === undefined) {
    phantomjs = 'phantomjs';
  }

  var subprocess = spawn(phantomjs, [__dirname + '/lib/phantomjs-script.js']);

  subprocess.stdout.on('data', function(data) {
    var variables = data.toString().replace(/\n$/, '');
    if (variables !== '') {
      console.log('Found global variables need to export: '.gray + variables.magenta);
      variables = variables.split(',');
    } else {
      console.log('No found any global variables.'.gray);
      variables = [];
    }
    var result = wrapper(code, variables, options);
    callback && callback(result);
  });

};

function supportCommonJS(code) {
  if (code.indexOf('module.exports') > 0) {
    return true;
  }
}
