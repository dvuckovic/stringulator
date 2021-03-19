/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
const project = require('./package.json');
const lodash = require('lodash');

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
            .maxEntrypointSize(338 * 1024)
            .maxAssetSize(679 * 1024);
    },
};
