import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import nodeExternals from 'webpack-node-externals'
import Dotenv from 'dotenv-webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

module.exports = {
    entry: './src/server.js',
    target: 'node',
    externals: [nodeExternals()],
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'server.js'
    },
    plugins: [
        new Dotenv()
    ],
    mode: 'production'
};
