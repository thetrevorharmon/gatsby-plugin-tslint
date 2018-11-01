const resolvableExtensions = () => [`.ts`, `.tsx`]

function onCreateBabelConfig({ actions }, pluginOptions) {
  actions.setBabelPreset({
    name: `@babel/preset-typescript`,
  })
}

function onCreateWebpackConfig({ actions, loaders }) {
  // const jsLoader = loaders.js()

  // if (!jsLoader) {
    // return
  // }

  const tslintOptions = {
    configuration: {
        rules: {
            quotemark: [true, 'double']
        }
    },
    emitErrors: true,
    failOnHint: false,
  };

  actions.setWebpackConfig({
    module: {
      rules: [{
        test: /\.tsx$/,
        enforce: 'pre',
        use: [{
          loader: 'tslint-loader',
          options: tslintOptions
        }]
      }]
    }
  });
}

exports.resolvableExtensions = resolvableExtensions
exports.onCreateBabelConfig = onCreateBabelConfig
exports.onCreateWebpackConfig = onCreateWebpackConfig
