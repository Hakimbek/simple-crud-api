import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import nodeExternals from 'webpack-node-externals'
import Dotenv from 'dotenv-webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    entry: './src/server.js',
    target: 'node',
    mode: 'production',
    externals: [nodeExternals()],
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'bundle.cjs',
        libraryTarget: 'commonjs2'
    },
    plugins: [
        new Dotenv()
    ],
};
