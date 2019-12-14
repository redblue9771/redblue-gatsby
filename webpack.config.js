/* eslint-disable import/no-extraneous-dependencies */
/* eslint-env node */

const path = require('path')

module.exports = {
  resolve: {
    // this config field should be required if you want to use alias
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
    alias: {},
    extensions: ['.js', '.jsx'],
  },
}
