var path = require('path');
var webpack = require('webpack');
const WebpackMd5Hash = require('webpack-md5-hash');
const AssetsPlugin = require('assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const moment = require("moment");

let babelOptions = {
  "presets": "es2015"
};

module.exports = {
	entry:
	{
		app: ['./src/Main'],
	}
	,
	output: {
		publicPath: "/",
		path: path.join(__dirname, 'dist'),
		filename: '[name].[hash].js',
		chunkFilename: '[name].[hash].js'
	},
	resolve: {
		alias: {
			//for absolute import path
			app: path.join(__dirname, "src", "app"),
			util: path.join(__dirname, "src", "util"),
			lib: path.join(__dirname, "src", "lib"),
		},
		extensions: ['.js', '.ts', '.tsx', '.html']
	},
	plugins: [
		new webpack.ProvidePlugin({
			"$": "jquery",
			"jQuery": "jquery",
			"window.jQuery": "jquery"
		}),

		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: ({ resource }) => /node_modules/i.test(resource),
		}),

		new webpack.DefinePlugin({
			'process.env': {
				BUILD_VERSION: JSON.stringify(moment().format('YYYYMMDDHHmmss'))
			}
		}),
		new WebpackMd5Hash(),
		new HtmlWebpackPlugin({
      template:"src/index.html",
      inject: "body"
    })		
	],
	module: {
		loaders: [
			{
				test: /\.(ts|tsx)$/,
				include: path.join(__dirname, 'src'),
				use: [
					{
						loader: 'babel-loader',
						options: babelOptions
					},
					{						
						loader: 'awesome-typescript-loader'
					}
				]
			},
			// {
			// 	test: /\.html$/,
			// 	exclude: /node_modules/,
			// 	loader: "html-loader",
			// 	include: path.join(__dirname, 'src'),
			// 	exclude: path.join(__dirname, 'src/index.html'),
			// },
			// {
			// 	test: /\.html$/,
			// 	loader: 'file-loader?name=[name].[ext]',
			// 	include: path.join(__dirname, 'src/index.html')
			// },
			{
				test: /\.(css)$/,
				loader: "style-loader!css-loader"
			},
			{
				test: /\.(scss)$/,
				loader: "style-loader!css-loader!sass-loader"
			},
			{
				test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
				loader: 'file-loader?name=vendor/font/[name].[hash].[ext]',
				include: /node_modules/
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				loader: 'file-loader?name=vendor/image/[name].[hash].[ext]',
				include: /node_modules/
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				loader: 'file-loader?name=image/[name].[hash].[ext]',
				include: /src/
			}
		]
	}
};
