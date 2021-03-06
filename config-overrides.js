//用于修改webpack默认配置
const path = require('path')
const webpack = require('webpack')
const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require('customize-cra')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

// 分析打包大小
// const analyzer = () => (config) => {
// 	const plugins = [new BundleAnalyzerPlugin({ analyzerPort: 7777 })]
// 	config.plugins = [...config.plugins, ...plugins]
// 	return config
// }

// 打包体积优化
const optimization = () => (config) => {
	if (process.env.NODE_ENV === 'production') {
		config.optimization = {
			splitChunks: {
				chunks: 'all',
				minSize: 30000,
				maxSize: 0,
				minChunks: 1,
				maxAsyncRequests: 5,
				maxInitialRequests: 3,
				automaticNameDelimiter: '~',
				name: true,
				cacheGroups: {
					vendors: {
						test: /[\\/]node_modules[\\/]/,
						priority: 10
					},
					default: {
						minChunks: 2,
						priority: -10,
						reuseExistingChunk: true
					}
				}
			}
		}

		// 关闭sourceMap
		config.devtool = false
		// 添加js打包gzip配置
		config.plugins.push(
			new CompressionWebpackPlugin({
				test: /\.js$|\.css$/,
				threshold: 1024
			}),
			new webpack.optimize.AggressiveMergingPlugin(), //合并块
			new webpack.optimize.ModuleConcatenationPlugin()
		)
	}
	return config
}

module.exports = override(
	// 针对antd 实现按需打包：根据import来打包 (使用babel-plugin-import)
	fixBabelImports('import',{
		libraryName:'antd',
		libraryDirectory:'es',
		style:true//自动打包相关的样式 默认为 style:'css'
	}),

	// 使用less-loader对源码重的less的变量进行重新制定，设置antd自定义主题
	addLessLoader({
		javascriptEnabled: true,
		modifyVars:{'@primary-color':'#1DA57A'},
		localIdentName: '[local]--[hash:base64:5]' // use less-modules
	}),

	 // 配置路径别名
	addWebpackAlias({
		'@': path.resolve('src')
	}),

	// analyzer(),

	optimization()
)
