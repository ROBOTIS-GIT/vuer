(function setupOfflineCdnShim() {
  // Configure mappings from CDN URLs to local files you host alongside the client.
  // Place files under /assets/vendor/ matching the expected paths below.
  var DEFAULT_CONFIG = {
    // Resolve vendored assets locally before making any external request.
    preferLocalFirst: true,
    // Robot deployments must not wait for an unreachable CDN. Developers can
    // explicitly opt in with window.__OFFLINE_CDN_SHIM__ when desired.
    allowNetworkFallback: false
  };

  function getConfig() {
    try {
      var cfg = (window && window.__OFFLINE_CDN_SHIM__) || {};
      if (typeof localStorage !== 'undefined') {
        var stored = localStorage.getItem('offlineShimPreferLocalFirst');
        if (stored === 'true') cfg.preferLocalFirst = true;
        if (stored === 'false') cfg.preferLocalFirst = false;
      }
      if (typeof cfg.preferLocalFirst !== 'boolean') cfg.preferLocalFirst = DEFAULT_CONFIG.preferLocalFirst;
      if (typeof cfg.allowNetworkFallback !== 'boolean') cfg.allowNetworkFallback = DEFAULT_CONFIG.allowNetworkFallback;
      return cfg;
    } catch (_) {
      return DEFAULT_CONFIG;
    }
  }
  var CDN_MAPPINGS = [
    {
      match: /https:\/\/cdn\.jsdelivr\.net\/npm\/@vuer-ai\/mujoco-ts@[^/]+\/dist\/index\.umd\.js/i,
      local: '/assets/vendor/@vuer-ai/mujoco-ts/dist/index.umd.js'
    },
  ];

  var WEBXR_PROFILE_PREFIX =
    /^https:\/\/cdn\.jsdelivr\.net\/npm\/@webxr-input-profiles\/assets@[^/]+\/dist\/profiles\/(.+)$/i;

  function toLocal(url) {
    var webxrMatch = String(url).match(WEBXR_PROFILE_PREFIX);
    if (webxrMatch) {
      var relativePath = webxrMatch[1].split(/[?#]/)[0];
      // Do not allow an external URL to escape the vendored asset directory.
      if (relativePath.indexOf('..') !== -1 || relativePath.charAt(0) === '/') return null;
      return '/assets/vendor/@webxr-input-profiles/assets/dist/profiles/' + relativePath;
    }
    for (var i = 0; i < CDN_MAPPINGS.length; i++) {
      var rule = CDN_MAPPINGS[i];
      if (rule.match.test(url)) return rule.local;
    }
    return null;
  }

  function rewriteRequest(input, init) {
    try {
      var url = typeof input === 'string' ? input : (input && input.url);
      if (!url) return [input, init];
      var cfg = getConfig();
      var offline = !navigator.onLine || (typeof location !== 'undefined' && location.protocol === 'file:');
      var mapped = toLocal(url);
      if ((cfg.preferLocalFirst && mapped) || (offline && mapped)) {
        return [mapped, init];
      }
      return [input, init];
    } catch (e) {
      return [input, init];
    }
  }

  // Patch window.fetch
  if (typeof window !== 'undefined' && typeof window.fetch === 'function') {
    var originalFetch = window.fetch.bind(window);
    window.fetch = function(input, init) {
      var cfg = getConfig();
      var originalUrl = (typeof input === 'string' ? input : (input && input.url)) || '';
      var mapped = originalUrl ? toLocal(originalUrl) : null;
      if (cfg.preferLocalFirst && mapped) {
        return originalFetch(mapped, init).then(function(response) {
          // fetch does not reject on HTTP errors, so test response.ok too.
          if (response.ok || !cfg.allowNetworkFallback) return response;
          return originalFetch(input, init);
        }).catch(function(err){
          if (cfg.allowNetworkFallback) return originalFetch(input, init);
          throw err;
        });
      }
      var args = rewriteRequest(input, init);
      return originalFetch.apply(this, args).catch(function(err){
        // On network failure, attempt local fallback once.
        try {
          var url = typeof args[0] === 'string' ? args[0] : (args[0] && args[0].url);
          var mapped2 = toLocal(url || originalUrl);
          if (mapped2 && mapped2 !== url) {
            return originalFetch(mapped2, init);
          }
        } catch (_) {}
        throw err;
      });
    };
  }

  // Patch script/link tag loading for <script src> and dynamic loaders
  function patchElement(tagName, srcAttr) {
    var proto = document.createElement(tagName).constructor.prototype;
    var originalSet = Object.getOwnPropertyDescriptor(proto, srcAttr);
    if (!originalSet || !originalSet.set) return;
    Object.defineProperty(proto, srcAttr, {
      set: function(value) {
        var cfg = getConfig();
        var offline = !navigator.onLine || (typeof location !== 'undefined' && location.protocol === 'file:');
        var val = String(value);
        var mapped = toLocal(val);
        var finalVal = (cfg.preferLocalFirst && mapped) ? mapped : (offline && mapped ? mapped : val);
        return originalSet.set.call(this, finalVal);
      },
      get: originalSet.get,
      configurable: true,
      enumerable: true
    });
  }

  if (typeof document !== 'undefined') {
    try { patchElement('script', 'src'); } catch (_) {}
    try { patchElement('link', 'href'); } catch (_) {}
  }

  // Patch XMLHttpRequest for libraries using XHR
  if (typeof window !== 'undefined' && typeof window.XMLHttpRequest !== 'undefined') {
    var OriginalXHR = window.XMLHttpRequest;
    function PatchedXHR() {
      var xhr = new OriginalXHR();
      var open = xhr.open;
      xhr.open = function(method, url) {
        try {
          var cfg = getConfig();
          var mapped = toLocal(String(url));
          var finalUrl = (cfg.preferLocalFirst && mapped) ? mapped : ( (!navigator.onLine || (typeof location !== 'undefined' && location.protocol === 'file:')) && mapped ? mapped : url);
          return open.apply(xhr, [method, finalUrl].concat([].slice.call(arguments, 2)));
        } catch (_) {
          return open.apply(xhr, arguments);
        }
      };
      return xhr;
    }
    // Preserve prototype chain
    PatchedXHR.prototype = OriginalXHR.prototype;
    try { window.XMLHttpRequest = PatchedXHR; } catch (_) {}
  }
})();

