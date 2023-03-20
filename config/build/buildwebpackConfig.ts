import {BuildOption} from "./types/config";
import webpack from "webpack";
import path from "path";
import {buildPlugins} from "./buildPlugins";
import {buildLoader} from "./buildLoader";
import {BuildResolvers} from "./buildResolvers";
import {buildDevServer} from "./buildDevServer";


export function buildWebpackConfig(options: BuildOption): webpack.Configuration {
  const {mode, paths, isDev} = options

  return {
    mode: mode,
    entry: paths.entry,
    devtool: 'source-map',
    devServer: isDev ? buildDevServer(options) : undefined,
    output: {
      filename: '[name].[contenthash].js',
      path: paths.build,
      clean: true
    },
    plugins: buildPlugins(paths),
    module: {
      rules: buildLoader(options)
    },
    resolve: BuildResolvers(),
  }
}