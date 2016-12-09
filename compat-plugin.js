module.exports = CompatPlugin;

function CompatPlugin(offlinePlugin) {
  this.offlinePlugin = offlinePlugin;
}

CompatPlugin.prototype.apply = function(compiler) {
  var offlinePlugin = this.offlinePlugin;
  compiler.plugin('emit', function(compilation, callback) {
    // Set runtimeAdded to false to make sure the result is only from the below
    // source for the purposes of this demo.
    offlinePlugin.flags.runtimeAdded = false;

    var runtimePath = require.resolve('offline-plugin/runtime');
    function walk(compilation) {
      compilation.chunks.forEach(function(chunk) {
        chunk.modules.forEach(function(module) {
          if (module.resource === runtimePath) {
            offlinePlugin.flags.runtimeAdded = true;
          }
        });
      });
      compilation.children.forEach(walk);
    }
    walk(compilation);
    callback();
  });
};