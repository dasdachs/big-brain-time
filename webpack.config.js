
const path = require("path")

const CopyPlugin = require("copy-webpack-plugin")
const Dotenv = require("dotenv-webpack")
const { EnvironmentPlugin } = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")


const portArgIndex = process.argv.indexOf("--port")
const port = portArgIndex !== -1 ? parseInt(process.argv[portArgIndex + 1]) : 3000

if (!process.env.NODE_ENV) {
	process.env.NODE_ENV = "development"
}

const isProduction = process.env.NODE_ENV === "production"

let plugins = [
	new MiniCssExtractPlugin({
		filename: "[name].bundle.css",
		chunkFilename: "[id].css",
	}),
	new HtmlWebpackPlugin({
		template: "public/index.html",
		hash: true,
		filename: "index.html",
	})
]

// In production firebase secrets should be read from the env
if (isProduction) {
	plugins = [
		...plugins,
		new CopyPlugin({
			patterns: [
				{
					context: "public/",
					from: "**/*",
					globOptions: {
						ignore: ["**/index.html"],
					},
				},
			],
		}),
		new EnvironmentPlugin({
			DEBUG: false,
			PUBLIC_URL: "https://big-brain-time-6a3ae.web.app",
			REACT_APP_API_KEY: JSON.stringify(process.env.REACT_APP_API_KEY),
			REACT_APP_APP_ID: JSON.stringify(process.env.REACT_APP_APP_ID),
			REACT_APP_AUTH_DOMAIN: JSON.stringify(process.env.REACT_APP_AUTH_DOMAIN),
			REACT_APP_MEASUREMENT_ID: JSON.stringify(process.env.REACT_APP_MEASUREMENT_ID),
			REACT_APP_MESSAGING_SENDER_ID: JSON.stringify(process.env.REACT_APP_MESSAGING_SENDER_ID),
			REACT_APP_PROJECT_ID: JSON.stringify(process.env.REACT_APP_PROJECT_ID),
			REACT_APP_STORAGE_BUCKET: JSON.stringify(process.env.REACT_APP_STORAGE_BUCKET),
		}),
	]
} else {
	plugins = [...plugins, new Dotenv()]
}

module.exports = {
	entry: `./src/index.tsx`,
	mode: isProduction ? "production" : "development",
	target: "web",
	output: {
		filename: "[name].[contenthash].js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "/",
	},
	cache: isProduction ? false : { type: "filesystem" },
	module: {
		rules: [
			{
				test: /\.(ts|tsx|js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "swc-loader"
				},
			},
			{
				test: /\.css$/i,
				use: ["css-loader", "postcss-loader"],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
				generator: {
					filename: "assets/[hash][ext][query]",
				},
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js", "jsx"],
	},
	devtool: isProduction ? "source-map" : "inline-cheap-module-source-map",
	devServer: {
		historyApiFallback: true,
		static: path.join(__dirname, "public"),
		allowedHosts: ["*"],
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
		port,
		open: true,
		client: {
			overlay: {
				warnings: true,
				errors: true,
			},
		},
	},
	optimization: {
		splitChunks: {
			chunks: "all",
		},
	},
	plugins
}
