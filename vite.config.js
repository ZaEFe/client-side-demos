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
                clockDemo: resolve(__dirname, "src/demos-projects/clock/index.html"),
                project2: resolve(__dirname, "src/demos-projects/project-2/index.html"),
                about: resolve(__dirname, "src/demos-projects/about/index.html"),
                react: resolve(__dirname, "src/demos-projects/react/index.html"),
                todo: resolve(__dirname, "src/demos-projects/todo/index.html"),
                simple_fetch: resolve(__dirname, "src/demos-projects/simple_fetch/index.html"),
                local_fetch: resolve(__dirname, "src/demos-projects/local_fetch/index.html"),
                jeopardy_app: resolve(__dirname, "src/demos-projects/jeopardy_app/index.html"),
                resume: resolve(__dirname, "src/demos-projects/resume/index.html"),
                freecodecamp: resolve(__dirname, "src/demos-projects/freecodecamp/index.html"),
            },
        },
    },
})