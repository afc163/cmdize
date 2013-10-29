var cmdize = require('../index');
var expect = require('expect.js');
var path = require('path');
var fs = require('fs');

describe('cmdize tests', function() {

  var files = fs.readdirSync('./tests/original');
  files.forEach(function(file) {
    it(file, function(done) {
        var options = {};
        if (file.indexOf('clearGlobal') > 0) {
          options.clearGlobal = true;
        }
        cmdize(fs.readFileSync('./tests/original/' + file, 'utf8'), options, function(result) {
            expect(result).to.be(fs.readFileSync('./tests/expected/' + file, 'utf8').trim());
            done();
        });
    });
  });

});
