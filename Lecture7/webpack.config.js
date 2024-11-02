const path = require('path');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'], 
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        port: 8000,
        hot: true,
        historyApiFallback: true, 
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/, 
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};
