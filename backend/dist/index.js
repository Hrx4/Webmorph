"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const prompts_1 = require("./prompts");
const node_1 = require("./DefaultPromts/node");
const react_1 = require("./DefaultPromts/react");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const genai_1 = require("@google/genai");
const ai = new genai_1.GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
app.get("/template", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prompt = "build a todolist frontend";
    const response = yield ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: {
            systemInstruction: "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra"
        }
    });
    console.log(response.text === "react\n");
    if (response.text === "react\n") {
        // console.log("hey")
        res.json({
            prompts: [prompts_1.BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${react_1.basePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [react_1.basePrompt]
        });
        return;
    }
    if (response.text === "node\n") {
        res.json({
            prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${react_1.basePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [node_1.basePrompt]
        });
        return;
    }
    res.status(403).json({ message: "You cant access this" });
    return;
}));
app.get("/chat", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    // const messages = req.body.messages;
    const response = yield ai.models.generateContentStream({
        model: "gemini-2.0-flash",
        contents: [
            "\u003CboltArtifact id=\"project-import\" title=\"Project Files\"\u003E\u003CboltAction type=\"file\" filePath=\"eslint.config.js\"\u003Eimport js from '@eslint/js';\nimport globals from 'globals';\nimport reactHooks from 'eslint-plugin-react-hooks';\nimport reactRefresh from 'eslint-plugin-react-refresh';\nimport tseslint from 'typescript-eslint';\n\nexport default tseslint.config(\n  { ignores: ['dist'] },\n  {\n    extends: [js.configs.recommended, ...tseslint.configs.recommended],\n    files: ['**/*.{ts,tsx}'],\n    languageOptions: {\n      ecmaVersion: 2020,\n      globals: globals.browser,\n    },\n    plugins: {\n      'react-hooks': reactHooks,\n      'react-refresh': reactRefresh,\n    },\n    rules: {\n      ...reactHooks.configs.recommended.rules,\n      'react-refresh/only-export-components': [\n        'warn',\n        { allowConstantExport: true },\n      ],\n    },\n  }\n);\n\u003C/boltAction\u003E\u003CboltAction type=\"file\" filePath=\"index.html\"\u003E\u003C!doctype html\u003E\n\u003Chtml lang=\"en\"\u003E\n  \u003Chead\u003E\n    \u003Cmeta charset=\"UTF-8\" /\u003E\n    \u003Clink rel=\"icon\" type=\"image/svg+xml\" href=\"/vite.svg\" /\u003E\n    \u003Cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" /\u003E\n    \u003Ctitle\u003EVite + React + TS\u003C/title\u003E\n  \u003C/head\u003E\n  \u003Cbody\u003E\n    \u003Cdiv id=\"root\"\u003E\u003C/div\u003E\n    \u003Cscript type=\"module\" src=\"/src/main.tsx\"\u003E\u003C/script\u003E\n  \u003C/body\u003E\n\u003C/html\u003E\n\u003C/boltAction\u003E\u003CboltAction type=\"file\" filePath=\"package.json\"\u003E{\n  \"name\": \"vite-react-typescript-starter\",\n  \"private\": true,\n  \"version\": \"0.0.0\",\n  \"type\": \"module\",\n  \"scripts\": {\n    \"dev\": \"vite\",\n    \"build\": \"vite build\",\n    \"lint\": \"eslint .\",\n    \"preview\": \"vite preview\"\n  },\n  \"dependencies\": {\n    \"lucide-react\": \"^0.344.0\",\n    \"react\": \"^18.3.1\",\n    \"react-dom\": \"^18.3.1\"\n  },\n  \"devDependencies\": {\n    \"@eslint/js\": \"^9.9.1\",\n    \"@types/react\": \"^18.3.5\",\n    \"@types/react-dom\": \"^18.3.0\",\n    \"@vitejs/plugin-react\": \"^4.3.1\",\n    \"autoprefixer\": \"^10.4.18\",\n    \"eslint\": \"^9.9.1\",\n    \"eslint-plugin-react-hooks\": \"^5.1.0-rc.0\",\n    \"eslint-plugin-react-refresh\": \"^0.4.11\",\n    \"globals\": \"^15.9.0\",\n    \"postcss\": \"^8.4.35\",\n    \"tailwindcss\": \"^3.4.1\",\n    \"typescript\": \"^5.5.3\",\n    \"typescript-eslint\": \"^8.3.0\",\n    \"vite\": \"^5.4.2\"\n  }\n}\n\u003C/boltAction\u003E\u003CboltAction type=\"file\" filePath=\"postcss.config.js\"\u003Eexport default {\n  plugins: {\n    tailwindcss: {},\n    autoprefixer: {},\n  },\n};\n\u003C/boltAction\u003E\u003CboltAction type=\"file\" filePath=\"tailwind.config.js\"\u003E/** @type {import('tailwindcss').Config} */\nexport default {\n  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n};\n\u003C/boltAction\u003E\u003CboltAction type=\"file\" filePath=\"tsconfig.app.json\"\u003E{\n  \"compilerOptions\": {\n    \"target\": \"ES2020\",\n    \"useDefineForClassFields\": true,\n    \"lib\": [\"ES2020\", \"DOM\", \"DOM.Iterable\"],\n    \"module\": \"ESNext\",\n    \"skipLibCheck\": true,\n\n    /* Bundler mode */\n    \"moduleResolution\": \"bundler\",\n    \"allowImportingTsExtensions\": true,\n    \"isolatedModules\": true,\n    \"moduleDetection\": \"force\",\n    \"noEmit\": true,\n    \"jsx\": \"react-jsx\",\n\n    /* Linting */\n    \"strict\": true,\n    \"noUnusedLocals\": true,\n    \"noUnusedParameters\": true,\n    \"noFallthroughCasesInSwitch\": true\n  },\n  \"include\": [\"src\"]\n}\n\u003C/boltAction\u003E\u003CboltAction type=\"file\" filePath=\"tsconfig.json\"\u003E{\n  \"files\": [],\n  \"references\": [\n    { \"path\": \"./tsconfig.app.json\" },\n    { \"path\": \"./tsconfig.node.json\" }\n  ]\n}\n\u003C/boltAction\u003E\u003CboltAction type=\"file\" filePath=\"tsconfig.node.json\"\u003E{\n  \"compilerOptions\": {\n    \"target\": \"ES2022\",\n    \"lib\": [\"ES2023\"],\n    \"module\": \"ESNext\",\n    \"skipLibCheck\": true,\n\n    /* Bundler mode */\n    \"moduleResolution\": \"bundler\",\n    \"allowImportingTsExtensions\": true,\n    \"isolatedModules\": true,\n    \"moduleDetection\": \"force\",\n    \"noEmit\": true,\n\n    /* Linting */\n    \"strict\": true,\n    \"noUnusedLocals\": true,\n    \"noUnusedParameters\": true,\n    \"noFallthroughCasesInSwitch\": true\n  },\n  \"include\": [\"vite.config.ts\"]\n}\n\u003C/boltAction\u003E\u003CboltAction type=\"file\" filePath=\"vite.config.ts\"\u003Eimport { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\n\n// https://vitejs.dev/config/\nexport default defineConfig({\n  plugins: [react()],\n  optimizeDeps: {\n    exclude: ['lucide-react'],\n  },\n});\n\u003C/boltAction\u003E\u003CboltAction type=\"file\" filePath=\"src/App.tsx\"\u003Eimport React from 'react';\n\nfunction App() {\n  return (\n    \u003Cdiv className=\"min-h-screen bg-gray-100 flex items-center justify-center\"\u003E\n      \u003Cp\u003EStart prompting (or editing) to see magic happen :)\u003C/p\u003E\n    \u003C/div\u003E\n  );\n}\n\nexport default App;\n\u003C/boltAction\u003E\u003CboltAction type=\"file\" filePath=\"src/index.css\"\u003E@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\u003C/boltAction\u003E\u003CboltAction type=\"file\" filePath=\"src/main.tsx\"\u003Eimport { StrictMode } from 'react';\nimport { createRoot } from 'react-dom/client';\nimport App from './App.tsx';\nimport './index.css';\n\ncreateRoot(document.getElementById('root')!).render(\n  \u003CStrictMode\u003E\n    \u003CApp /\u003E\n  \u003C/StrictMode\u003E\n);\n\u003C/boltAction\u003E\u003CboltAction type=\"file\" filePath=\"src/vite-env.d.ts\"\u003E/// \u003Creference types=\"vite/client\" /\u003E\n\u003C/boltAction\u003E\u003C/boltArtifact\u003E",
            "For all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.\n\nBy default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.\n\nUse icons from lucide-react for logos.\n\nUse stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.\n\n",
            "Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n\u003CboltArtifact id=\"project-import\" title=\"Project Files\"\u003E\u003CboltAction type=\"file\" filePath=\"eslint.config.js\"\u003Eimport js from '@eslint/js';\nimport globals from 'globals';\nimport reactHooks from 'eslint-plugin-react-hooks';\nimport reactRefresh from 'eslint-plugin-react-refresh';\nimport tseslint from 'typescript-eslint';\n\nexport default tseslint.config(\n  { ignores: ['dist'] },\n  {\n    extends: [js.configs.recommended, ...tseslint.configs.recommended],\n    files: ['**/*.{ts,tsx}'],\n    languageOptions: {\n      ecmaVersion: 2020,\n      globals: globals.browser,\n    },\n    plugins: {\n      'react-hooks': reactHooks,\n      'react-refresh': reactRefresh,\n    },\n    rules: {\n      ...reactHooks.configs.recommended.rules,\n      'react-refresh/only-export-components': [\n        'warn',\n        { allowConstantExport: true },\n      ],\n    },\n  }\n);\n\u003C/boltAction\u003E\u003CboltAction type=\"file\" filePath=\"index.html\"\u003E\u003C!doctype html\u003E\n\u003Chtml lang=\"en\"\u003E\n  \u003Chead\u003E\n    \u003Cmeta charset=\"UTF-8\" /\u003E\n    \u003Clink rel=\"icon\" type=\"image/svg+xml\" href=\"/vite.svg\" /\u003E\n    \u003Cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" /\u003E\n    \u003Ctitle\u003EVite + React + TS\u003C/title\u003E\n  \u003C/head\u003E\n  \u003Cbody\u003E\n    \u003Cdiv id=\"root\"\u003E\u003C/div\u003E\n    \u003Cscript type=\"module\" src=\"/src/main.tsx\"\u003E\u003C/script\u003E\n  \u003C/body\u003E\n\u003C/html\u003E\n\u003C/boltAction\u003E\u003CboltAction type=\"file\" filePath=\"package.json\"\u003E{\n  \"name\": \"vite-react-typescript-starter\",\n  \"private\": true,\n  \"version\": \"0.0.0\",\n  \"type\": \"module\",\n  \"scripts\": {\n    \"dev\": \"vite\",\n    \"build\": \"vite build\",\n    \"lint\": \"eslint .\",\n    \"preview\": \"vite preview\"\n  },\n  \"dependencies\": {\n    \"lucide-react\": \"^0.344.0\",\n    \"react\": \"^18.3.1\",\n    \"react-dom\": \"^18.3.1\"\n  },\n  \"devDependencies\": {\n    \"@eslint/js\": \"^9.9.1\",\n    \"@types/react\": \"^18.3.5\",\n    \"@types/react-dom\": \"^18.3.0\",\n    \"@vitejs/plugin-react\": \"^4.3.1\",\n    \"autoprefixer\": \"^10.4.18\",\n    \"eslint\": \"^9.9.1\",\n    \"eslint-plugin-react-hooks\": \"^5.1.0-rc.0\",\n    \"eslint-plugin-react-refresh\": \"^0.4.11\",\n    \"globals\": \"^15.9.0\",\n    \"postcss\": \"^8.4.35\",\n    \"tailwindcss\": \"^3.4.1\",\n    \"typescript\": \"^5.5.3\",\n    \"typescript-eslint\": \"^8.3.0\",\n    \"vite\": \"^5.4.2\"\n  }\n}\n\u003C/boltAction\u003E\u003CboltAction type=\"file\" filePath=\"postcss.config.js\"\u003Eexport default {\n  plugins: {\n    tailwindcss: {},\n    autoprefixer: {},\n  },\n};\n\u003C/boltAction\u003E\u003CboltAction type=\"file\" filePath=\"tailwind.config.js\"\u003E/** @type {import('tailwindcss').Config} */\nexport default {\n  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n};\n\u003C/boltAction\u003E\u003CboltAction type=\"file\" filePath=\"tsconfig.app.json\"\u003E{\n  \"compilerOptions\": {\n    \"target\": \"ES2020\",\n    \"useDefineForClassFields\": true,\n    \"lib\": [\"ES2020\", \"DOM\", \"DOM.Iterable\"],\n    \"module\": \"ESNext\",\n    \"skipLibCheck\": true,\n\n    /* Bundler mode */\n    \"moduleResolution\": \"bundler\",\n    \"allowImportingTsExtensions\": true,\n    \"isolatedModules\": true,\n    \"moduleDetection\": \"force\",\n    \"noEmit\": true,\n    \"jsx\": \"react-jsx\",\n\n    /* Linting */\n    \"strict\": true,\n    \"noUnusedLocals\": true,\n    \"noUnusedParameters\": true,\n    \"noFallthroughCasesInSwitch\": true\n  },\n  \"include\": [\"src\"]\n}\n\u003C/boltAction\u003E\u003CboltAction type=\"file\" filePath=\"tsconfig.json\"\u003E{\n  \"files\": [],\n  \"references\": [\n    { \"path\": \"./tsconfig.app.json\" },\n    { \"path\": \"./tsconfig.node.json\" }\n  ]\n}\n\u003C/boltAction\u003E\u003CboltAction type=\"file\" filePath=\"tsconfig.node.json\"\u003E{\n  \"compilerOptions\": {\n    \"target\": \"ES2022\",\n    \"lib\": [\"ES2023\"],\n    \"module\": \"ESNext\",\n    \"skipLibCheck\": true,\n\n    /* Bundler mode */\n    \"moduleResolution\": \"bundler\",\n    \"allowImportingTsExtensions\": true,\n    \"isolatedModules\": true,\n    \"moduleDetection\": \"force\",\n    \"noEmit\": true,\n\n    /* Linting */\n    \"strict\": true,\n    \"noUnusedLocals\": true,\n    \"noUnusedParameters\": true,\n    \"noFallthroughCasesInSwitch\": true\n  },\n  \"include\": [\"vite.config.ts\"]\n}\n\u003C/boltAction\u003E\u003CboltAction type=\"file\" filePath=\"vite.config.ts\"\u003Eimport { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\n\n// https://vitejs.dev/config/\nexport default defineConfig({\n  plugins: [react()],\n  optimizeDeps: {\n    exclude: ['lucide-react'],\n  },\n});\n\u003C/boltAction\u003E\u003CboltAction type=\"file\" filePath=\"src/App.tsx\"\u003Eimport React from 'react';\n\nfunction App() {\n  return (\n    \u003Cdiv className=\"min-h-screen bg-gray-100 flex items-center justify-center\"\u003E\n      \u003Cp\u003EStart prompting (or editing) to see magic happen :)\u003C/p\u003E\n    \u003C/div\u003E\n  );\n}\n\nexport default App;\n\u003C/boltAction\u003E\u003CboltAction type=\"file\" filePath=\"src/index.css\"\u003E@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\u003C/boltAction\u003E\u003CboltAction type=\"file\" filePath=\"src/main.tsx\"\u003Eimport { StrictMode } from 'react';\nimport { createRoot } from 'react-dom/client';\nimport App from './App.tsx';\nimport './index.css';\n\ncreateRoot(document.getElementById('root')!).render(\n  \u003CStrictMode\u003E\n    \u003CApp /\u003E\n  \u003C/StrictMode\u003E\n);\n\u003C/boltAction\u003E\u003CboltAction type=\"file\" filePath=\"src/vite-env.d.ts\"\u003E/// \u003Creference types=\"vite/client\" /\u003E\n\u003C/boltAction\u003E\u003C/boltArtifact\u003E\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n",
            "build a todolist frontend"
        ],
        config: {
            systemInstruction: (0, prompts_1.getSystemPrompt)()
        }
    });
    try {
        for (var _d = true, response_1 = __asyncValues(response), response_1_1; response_1_1 = yield response_1.next(), _a = response_1_1.done, !_a; _d = true) {
            _c = response_1_1.value;
            _d = false;
            const chunk = _c;
            console.log(chunk.text);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = response_1.return)) yield _b.call(response_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    res.json({
        response: response
    });
}));
app.get("/", (req, res) => {
    res.json("hi there");
});
app.listen(8080);
