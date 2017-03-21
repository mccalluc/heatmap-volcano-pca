(function () {
  window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
    alert(errorMsg
        + '\n\n' + url
        + ' (' + lineNumber + ':' + column + ')');
  };

  requirejs.default_paths = function (defaults) {
    /*
     In production environments, better to have dependencies checked in,
     but in development easier to rely on defaults from free CDNs.
     This lets us indicate dependencies by short name ("d3") in source code,
     but the exact version to pull can be determined at runtime.
     */
    var configured = requirejs.s.contexts._.config.paths; // No public API. :(
    for (key in defaults) {
      if (!configured[key]) {
        var paths = {};
        paths[key] = defaults[key];
        // In production: paths[key] = 'provide-local-copy-of://' + defaults[key];
        // That way you can't accidentally use CDNs in production.
        requirejs.config({
          paths: paths
        });
      }
    }
  };
  requirejs.config({
    "baseUrl": "src"
  });
  requirejs.default_paths({
    "d3": "https://cdnjs.cloudflare.com/ajax/libs/d3/4.4.0/d3.min"
  });

  require(['heatmap_scatterplot', 'd3'], function () {
    alert('here?');
  });
})();