const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports = merge(common, {
	plugins: [
		new UglifyJSPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				//NODE＿ENVという名前にしておくと、どこかで、Reactをproductionモードにしてくれるみたい
				NODE_ENV: JSON.stringify('production')
			}
		})
	]
});