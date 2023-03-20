import webpack from "webpack";

export function BuildResolvers(): webpack.ResolveOptions {
  return {
    extensions: ['.tsx', '.ts', '.js'],
  }
}