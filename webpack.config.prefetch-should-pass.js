var offlinePlugin = new (require('offline-plugin'))();

module.exports = {
  context: __dirname,
  entry: {
    main: './src/index',
  },
  output: {
    path: 'dist',
    filename: '[name]-[hash].js',
  },
  plugins: [
    new (require('./compat-plugin'))(offlinePlugin),
    // new (require('hard-source-webpack-plugin'))({
    //   cacheDirectory: __dirname + '/tmp/hard-source/[confighash]',
    //   recordsPath: __dirname + '/tmp/hard-source/[confighash]/records.json',
    //   configHash: (require('node-object-hash'))().hash,
    // }),
    offlinePlugin,
    new (require('webpack').PrefetchPlugin)(__dirname, 'offline-plugin/runtime'),
  ],
};
