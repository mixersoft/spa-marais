const { merge } = require("webpack-merge");
const singleSpaAngularWebpack = require('single-spa-angular/lib/webpack').default;

module.exports = (config, options) => {
  const singleSpaWebpackConfig = singleSpaAngularWebpack(config, options);

  // Feel free to modify this webpack config however you'd like to

  // "externals" is required for `import { transcriptId } from '@ml/shared';`
  return merge( singleSpaWebpackConfig, 
    {
      externals: [/^@ml\/.+/]
    }
  );

};
