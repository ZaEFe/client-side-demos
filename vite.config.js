//  vite.config.js
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    base: "/pages-site/",
    build: {
        outDir: "docs",
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                project1: resolve(__dirname, "project-1/index.html"),
                project2: resolve(__dirname, "project-2/index.html"),
            },
        },
    },
})