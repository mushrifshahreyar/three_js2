module.exports = {
	mode: 'development',
	entry: `./src/js/fog/init.js`,
	output: {
		filename: `main.js`
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				},
			},
			{
				test: /\.(glsl|fs|vs)$/,
				exclude: /node_modules/,
				use: {
					loader: 'glslify-import-loader',
				}
			},
			{
				test: /\.(glsl|fs|vs)$/,
				exclude: /node_modules/,
				use: {
					loader: 'raw-loader',
				}
			},
			{
				test: /\.(glsl|fs|vs)$/,
				exclude: /node_modules/,
				use: {
					loader: 'glslify-loader',
				}
			}
		]
	}
};
