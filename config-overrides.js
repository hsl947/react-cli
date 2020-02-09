//用于修改webpack默认配置
const path = require('path')

module.exports = function override(config) {
	// do stuff with the webpack config...
	// 设置别名路径
	config.resolve.alias = {
		...config.resolve.alias,
		'@': path.resolve(__dirname, './src')
	}
	return config
}
