//  vite.config.js
import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    base: "/client-side-demos/",
    root: "src",
    build: {
        outDir: "../docs",
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, "src/index.html"),
                project1: resolve(__dirname, "src/demos-projects/project-1/index.html"),
                project2: resolve(__dirname, "src/demos-projects/project-2/index.html"),
                about: resolve(__dirname, "src/demos-projects/about/index.html"),
                react: resolve(__dirname, "src/demos-projects/react/index.html"),
            },
        },
    },
})