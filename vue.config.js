/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
    publicPath: '',
    chainWebpack: config => {
        config.performance
            .maxEntrypointSize(245 * 1024);
    },
};
