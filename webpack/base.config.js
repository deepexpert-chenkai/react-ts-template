const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const resolve = path.resolve.bind(__dirname);
console.log('__dirname: ', __dirname);

const PATHS = {
	src: resolve('../src'),
	root: resolve('../'),
	dist: resolve('../dist'),
	store: resolve('../src/store'),
	assets: resolve('../src/assets'),
	utils: resolve('../src/utils'),
	components: resolve('../src/components'),
	containers: resolve('../src/containers'),
	nodeModules: resolve('../node_modules')
};

const entry = {
  app: path.resolve(__dirname, '../src/index.tsx'),
};

const output = {
  filename: 'js/[name].[chunkhash].js',
  path: path.resolve(__dirname, '../dist'),
}

const tsConfig = {
	test: /\.tsx?$/,
  loader: 'ts-loader',
	exclude: PATHS.nodeModules,
};

const htmlConfig = {
	test: /\.html$/,
	use: [
		{
			loader: 'html-loader',
			options: {
				minimize: true
			}
		}
	]
};

const postcssPlugins = [
	require('postcss-easy-import'),
	require('postcss-url')({
		url: 'rebase'
	}),
	require('postcss-utilities'),
	require('postcss-flexbugs-fixes'),
	require('autoprefixer')()
];

const cssConfig = {
	test: /(\.css|\.scss)$/,
	use: [
		'css-hot-loader',
		MiniCssExtractPlugin.loader,
		'css-loader',
		{
			loader: 'postcss-loader',
			options: {
				postcssOptions: loader => ({
					plugins: loader.hot ? postcssPlugins : [...postcssPlugins, require('cssnano')()]
				})
			}
		},
		'sass-loader'
	]
};

const fontsConfig = {
	test: /\.(eot|otf|ttf|woff|woff2)$/,
	use: 'file-loader'
};

const svgConfig = {
	test: /\.svg$/,
	issuer: /\.tsx?$/,
	exclude: /node_modules/,
	loader: 'svg-inline-loader'
};

const svgCSSConfig = {
	test: /\.svg$/,
	issuer: /\.s?css?$/,
	use: [
		{
			loader: 'url-loader',
			options: {
				limit: 10 * 1024
			}
		}
	]
};

const imagesConfig = {
	test: /\.(jpg|png|gif|ico)$/,
	use: [
		{
			loader: 'url-loader',
			options: {
				limit: 10 * 1024
			}
		},
		{
			loader: 'image-webpack-loader',
			options: {
				mozjpeg: {
					enabled: true,
					progressive: true
				},
				gifsicle: {
					interlaced: false
				},
				optipng: {
					optimizationLevel: 7
				},
				pngquant: {
					quality: [0.65, 0.9],
					speed: 4
				}
			}
		}
	]
};

const resolveConfig = {
  alias: {
    '@src': PATHS.src,
    '@root': PATHS.root,
    '@store': PATHS.store,
    '@assets': PATHS.assets,
    '@utils': PATHS.utils,
    '@components': PATHS.components,
    '@containers': PATHS.containers
  },
  extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  modules: ['src', 'node_modules']
};

module.exports = {
  PATHS,
  entry,
  output,
  tsConfig,
  htmlConfig,
  postcssPlugins,
  svgCSSConfig,
  cssConfig,
  fontsConfig,
  svgConfig,
  imagesConfig,
  resolveConfig
}