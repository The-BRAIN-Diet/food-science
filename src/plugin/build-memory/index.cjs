/** Bound module-build concurrency independently of the existing Terser worker cap. */
module.exports = function buildMemoryPlugin() {
  return {
    name: 'production-build-memory',
    configureWebpack(config) {
      return config.mode === 'production' ? {parallelism: 1} : {};
    },
  };
};
