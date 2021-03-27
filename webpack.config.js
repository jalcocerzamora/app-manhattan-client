const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const LinkTypePlugin = require('html-webpack-link-type-plugin').HtmlWebpackLinkTypePlugin;
// const CopyPlugin = require('copy-webpack-plugin');

// import './node_modules/leaflet/dist/leaflet.css';

// For pure CSS - /\.css$/i,
// For Sass/SCSS - /\.((c|sa|sc)ss)$/i,
// For Less - /\.((c|le)ss)$/i,

module.exports = {
    // externals: {
    //     moment: 'moment'
    // },
    devServer: {
        contentBase: './',
        watchContentBase: true
    },
    resolve: {
        modules: [
        // path.join(__dirname, "src"),
        'node_modules',
        ],
        alias: {
            // 'chart.js': 'chart.js',
            // 'mapbox-gl': 'mapbox-gl',
            // 'leaflet-locate-control': path.resolve(__dirname, 'node_modules/leaflet.locatecontrol/src/L.Control.Locate.js'),
            // 'marker-shadow.png': path.resolve(__dirname, '/app-manhattan-client/projects/store/src/assets/images/leaftlet/marker-shadow.png'),
            // 'node_modules/leaflet/dist/leaflet.css': path.resolve(__dirname, '/node_modules/leaflet/dist/leaflet.css')
            // 'leaflet': path.resolve(__dirname, '/node_modules/leaflet/dist/leaflet.css')
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
        //     filename: './node_modules/leaflet/dist/leaflet.css',
            filename: './node_modules/mapbox-gl/dist/mapbox-gl.css',
        }),
        // new CopyPlugin({
        //     patterns: [
        //       { from: "assets", to: "assets" },
        //     ],
        // }),
        // new HtmlWebpackPlugin({
        //     template: 'index.html'
        // }),
        // new LinkTypePlugin({
        //     '**/*.css' : 'text/css'
        // }),
    ],
    module: {
        rules: [
            // { test: /\.css$/i, loaders: [ 'style-loader', 'css-loader' ] },
            {
                test: /\.((c|sa|sc)ss)$/i,
                use: [
                    // "style-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            // plugins: () => [postcssPresetEnv({ stage: 0 })],
                            // importLoaders: 1,
                            postcssOptions: {
                                ident: 'postcss',
                                syntax: 'postcss-scss',
                                plugins: [
                                    require('postcss-import'),
                                    require('tailwindcss'),
                                    require('autoprefixer'),
                                ],
                            },
                        },
                    },
                    // { loader: "sass-loader", },
                ],
            },            
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
                loader: "url-loader",
                options: {
                    limit: 8192,
                },
            },
            /*
            {
                test: /\.css$/i,
                use: [
                    "style-loader",                  
                    {
                        loader: "css-loader",
                        options: {
                            // Run `postcss-loader` on each CSS `@import`, do not forget that `sass-loader` compile non CSS `@import`'s into a single file
                            // If you need run `sass-loader` and `postcss-loader` on each CSS `@import` please set it to `2`
                            importLoaders: 2,

                            // Automatically enable css modules for files satisfying `/\.module\.\w+$/i` RegExp.
                            modules: { auto: true },
                        },
                    },
                ],
            },*/
            /*
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    publicPath: "./",
                    outputPath: "app"
                }
            },
            */
            // {
            //     test: /\.(png|jpg|gif)$/,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: {
            //                 outputPath: 'assets/images/',
            //                 publicPath: 'assets/images/',
            //             },
            //         },
            //     ],
            // },

            // {
            //     test: /\.s[ac]ss$/i,
            //     // // test: /\.scss$/,
            //     loader: 'postcss-loader',
            //     options: {
            //         postcssOptions: {
            //             ident: 'postcss',
            //             syntax: 'postcss-scss',
            //             plugins: [
            //               require('postcss-import'),
            //               require('tailwindcss'),
            //               require('autoprefixer'),
            //             ],
            //         },
            //     }
            // },
            // {
            //     test: /\.css$/,
            //     exclude: /node_modules/,
            //     use: [
            //       {
            //         loader: 'style-loader',
            //       },
            //       {
            //         loader: 'css-loader',
            //         options: {
            //           importLoaders: 1,
            //         }
            //       },
            //       {
            //         loader: 'postcss-loader'
            //       }
            //     ]
            // }
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'postcss-loader'],
            // },
            // {
            //     test: /\.jsx?$/,
            //     use: ['babel-loader', 'astroturf/loader'],
            // },
        ]
    },
    // optimization: {
    //     minimize: true,
    //     minimizer: [
    //       // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
    //       // `...`
    //       new CssMinimizerPlugin(),
    //     ],
    //   },
};
