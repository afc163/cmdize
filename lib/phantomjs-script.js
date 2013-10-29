var page = require('webpage').create();
var url = '/tmp/cmdize-tmp.html';

page.open(url, function (status) {

  var window = page.evaluate(function() {
    return window;
  });

  var keys = Object.keys(window);

  if (keys.indexOf('window') !== keys.length - 1) {
    console.log(keys.slice(keys.indexOf('window')+1, keys.length));
  } else {
    console.log('');
  }

  phantom.exit();

});
