const paths = require('../paths')

// sitemap.xml (only in production)
// https://www.npmjs.com/package/sitemap-webpack-plugin
module.exports = {
	base: paths.host,
	paths: [
		'/'
	],
	options: {
		fileName: 'sitemap.xml'
	}
}
