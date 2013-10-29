# CDN 

[![Build Status](https://travis-ci.org/afc163/cmdize.png)](https://travis-ci.org/afc163/cmdize)
[![NPM version](https://badge.fury.io/js/cdn.png)](http://badge.fury.io/js/cmdize)
[![David Status](https://david-dm.org/afc163/cdn.png)](https://david-dm.org/afc163/cmdize) 

Convert normal js to cmd module.

![demo](https://i.alipayobjects.com/e/201301/22tNik5rDY.png)

---

## Install

```
$ npm install cmdize -g
```

## Usage

There is a js file `exmple.js`:

```js
// exmple.js
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
// exmple.js
window.abc = "abc";
});
```

## Options

* clearGlobal

```
$ cmdize example.js --clear-global
```

```

```
