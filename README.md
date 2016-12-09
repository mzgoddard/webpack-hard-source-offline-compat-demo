# webpack-hard-source-offline-compat-demo

Demonstrate hard source webpack plugin and offline plugin and solutions for them to cooperate. At the time of writing this repository offline plugin uses a test to check that its runtime is inside the webpack build when the module is built. Since hard source uses a cached version of the runtime and it isn't built that current test cannot detect the module and throws an error.

## a possible solution

One possible solution is to add a [different test](./compat-plugin.js) to offline-plugin that checks for existence of the module during the webpack `emit` step. This check could look at the modules of built chunks adding some extra insurance outside of working with hard source that not only was the module built but that it is included in a built chunk.

Some provided in this repo webpack configurations demo this solution.

- [webpack.config.js](./webpack.config.js): Demos the compatibility solution with a plugin
- [webpack.config.commons.js](./webpack.config.commons.js): The same compatibility plugin with CommonsChunkPlugin to test a differnt use case
- [webpack.config.prefetch-should-fail.js](./webpack.config.prefetch-should-fail.js): The same compatibility plugin with PrefetchPlugin that the current test currently provides a false positive on
- [webpack.config.prefetch-should-pass.js](./webpack.config.prefetch-should-pass.js): The same compatibility plugin with PrefetchPlugin

### Prefetching

I wanted to think about what when offline plugin's current and this proposed change may provide false positives or negatives. One false positive I thought of is with Prefetching. `PrefetchPlugin` builds the requested module before any entry or dependency is built that needs the requested module. This also means the prefetched module could be not used but still built. The current test in offline plugin would provide a false negative. The proposed solution would not.
