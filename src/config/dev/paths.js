const merge = require('lodash').merge
const baseConfig = require('../paths')

module.exports = merge({}, baseConfig, {
	functions: 'http://localhost:9000/',
	host: 'http://localhost:8080/',
	staticAssetsPath: '/static/'
})
