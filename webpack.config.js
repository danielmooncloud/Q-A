var webpack = require('webpack'),
	   path = require('path');


module.exports = {
	context: __dirname + '/app',
	entry: {
		app: './app.js',
		vendor: ['angular', 'angular-route']
	},
	output: {
		path: __dirname + '/public/scripts',
		filename: 'build.bundle.js'
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")
	]
}