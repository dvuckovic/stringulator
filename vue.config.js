/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
const lodash = require('lodash');
const project = require('./package.json');

module.exports = {
    publicPath: '',
    pages: {
        index: {
            entry: 'src/main.js',
            title: `${lodash.upperFirst(project.name)} - ${project.description}`,
        },
    },
    chainWebpack: config => {
        config.performance
            .maxEntrypointSize(1024 * 1024)
            .maxAssetSize(1024 * 1024);
    },
};
