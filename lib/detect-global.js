var fs = require('fs');
var path = require('path');
var spawn = require('win-spawn');
var exists = fs.existsSync || path.existsSync;
require('colorful').toxic();

module.exports = function(code, callback) {

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

  var subprocess = spawn(phantomjs, [__dirname + '/phantomjs-script.js']);

  subprocess.stdout.on('data', function(data) {
    var variables = data.toString().replace(/\n$/, '');
    if (variables !== '') {
      console.log('Found global variables need to export: '.gray + variables.magenta);
      variables = variables.split(',');
    } else {
      console.log('No found any global variables.'.gray);
      variables = [];
    }
    callback && callback(variables);
  });

  // for debug
  subprocess.stderr.on('data', function (data) {
    console.log(data.toString());
  });

};
