import {BuildOption} from "./types/config";
import type {Configuration as DevServer} from "webpack-dev-server";

export function buildDevServer(options: BuildOption): DevServer {
  return {
    port: options.port,
    open: true,
    historyApiFallback: true
  }
}