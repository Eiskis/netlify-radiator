const merge = require('lodash').merge
const baseConfig = require('../paths')

module.exports = merge({}, baseConfig, {

	// Use something like this for your local lambda server
	functions: 'http://localhost:9000/',

	// Use something like this for your deployed radiator
	// functions: 'https://your-site-830jdj.netlify.com/.netlify/functions/',

	host: 'http://localhost:8080/',
	staticAssetsPath: '/static/'
})
