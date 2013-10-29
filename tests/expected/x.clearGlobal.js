define(function(require, exports, module) {
var x = 1;
module.exports = window.x;
try { delete window.x } catch(e) { window.x = null }
});
