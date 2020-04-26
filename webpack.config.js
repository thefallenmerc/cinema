const path = require('path');

module.exports = env => {
    console.log(env.NODE_ENV);
    return {
        resolve: {
            // modules: [
            //     path.resolve('client'),
            //     path.resolve('node_modules')
            // ],
            // alias: {
            //     'react$': path.join(__dirname, 'node_modules', 'react', 'cjs',
            //         (env.NODE_ENV !== 'development' && false ? 'react.production.min.js' : 'react.development.js')),
            //     'react-dom$': path.join(__dirname, 'node_modules', 'react-dom', 'cjs',
            //         (env.NODE_ENV !== 'development' && false ? 'react-dom.production.min.js' : 'react-dom.development.js')),
            // }
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                }
            ]
        },
        output: {
            path: path.resolve(__dirname, 'public'),
            filename: 'main.js'
        },
        entry: [
            './client/index.js'
        ],
        // optimization: {
        //     minimize: false
        // },
        // devtool: 'inline-source-map',
        // mode: 'development'
    };
}