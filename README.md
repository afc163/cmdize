# Cmdize 

[![Build Status](https://travis-ci.org/afc163/cmdize.png)](https://travis-ci.org/afc163/cmdize)
[![NPM version](https://badge.fury.io/js/cmdize.png)](http://badge.fury.io/js/cmdize)
[![David Status](https://david-dm.org/afc163/cmdize.png)](https://david-dm.org/afc163/cmdize) 

Convert normal js to CMD module.([What is CMD module?](https://github.com/cmdjs/specification/blob/master/draft/module.md) [中文定义](https://github.com/seajs/seajs/issues/242))

Support some famous JavaScript libraries(jQuery、underscore、momentjs) and no-dependencies JS Normal file.

> It is a experimental project, be cautious to use it in important situation!

![demo](https://i.alipayobjects.com/e/201310/1OP6NAiAzF.png)

---

## Install

```
$ npm install cmdize -g
```

## Use in cli

There is a js file `exmple.js`:

```js
window.abc = "abc";
```

Cmdize it!

```
$ cmdize example.js
```

```
Reading /Users/afc163/Desktop/example.js ...
No found any global variables.
cmdized.js is generated.
  >> /Users/afc163/Projects/cmdize/cmdized.js
```

Then the `cmdized.js` would be generated:

```js
define(function(require, exports, module) {
window.abc = "abc";
});
```

## Options

### clearGlobal

```
$ cmdize example.js --clear-global
```

It will remove abc from window safely.

```
define(function(require, exports, module) {
window.abc = "abc";
try { delete window.abc } catch(e) { window.abc = null }
});
```

## In NodeJS

```js
var cmdize = require('cmdize');

cmdize(code, options, function(result) {
  // print cmdized code
  console.log(result);
});
```
