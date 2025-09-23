(function setupOfflineCdnShim() {
  // Configure mappings from CDN URLs to local files you host alongside the client.
  // Place files under /assets/vendor/ matching the expected paths below.
  var CDN_MAPPINGS = [
    {
      match: /https:\/\/cdn\.jsdelivr\.net\/npm\/@vuer-ai\/mujoco-ts@[^/]+\/dist\/index\.umd\.js/i,
      local: '/assets/vendor/@vuer-ai/mujoco-ts/dist/index.umd.js'
    },
    {
      match: /https:\/\/cdn\.jsdelivr\.net\/npm\/@webxr-input-profiles\/assets@[^/]+\/dist\/profiles\/profilesList\.json/i,
      local: '/assets/vendor/@webxr-input-profiles/assets/dist/profiles/profilesList.json'
    },
    {
      match: /https:\/\/cdn\.jsdelivr\.net\/npm\/@webxr-input-profiles\/assets@[^/]+\/dist\/profiles\/generic-hand\/right\.glb/i,
      local: '/assets/vendor/@webxr-input-profiles/assets/dist/profiles/generic-hand/right.glb'
    },
    {
      match: /https:\/\/cdn\.jsdelivr\.net\/npm\/@webxr-input-profiles\/assets@[^/]+\/dist\/profiles\/generic-hand\/left\.glb/i,
      local: '/assets/vendor/@webxr-input-profiles/assets/dist/profiles/generic-hand/left.glb'
    }
  ];

  function toLocal(url) {
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
      var offline = !navigator.onLine || (typeof location !== 'undefined' && location.protocol === 'file:');
      var mapped = toLocal(url);
      if (offline && mapped) {
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
      var args = rewriteRequest(input, init);
      return originalFetch.apply(this, args).catch(function(err){
        // On network failure, attempt local fallback once.
        try {
          var url = typeof args[0] === 'string' ? args[0] : (args[0] && args[0].url);
          var mapped = toLocal(url || (typeof input === 'string' ? input : (input && input.url)));
          if (mapped && mapped !== url) {
            return originalFetch(mapped, init);
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
        var offline = !navigator.onLine || (typeof location !== 'undefined' && location.protocol === 'file:');
        var mapped = offline ? toLocal(String(value)) : null;
        return originalSet.set.call(this, mapped || value);
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
})();


