const path = require('path');
const yargs = require('yargs');

const libraryName = 'giant';
const libraryVar = 'g';
let outputFile = '';

if (yargs.argv.p) {
	outputFile = libraryName + '.min.js';
} else {
	outputFile = libraryName + '.js';
}

module.exports = {
	entry: path.join(__dirname, '/src/g.core.ts'),
	devtool: 'source-map',
	output: {
		path: path.join(__dirname, '/dist'),
		filename: outputFile,
		library: libraryVar,
		libraryTarget: 'umd',
		umdNamedDefine: true,
	},
	module: {
		rules: [
			{
				loader: 'ts-loader',
				test: /\.tsx?$/,
			},
			{
				loader: 'tslint-loader',
				enforce: 'pre',
				test: /\.tsx?$/,
			},
			{
				exclude: '/node_modules/',
			}
		]
	},
	resolve: {
		extensions: [ '.js', '.ts', '.tsx' ]
	},
	watchOptions: {
		ignored: [
			'/node_modules/',
			'/test',
			'/**/*.js'
		]
	},
	devServer: {
		port: 8100
	}
};
