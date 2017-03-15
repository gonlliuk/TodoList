import webpack from 'webpack'
import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const dev = process.env.NODE_ENV !== 'production'

const options = {
	devtool: dev ? '#source-map-eval' : null,

    watch: dev,

    entry: {
        vendor: [
        'react',
        'firebase',
        'react-dom',
        'react-router',
        'history',
        'redux',
        'react-redux',
        'react-router-redux',
        ],

        app: './src/js/bootstrap.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist/js'),
        publicPath: '/js/',
        filename: dev ? '[name].js' : '[chunkhash:12].js'
    },

    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: [/node_modules/, /dist/],
            use: [{
            	loader: 'babel-loader',
            	options: {
	                presets: ['es2015', 'stage-2', 'react'],
                    plugins: ['transform-decorators-legacy']
	            }
            }]
        }, {
        	test: /\.styl$/,
        	exclude: [/node_modules/, /dist/],
        	use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [
                    'css-loader',
                    'postcss-loader',
                    'stylus-loader'
                ]
            })
        }]
    },
    
    resolve: {
    	modules: [
    		path.resolve(__dirname, 'src'),
    		'node_modules'
    	],
        extensions: ['.js', '.jsx', '.styl'],
        alias: {
            service: path.resolve(__dirname, 'src/js/service/'),
            libs: path.resolve(__dirname, 'src/js/libs/'),
            apps: path.resolve(__dirname, 'src/js/apps/'),
        }
    },

    plugins: [
        new ExtractTextPlugin({
            filename: (getPath) => {
                return getPath('../css/[name].css');
            },
            disable: false,
            allChunks: true
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChuncks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            minChuncks: 2
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                GOOGLE_KEY: JSON.stringify(process.env.GOOGLE_KEY),
                GOOGLE_SENDER: JSON.stringify(process.env.GOOGLE_SENDER),
            },
        })
    ]
}

export default options
