const tsp = require('tsconfig-paths-webpack-plugin');

const webpack = function override(config) {
    config.resolve = { ...config.resolve, plugins: [new tsp({ configFile: 'config/paths.json' })] };
    return config;
};
module.exports = { webpack };
