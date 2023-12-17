import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    server: {
      cors: true,
      port: 5175,
      host: "0.0.0.0",
      // headers: {
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Headers": "*",
      //   "Access-Control-Allow-Methods": "*",
      // },
      open: true,
      proxy: {
        "/api": {
          target: "http://127.0.0.1:3000",
          changeOrigin: true,
        },
      },
    },
    resolve: {
      alias: [
        {
          find: "@",
          replacement: path.resolve("./src"),
        },
      ],
    },

    base:
      mode === "development"
        ? ""
        : "https://lcsubappassets.oss-cn-guangzhou.aliyuncs.com/admin/",
  };
});
