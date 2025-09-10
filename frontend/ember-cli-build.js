'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // Add options here
    fingerprint: {
      enabled: true,
      generateAssetMap: true,
      fingerprintAssetMap: true
    },
    
    // Build options for production
    minifyCSS: {
      enabled: true,
      options: { level: 2 }
    },
    
    minifyJS: {
      enabled: true
    },
    
    // Source maps
    sourcemaps: {
      enabled: false,
      extensions: ['js']
    },
    
    // Auto import configuration
    autoImport: {
      webpack: {
        // Webpack configuration
      }
    }
  });

  return app.toTree();
};