var tests = [];

Object.keys(window.__karma__.files).forEach(function (file) {
  if (/(spec|test)\.js$/i.test(file)) {
    var normalized = file.replace(/\.js$/g, '');
    tests.push(normalized);
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base/src',

  paths: {
    test: '../test',
    d3: "https://cdnjs.cloudflare.com/ajax/libs/d3/4.4.0/d3.min"
  },

  // dynamically load all test files
  deps: tests,

  // start test run, once Require.js is done
  callback: window.__karma__.start
});
