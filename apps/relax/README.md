以下為 blair-nx 專案的檔案設定

```
// tsconfig.base.json
{
  "compileOnSave": false,
  "compilerOptions": {
    "rootDir": ".",
    "declaration": true,
    "moduleResolution": "node",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "importHelpers": true,
    "target": "es2015",
    "module": "esnext",
    "lib": ["es2020", "dom"],
    "skipLibCheck": true,
    "skipDefaultLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "@blair-nx-composables": ["libs/blairComposables/src/index.ts"],
      "@blair-nx-config/*": ["libs/blairConfig/*"],
      "@blair-nx-ui": ["libs/blairUI/src/index.ts"],
      "@cts-shared": ["libs/cts-shared/index.ts"],
      "@ctsf-src/*": ["apps/cts-front-end/src/*"],
      "@demo-src/*": ["apps/boilerplate/src/*"],
      "@storybook-src/*": ["libs/storybookHost/src/*"]
    },
    "esModuleInterop": true,
    "strict": true
  },
  "references": [
    {
      "path": "libs/cts-shared"
    }
  ],
  "exclude": ["node_modules", "tmp"]
}
```

```
// nx.json
{
  "$schema": "./node_modules/nx/schemas/nx-schema.json",
  "namedInputs": {
    "default": ["{projectRoot}/**/*", "sharedGlobals"],
    "production": [
      "default",
      "!{projectRoot}/eslint.config.mjs",
      "!{projectRoot}/**/?(*.)+(spec|test).[jt]s?(x)?(.snap)",
      "!{projectRoot}/tsconfig.spec.json",
      "!{projectRoot}/cypress/**/*",
      "!{projectRoot}/**/*.cy.[jt]s?(x)",
      "!{projectRoot}/cypress.config.[jt]s",
      "!{projectRoot}/**/*.stories.@(js|jsx|ts|tsx|mdx)",
      "!{projectRoot}/.storybook/**/*",
      "!{projectRoot}/tsconfig.storybook.json",
      "!{projectRoot}/.eslintrc.json",
      "!{projectRoot}/eslint.config.js",
      "!{projectRoot}/jest.config.[jt]s",
      "!{projectRoot}/src/test-setup.[jt]s",
      "!{projectRoot}/test-setup.[jt]s"
    ],
    "sharedGlobals": []
  },
  "plugins": [
    {
      "plugin": "@nx/vite/plugin",
      "options": {
        "buildTargetName": "build",
        "testTargetName": "test",
        "serveTargetName": "serve",
        "previewTargetName": "preview",
        "serveStaticTargetName": "serve-static",
        "typecheckTargetName": "typecheck"
      }
    },
    {
      "plugin": "@nx/storybook/plugin",
      "options": {
        "serveStorybookTargetName": "storybook",
        "buildStorybookTargetName": "build-storybook",
        "testStorybookTargetName": "test-storybook",
        "staticStorybookTargetName": "static-storybook"
      }
    },
    {
      "plugin": "@nx/cypress/plugin",
      "options": {
        "targetName": "cy:headless",
        "openTargetName": "cy:op",
        "componentTestingTargetName": "component-test",
        "ciTargetName": "e2e-ci"
      }
    },
    {
      "plugin": "@nx/playwright/plugin",
      "options": {
        "targetName": "pw",
        "openTargetName": "pw:op",
        "componentTestingTargetName": "component-test",
        "ciTargetName": "pw-ci"
      }
    },
    {
      "plugin": "@nx/eslint/plugin",
      "options": {
        "targetName": "lint"
      }
    },
    {
      "plugin": "@nx/webpack/plugin",
      "options": {
        "buildTargetName": "build",
        "serveTargetName": "serve",
        "previewTargetName": "preview"
      }
    },
    {
      "plugin": "@nx/jest/plugin",
      "options": {
        "targetName": "test"
      },
      "exclude": ["apps/cts-back-end-e2e/**/*"]
    }
  ],
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"]
    },
    "test": {
      "inputs": ["default", "^production"]
    },
    "@nx/esbuild:esbuild": {
      "cache": true,
      "dependsOn": ["^build"],
      "inputs": ["production", "^production"]
    },
    "pw-ci--**/*": {
      "dependsOn": ["^build"]
    }
  },
  "generators": {
    "@nx/react": {
      "application": {
        "babel": true,
        "style": "tailwind",
        "linter": "eslint",
        "bundler": "vite"
      },
      "component": {
        "style": "tailwind"
      },
      "library": {
        "style": "tailwind",
        "linter": "eslint"
      }
    }
  }
}
````

```
// package.json
{
  "name": "@blair-nx/source",
  "version": "0.0.0",
  "private": true,
  "packageManager": "pnpm@8.15.3",
  "license": "MIT",
  "scripts": {
    "preinstall": "npx only-allow pnpm"
  },
  "dependencies": {
    "@aws-sdk/client-s3": "^3.674.0",
    "@floating-ui/vue": "1.0.6",
    "@iconify/vue": "^4.1.2",
    "@kangc/v-md-editor": "^2.3.18",
    "@nestjs/axios": "^3.1.2",
    "@nestjs/common": "^10.0.2",
    "@nestjs/config": "^3.2.3",
    "@nestjs/core": "^10.0.2",
    "@nestjs/jwt": "^10.2.0",
    "@nestjs/passport": "^10.0.3",
    "@nestjs/platform-express": "^10.4.4",
    "@nestjs/terminus": "^10.2.3",
    "@prisma/client": "5.20.0",
    "@raruto/leaflet-gesture-handling": "^1.4.4",
    "@tanstack/vue-query": "4.37.1",
    "@ts-rest/core": "3.49.3",
    "@ts-rest/nest": "3.49.3",
    "@ts-rest/vue-query": "3.49.3",
    "@types/bcrypt": "^5.0.2",
    "@types/crypto-js": "^4.2.2",
    "@types/express": "^5.0.0",
    "@types/leaflet": "^1.9.14",
    "@types/qs": "^6.9.16",
    "@vueuse/core": "^11.1.0",
    "@yeger/vue-masonry-wall": "^5.0.16",
    "axios": "^1.6.0",
    "bcrypt": "^5.1.1",
    "big.js": "^6.2.2",
    "classnames": "^2.5.1",
    "crypto-js": "^4.2.0",
    "dotenv": "^16.4.5",
    "express": "^4.21.1",
    "klona": "^2.0.6",
    "leaflet": "^1.9.4",
    "nanoid": "3.3.6",
    "nestjs-prisma": "^0.23.0",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.1",
    "pinia": "2.2.2",
    "prisma-extension-pagination": "^0.7.4",
    "qs": "^6.12.3",
    "radash": "^12.1.0",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.8.0",
    "ts-node": "^10.9.2",
    "tslib": "^2.3.0",
    "vue": "3.4.38",
    "vue-final-modal": "^4.5.3",
    "vue-router": "^4.0.5",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@antfu/eslint-config": "2.20.0",
    "@eslint-react/eslint-plugin": "^1.17.1",
    "@eslint/eslintrc": "^3.1.0",
    "@eslint/js": "^9.8.0",
    "@nestjs/schematics": "^10.0.1",
    "@nestjs/testing": "^10.0.2",
    "@nx/cypress": "19.8.0",
    "@nx/devkit": "19.8.0",
    "@nx/esbuild": "19.8.0",
    "@nx/eslint": "19.8.0",
    "@nx/eslint-plugin": "19.8.0",
    "@nx/jest": "19.8.0",
    "@nx/js": "19.8.0",
    "@nx/nest": "19.8.0",
    "@nx/node": "19.8.0",
    "@nx/playwright": "19.8.0",
    "@nx/react": "19.8.0",
    "@nx/storybook": "19.8.0",
    "@nx/vite": "19.8.0",
    "@nx/vue": "19.8.0",
    "@nx/web": "19.8.0",
    "@nx/webpack": "19.8.0",
    "@nx/workspace": "19.8.0",
    "@pinia/testing": "^0.1.5",
    "@playwright/test": "^1.36.0",
    "@rollup/plugin-commonjs": "^25.0.7",
    "@storybook/addon-essentials": "8.3.3",
    "@storybook/addon-interactions": "8.3.3",
    "@storybook/addon-viewport": "8.3.3",
    "@storybook/builder-vite": "8.3.3",
    "@storybook/core-server": "8.3.3",
    "@storybook/vue3": "8.3.3",
    "@storybook/vue3-vite": "8.3.3",
    "@swc-node/register": "~1.9.1",
    "@swc/cli": "~0.3.12",
    "@swc/core": "~1.5.7",
    "@swc/helpers": "~0.5.11",
    "@testing-library/react": "15.0.6",
    "@types/big.js": "^6.2.2",
    "@types/jest": "^29.5.12",
    "@types/node": "18.16.9",
    "@types/passport-jwt": "^4.0.1",
    "@types/react": "18.3.1",
    "@types/react-dom": "18.3.0",
    "@typescript-eslint/eslint-plugin": "^7.16.0",
    "@typescript-eslint/parser": "^7.16.0",
    "@vitejs/plugin-react": "^4.2.0",
    "@vitejs/plugin-vue": "^4.5.0",
    "@vitest/coverage-v8": "^1.0.4",
    "@vitest/ui": "^1.3.1",
    "@vue/eslint-config-prettier": "7.1.0",
    "@vue/eslint-config-typescript": "^13.0.0",
    "@vue/test-utils": "^2.4.1",
    "autoprefixer": "10.4.13",
    "copy-webpack-plugin": "^12.0.2",
    "cypress": "13.7.3",
    "esbuild": "^0.19.2",
    "eslint": "~8.57.1",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-cypress": "^3.5.0",
    "eslint-plugin-format": "^0.1.1",
    "eslint-plugin-import": "2.30.0",
    "eslint-plugin-jsx-a11y": "6.7.1",
    "eslint-plugin-playwright": "^1.6.2",
    "eslint-plugin-react": "7.35.0",
    "eslint-plugin-react-hooks": "4.6.0",
    "eslint-plugin-react-refresh": "^0.4.14",
    "eslint-plugin-tailwindcss": "^3.17.0",
    "eslint-plugin-vue": "^9.16.1",
    "jest": "^29.7.0",
    "jest-environment-node": "^29.7.0",
    "jsdom": "~22.1.0",
    "nx": "19.8.0",
    "postcss": "8.4.38",
    "postcss-import": "16.1.0",
    "postcss-nesting": "13.0.0",
    "prettier": "^2.6.2",
    "prisma": "5.20.0",
    "storybook": "8.3.3",
    "tailwindcss": "3.4.3",
    "ts-jest": "^29.1.0",
    "typescript": "~5.5.2",
    "typescript-eslint": "^8.0.0",
    "vite": "^5.0.0",
    "vite-plugin-dts": "~3.8.1",
    "vite-plugin-require-transform": "^1.0.21",
    "vite-plugin-vue-devtools": "^7.6.2",
    "vitest": "^1.3.1",
    "vue-tsc": "^2.0.0",
    "webpack-cli": "^5.1.4"
  }
}
```

```
// apps/relax/project.json
{
	"name": "relax",
	"$schema": "../../node_modules/nx/schemas/project-schema.json",
	"sourceRoot": "apps/relax/src",
	"projectType": "application",
	"tags": [],
	"// targets": "to see all targets run: nx show project relax --web",
	"targets": {}
}
```

```
// apps/relax/tsconfig.json
{
	"extends": "../../tsconfig.base.json",
	"compilerOptions": {
		"jsx": "react-jsx",
		"jsxImportSource": "react",
		"lib": ["ES2015", "DOM"],
		"baseUrl": "../../",
		"rootDir": "../../",
		"module": "ESNext",
		"moduleResolution": "bundler",
		"resolveJsonModule": true,
		"types": ["node", "vite/client", "vitest"],
		"allowJs": true,
		"strict": true,
		"declaration": true,
		"declarationMap": true,
		"allowSyntheticDefaultImports": true,
		"esModuleInterop": true,
		"verbatimModuleSyntax": true
	},
	"references": [
		{
			"path": "./tsconfig.app.json"
		},
		{
			"path": "./tsconfig.spec.json"
		}
	],
	"files": [],
	"include": []
}
```

```
// apps/relax/tsconfig.app.json
{
	"extends": "./tsconfig.json",
	"compilerOptions": {
		"composite": true,
		"rootDir": "src",
		"types": [
			"node",
			"@nx/react/typings/cssmodule.d.ts",
			"@nx/react/typings/image.d.ts",
			"vite/client"
		],
		"declaration": true,
		"outDir": "../../dist/out-tsc",
		"isolatedModules": true
	},
	"include": ["src/**/*.js", "src/**/*.jsx", "src/**/*.ts", "src/**/*.tsx"],
	"exclude": [
		"src/**/*.spec.ts",
		"src/**/*.test.ts",
		"src/**/*.spec.tsx",
		"src/**/*.test.tsx",
		"src/**/*.spec.js",
		"src/**/*.test.js",
		"src/**/*.spec.jsx",
		"src/**/*.test.jsx"
	]
}
```

```
// apps/relax/tsconfig.spec.json
{
	"extends": "./tsconfig.json",
	"compilerOptions": {
		"composite": true,
		"baseUrl": "../../",
		"types": [
			"vitest/globals",
			"vitest/importMeta",
			"vite/client",
			"node",
			"vitest",
			"@nx/react/typings/cssmodule.d.ts",
			"@nx/react/typings/image.d.ts"
		],
		"outDir": "../../dist/out-tsc"
	},
	"include": [
		"vite.config.ts",
		"vitest.config.ts",
		"src/**/*.test.ts",
		"src/**/*.spec.ts",
		"src/**/*.test.tsx",
		"src/**/*.spec.tsx",
		"src/**/*.test.js",
		"src/**/*.spec.js",
		"src/**/*.test.jsx",
		"src/**/*.spec.jsx",
		"src/**/*.d.ts",
		"src/**/*.tsx",
		"src/**/*.ts"
	]
}
```

```
// apps/relax/eslint.config.mjs
import antfu from '@antfu/eslint-config';

export default antfu(
	{
		typescript: true,
		react: true,
		stylistic: {
			indent: 'tab',
			quotes: 'single',
			semi: true,
		},
		formatters: {
			css: true,
			html: true,
			markdown: 'prettier',
			react: true,
			json: true,
		},
		ignores: [
			'**/fixtures',
			'!**/*',
			'**/node_modules/**',
			'**/cypress/downloads/**',
			'**/cypress/support/**',
			'**/.eslintrc-auto-import.json',
			'**/README.md',
			'**/components.d.ts',
			'**/prisma',
			'**/.DS_Store',
			'**/*.bru',
			'**/.env.*',
			'**/.env',
			'**/.dockerignore',
			'**/.github/*',
			'**/deployment/*',
			'**/test-results/*',
			'**/playwright-report/*',
			'**/playwright/.cache/*',
			'**/e2e/*.png',
			'**/e2e/*.pdf',
		],
	},
	{
		rules: {
			'antfu/top-level-function': 'off',
			'prefer-arrow-callback': 'off',
		},
	},
	{
		files: [
			'**/cypress.config.ts',
			'**/apis/*.ts',
			'**/eslint.config.mjs',
			'**/encrypt.util.ts',
			'**/playwright.config.ts',
		],
		rules: {
			'node/prefer-global/process': ['error', 'always'],
		},
	},
);
```

```
// apps/relax/vite.config.ts
/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/relax',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [react(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    outDir: '../../dist/apps/relax',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },

  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/apps/relax',
      provider: 'v8',
    },
  },
});
```

```
// apps/relax/src/main.tsx
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

```
// apps/relax/src/app/app.tsx
import type { TodoItem } from '../types/list';
import NxWelcome from './nx-welcome';
import '../assets/style.css';
import { TodoList } from './TodoList';

export function App() {
	const todos: TodoItem[] = [
		{ id: 1, text: '學習 React 基礎', completed: true },
		{ id: 2, text: '理解 JSX 語法', completed: false },
		{ id: 3, text: '練習使用 Props', completed: false },
	];

	return (
		<div>
			<div className="app">
				{/* 使用 TodoList 組件並傳入 props */}
				<TodoList items={todos} />

				{/* 使用自定義標題 */}
				<TodoList
					title="學習清單"
					items={todos.filter(todo => !todo.completed)}
				/>
			</div>

			<NxWelcome title="relax" />
		</div>
	);
}

export default App;
```

```
// apps/relax/src/app/nx-welcome.tsx
/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 This is a starter component and can be deleted.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 Delete this file and get started with your project!
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
// alert('wdwdw');

// console.log('wdwd');

export function NxWelcome({ title }: { title: string }) {
	return (
		<div className="wrapper">
			<div className="container">
				<div id="welcome">
					<h1>
						<span> Hello there, </span>
						Welcome
						{' '}
						{title}
						{' '}
						👋
					</h1>
				</div>

				<div id="hero" className="rounded">
					<div className="text-container">
						<h2>
							<svg
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
								/>
							</svg>
							<span>You&apos;re up and running</span>
						</h2>
						<a href="#commands"> What&apos;s next? </a>
					</div>
					<div className="logo-container">
						<svg
							fill="currentColor"
							role="img"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M11.987 14.138l-3.132 4.923-5.193-8.427-.012 8.822H0V4.544h3.691l5.247 8.833.005-3.998 3.044 4.759zm.601-5.761c.024-.048 0-3.784.008-3.833h-3.65c.002.059-.005 3.776-.003 3.833h3.645zm5.634 4.134a2.061 2.061 0 0 0-1.969 1.336 1.963 1.963 0 0 1 2.343-.739c.396.161.917.422 1.33.283a2.1 2.1 0 0 0-1.704-.88zm3.39 1.061c-.375-.13-.8-.277-1.109-.681-.06-.08-.116-.17-.176-.265a2.143 2.143 0 0 0-.533-.642c-.294-.216-.68-.322-1.18-.322a2.482 2.482 0 0 0-2.294 1.536 2.325 2.325 0 0 1 4.002.388.75.75 0 0 0 .836.334c.493-.105.46.36 1.203.518v-.133c-.003-.446-.246-.55-.75-.733zm2.024 1.266a.723.723 0 0 0 .347-.638c-.01-2.957-2.41-5.487-5.37-5.487a5.364 5.364 0 0 0-4.487 2.418c-.01-.026-1.522-2.39-1.538-2.418H8.943l3.463 5.423-3.379 5.32h3.54l1.54-2.366 1.568 2.366h3.541l-3.21-5.052a.7.7 0 0 1-.084-.32 2.69 2.69 0 0 1 2.69-2.691h.001c1.488 0 1.736.89 2.057 1.308.634.826 1.9.464 1.9 1.541a.707.707 0 0 0 1.066.596zm.35.133c-.173.372-.56.338-.755.639-.176.271.114.412.114.412s.337.156.538-.311c.104-.231.14-.488.103-.74z" />
						</svg>
					</div>
				</div>

				<div id="middle-content">
					<div id="middle-content-container">
						<div id="learning-materials" className="rounded shadow">
							<h2>Learning materials</h2>
							<a
								href="https://nx.dev/getting-started/intro?utm_source=nx-project"
								target="_blank"
								rel="noreferrer"
								className="list-item-link"
							>
								<svg
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
									/>
								</svg>
								<span>
									Documentation
									<span> Everything is in there </span>
								</span>
								<svg
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</a>
							<a
								href="https://nx.dev/blog/?utm_source=nx-project"
								target="_blank"
								rel="noreferrer"
								className="list-item-link"
							>
								<svg
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
									/>
								</svg>
								<span>
									Blog
									<span> Changelog, features & events </span>
								</span>
								<svg
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</a>
							<a
								href="https://www.youtube.com/@NxDevtools/videos?utm_source=nx-project&sub_confirmation=1"
								target="_blank"
								rel="noreferrer"
								className="list-item-link"
							>
								<svg
									role="img"
									viewBox="0 0 24 24"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
								>
									<title>YouTube</title>
									<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
								</svg>
								<span>
									YouTube channel
									<span> Nx Show, talks & tutorials </span>
								</span>
								<svg
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</a>
							<a
								href="https://nx.dev/react-tutorial/1-code-generation?utm_source=nx-project"
								target="_blank"
								rel="noreferrer"
								className="list-item-link"
							>
								<svg
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
									/>
								</svg>
								<span>
									Interactive tutorials
									<span> Create an app, step-by-step </span>
								</span>
								<svg
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</a>
						</div>
						<a
							id="nx-repo"
							className="button-pill rounded shadow"
							href="https://github.com/nrwl/nx?utm_source=nx-project"
							target="_blank"
							rel="noreferrer"
						>
							<svg
								fill="currentColor"
								role="img"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
							</svg>
							<span>
								Nx is open source
								<span> Love Nx? Give us a star! </span>
							</span>
						</a>
					</div>
					<div id="other-links">
						<a
							id="nx-console"
							className="button-pill rounded shadow"
							href="https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console&utm_source=nx-project"
							target="_blank"
							rel="noreferrer"
						>
							<svg
								fill="currentColor"
								role="img"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title>Visual Studio Code</title>
								<path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
							</svg>
							<span>
								Install Nx Console for VSCode
								<span>The official VSCode extension for Nx.</span>
							</span>
						</a>
						<a
							id="nx-console-jetbrains"
							className="button-pill rounded shadow"
							href="https://plugins.jetbrains.com/plugin/21060-nx-console"
							target="_blank"
							rel="noreferrer"
						>
							<svg
								height="48"
								width="48"
								viewBox="20 20 60 60"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="m22.5 22.5h60v60h-60z" />
								<g fill="#fff">
									<path d="m29.03 71.25h22.5v3.75h-22.5z" />
									<path d="m28.09 38 1.67-1.58a1.88 1.88 0 0 0 1.47.87c.64 0 1.06-.44 1.06-1.31v-5.98h2.58v6a3.48 3.48 0 0 1 -.87 2.6 3.56 3.56 0 0 1 -2.57.95 3.84 3.84 0 0 1 -3.34-1.55z" />
									<path d="m36 30h7.53v2.19h-5v1.44h4.49v2h-4.42v1.49h5v2.21h-7.6z" />
									<path d="m47.23 32.29h-2.8v-2.29h8.21v2.27h-2.81v7.1h-2.6z" />
									<path d="m29.13 43.08h4.42a3.53 3.53 0 0 1 2.55.83 2.09 2.09 0 0 1 .6 1.53 2.16 2.16 0 0 1 -1.44 2.09 2.27 2.27 0 0 1 1.86 2.29c0 1.61-1.31 2.59-3.55 2.59h-4.44zm5 2.89c0-.52-.42-.8-1.18-.8h-1.29v1.64h1.24c.79 0 1.25-.26 1.25-.81zm-.9 2.66h-1.57v1.73h1.62c.8 0 1.24-.31 1.24-.86 0-.5-.4-.87-1.27-.87z" />
									<path d="m38 43.08h4.1a4.19 4.19 0 0 1 3 1 2.93 2.93 0 0 1 .9 2.19 3 3 0 0 1 -1.93 2.89l2.24 3.27h-3l-1.88-2.84h-.87v2.84h-2.56zm4 4.5c.87 0 1.39-.43 1.39-1.11 0-.75-.54-1.12-1.4-1.12h-1.44v2.26z" />
									<path d="m49.59 43h2.5l4 9.44h-2.79l-.67-1.69h-3.63l-.67 1.69h-2.71zm2.27 5.73-1-2.65-1.06 2.65z" />
									<path d="m56.46 43.05h2.6v9.37h-2.6z" />
									<path d="m60.06 43.05h2.42l3.37 5v-5h2.57v9.37h-2.26l-3.53-5.14v5.14h-2.57z" />
									<path d="m68.86 51 1.45-1.73a4.84 4.84 0 0 0 3 1.13c.71 0 1.08-.24 1.08-.65 0-.4-.31-.6-1.59-.91-2-.46-3.53-1-3.53-2.93 0-1.74 1.37-3 3.62-3a5.89 5.89 0 0 1 3.86 1.25l-1.26 1.84a4.63 4.63 0 0 0 -2.62-.92c-.63 0-.94.25-.94.6 0 .42.32.61 1.63.91 2.14.46 3.44 1.16 3.44 2.91 0 1.91-1.51 3-3.79 3a6.58 6.58 0 0 1 -4.35-1.5z" />
								</g>
							</svg>
							<span>
								Install Nx Console for JetBrains
								<span>
									Available for WebStorm, Intellij IDEA Ultimate and more!
								</span>
							</span>
						</a>
						<div id="nx-cloud" className="rounded shadow">
							<div>
								<svg
									id="nx-cloud-logo"
									role="img"
									xmlns="http://www.w3.org/2000/svg"
									stroke="currentColor"
									fill="transparent"
									viewBox="0 0 24 24"
								>
									<path
										strokeWidth="2"
										d="M23 3.75V6.5c-3.036 0-5.5 2.464-5.5 5.5s-2.464 5.5-5.5 5.5-5.5 2.464-5.5 5.5H3.75C2.232 23 1 21.768 1 20.25V3.75C1 2.232 2.232 1 3.75 1h16.5C21.768 1 23 2.232 23 3.75Z"
									/>
									<path
										strokeWidth="2"
										d="M23 6v14.1667C23 21.7307 21.7307 23 20.1667 23H6c0-3.128 2.53867-5.6667 5.6667-5.6667 3.128 0 5.6666-2.5386 5.6666-5.6666C17.3333 8.53867 19.872 6 23 6Z"
									/>
								</svg>
								<h2>
									Nx Cloud
									<span>Enable faster CI & better DX</span>
								</h2>
							</div>
							<p>
								You can activate distributed tasks executions and caching by
								running:
							</p>
							<pre>nx connect</pre>
							<a
								href="https://nx.dev/nx-cloud?utm_source=nx-project"
								target="_blank"
								rel="noreferrer"
							>
								{' '}
								What is Nx Cloud?
								{' '}
							</a>
						</div>
					</div>
				</div>

				<div id="commands" className="rounded shadow">
					<h2>Next steps</h2>
					<p>Here are some things you can do with Nx:</p>
					<details>
						<summary>
							<svg
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
								/>
							</svg>
							Build, test and lint your app
						</summary>
						<pre>
							<span># Build</span>
							nx build
							{' '}
							{title}
							<span># Test</span>
							nx test
							{' '}
							{title}
							<span># Lint</span>
							nx lint
							{' '}
							{title}
							<span># Run them together!</span>
							nx run-many -p
							{' '}
							{title}
							{' '}
							-t build test lint
						</pre>
					</details>

					<details>
						<summary>
							<svg
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
								/>
							</svg>
							View project details
						</summary>
						<pre>
							nx show project
							{title}
						</pre>
					</details>
					<details>
						<summary>
							<svg
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
								/>
							</svg>
							View interactive project graph
						</summary>
						<pre>nx graph</pre>
					</details>
					<details>
						<summary>
							<svg
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
								/>
							</svg>
							Add UI library
						</summary>
						<pre>
							<span># Generate UI lib</span>
							nx g @nx/react:lib ui
							<span># Add a component</span>
							nx g @nx/react:component ui/src/lib/button
						</pre>
					</details>
				</div>

				<p id="love">
					Carefully crafted with
					<svg
						fill="currentColor"
						stroke="none"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
						/>
					</svg>
				</p>
			</div>
		</div>
	);
}

export default NxWelcome;
```

```
// apps/relax/src/app/TodoList.tsx
import cn from 'classnames';
import type { TodoListProps } from '../types/list';

// TodoList 組件 - 使用函數組件的方式宣告
export const TodoList = ({
	title = '待辦事項清單', // 提供預設值
	items,
}: TodoListProps) => {
	const completedCount = items.filter(item => item.completed).length;

	return (
		<div className="todo-list">
			{/* 使用 JSX 的大括號語法來嵌入 JavaScript 表達式 */}
			<h1 className="text-lg font-bold">{title}</h1>

			{/* 條件渲染：當 items 為空時顯示提示訊息 */}
			{!items.length
				? (<p>目前沒有待辦事項</p>)
				: (
						<ul>
							{/* 使用 map 方法渲染列表，記得提供 key */}
							{items.map(item => (
								<li
									key={item.id}
									className={cn(
										'ml-4 text-xs relative flex items-center gap-x-2',
										'before:content-[""] before:relative before:w-1 before:h-1 before:bg-black before:p-0',
										item.completed ? 'text-[#196c24]' : 'text-[#777]',
									)}
								>
									{item.text}
								</li>
							))}
						</ul>
					)}

			{/* 使用 JSX 的註解方式 */}
			{/* 顯示待辦事項統計 */}
			<div className="todo-stats italic text-sm">
				{`總計: ${items.length} 項 / 已完成:`}
				<span className={cn(
					'mx-1',
					completedCount ? 'text-[#196c24]' : 'text-[#f00]',
				)}
				>
					{completedCount}
				</span>
				項
			</div>
		</div>
	);
};
```

```
// apps/relax/index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Relax</title>
    <base href="/" />

    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="stylesheet" href="/src/styles.css" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

```
// apps/relax/src/assets/style.css
html {
	-webkit-text-size-adjust: 100%;
	font-family:
		ui-sans-serif,
		system-ui,
		-apple-system,
		BlinkMacSystemFont,
		'Segoe UI',
		Roboto,
		'Helvetica Neue',
		Arial,
		'Noto Sans',
		sans-serif,
		'Apple Color Emoji',
		'Segoe UI Emoji',
		'Segoe UI Symbol',
		'Noto Color Emoji';
	line-height: 1.5;
	tab-size: 4;
	scroll-behavior: smooth;
}
body {
	font-family: inherit;
	line-height: inherit;
	margin: 0;
}
h1,
h2,
p,
pre {
	margin: 0;
}
*,
::before,
::after {
	box-sizing: border-box;
	border-width: 0;
	border-style: solid;
	border-color: currentColor;
}
h1,
h2 {
	font-size: inherit;
	font-weight: inherit;
}
a {
	color: inherit;
	text-decoration: inherit;
}
pre {
	font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
		'Liberation Mono', 'Courier New', monospace;
}
svg {
	display: block;
	vertical-align: middle;
	shape-rendering: auto;
	text-rendering: optimizeLegibility;
}
pre {
	background-color: rgba(55, 65, 81, 1);
	border-radius: 0.25rem;
	color: rgba(229, 231, 235, 1);
	font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
		'Liberation Mono', 'Courier New', monospace;
	overflow: auto;
	padding: 0.5rem 0.75rem;
}

.shadow {
	box-shadow:
		0 0 #0000,
		0 0 #0000,
		0 10px 15px -3px rgba(0, 0, 0, 0.1),
		0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
.rounded {
	border-radius: 1.5rem;
}
.wrapper {
	width: 100%;
}
.container {
	margin-left: auto;
	margin-right: auto;
	max-width: 768px;
	padding-bottom: 3rem;
	padding-left: 1rem;
	padding-right: 1rem;
	color: rgba(55, 65, 81, 1);
	width: 100%;
}
#welcome {
	margin-top: 2.5rem;
}
#welcome h1 {
	font-size: 3rem;
	font-weight: 500;
	letter-spacing: -0.025em;
	line-height: 1;
}
#welcome span {
	display: block;
	font-size: 1.875rem;
	font-weight: 300;
	line-height: 2.25rem;
	margin-bottom: 0.5rem;
}
#hero {
	align-items: center;
	background-color: hsla(214, 62%, 21%, 1);
	border: none;
	box-sizing: border-box;
	color: rgba(55, 65, 81, 1);
	display: grid;
	grid-template-columns: 1fr;
	margin-top: 3.5rem;
}
#hero .text-container {
	color: rgba(255, 255, 255, 1);
	padding: 3rem 2rem;
}
#hero .text-container h2 {
	font-size: 1.5rem;
	line-height: 2rem;
	position: relative;
}
#hero .text-container h2 svg {
	color: hsla(162, 47%, 50%, 1);
	height: 2rem;
	left: -0.25rem;
	position: absolute;
	top: 0;
	width: 2rem;
}
#hero .text-container h2 span {
	margin-left: 2.5rem;
}
#hero .text-container a {
	background-color: rgba(255, 255, 255, 1);
	border-radius: 0.75rem;
	color: rgba(55, 65, 81, 1);
	display: inline-block;
	margin-top: 1.5rem;
	padding: 1rem 2rem;
	text-decoration: inherit;
}
#hero .logo-container {
	display: none;
	justify-content: center;
	padding-left: 2rem;
	padding-right: 2rem;
}
#hero .logo-container svg {
	color: rgba(255, 255, 255, 1);
	width: 66.666667%;
}
#middle-content {
	align-items: flex-start;
	display: grid;
	grid-template-columns: 1fr;
	margin-top: 3.5rem;
}

#middle-content #middle-content-container {
	display: flex;
	flex-direction: column;
	gap: 2rem;
}
#learning-materials {
	padding: 2.5rem 2rem;
}
#learning-materials h2 {
	font-weight: 500;
	font-size: 1.25rem;
	letter-spacing: -0.025em;
	line-height: 1.75rem;
	padding-left: 1rem;
	padding-right: 1rem;
}
.list-item-link {
	align-items: center;
	border-radius: 0.75rem;
	display: flex;
	margin-top: 1rem;
	padding: 1rem;
	transition-property:
		background-color,
		border-color,
		color,
		fill,
		stroke,
		opacity,
		box-shadow,
		transform,
		filter,
		backdrop-filter,
		-webkit-backdrop-filter;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	transition-duration: 150ms;
	width: 100%;
}
.list-item-link svg:first-child {
	margin-right: 1rem;
	height: 1.5rem;
	transition-property:
		background-color,
		border-color,
		color,
		fill,
		stroke,
		opacity,
		box-shadow,
		transform,
		filter,
		backdrop-filter,
		-webkit-backdrop-filter;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	transition-duration: 150ms;
	width: 1.5rem;
}
.list-item-link > span {
	flex-grow: 1;
	font-weight: 400;
	transition-property:
		background-color,
		border-color,
		color,
		fill,
		stroke,
		opacity,
		box-shadow,
		transform,
		filter,
		backdrop-filter,
		-webkit-backdrop-filter;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
.list-item-link > span > span {
	color: rgba(107, 114, 128, 1);
	display: block;
	flex-grow: 1;
	font-size: 0.75rem;
	font-weight: 300;
	line-height: 1rem;
	transition-property:
		background-color,
		border-color,
		color,
		fill,
		stroke,
		opacity,
		box-shadow,
		transform,
		filter,
		backdrop-filter,
		-webkit-backdrop-filter;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
.list-item-link svg:last-child {
	height: 1rem;
	transition-property: all;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	transition-duration: 150ms;
	width: 1rem;
}
.list-item-link:hover {
	color: rgba(255, 255, 255, 1);
	background-color: hsla(162, 55%, 33%, 1);
}
.list-item-link:hover > span {
}
.list-item-link:hover > span > span {
	color: rgba(243, 244, 246, 1);
}
.list-item-link:hover svg:last-child {
	transform: translateX(0.25rem);
}
#other-links {
}
.button-pill {
	padding: 1.5rem 2rem;
	margin-bottom: 2rem;
	transition-duration: 300ms;
	transition-property:
		background-color,
		border-color,
		color,
		fill,
		stroke,
		opacity,
		box-shadow,
		transform,
		filter,
		backdrop-filter,
		-webkit-backdrop-filter;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	align-items: center;
	display: flex;
}
.button-pill svg {
	transition-property:
		background-color,
		border-color,
		color,
		fill,
		stroke,
		opacity,
		box-shadow,
		transform,
		filter,
		backdrop-filter,
		-webkit-backdrop-filter;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	transition-duration: 150ms;
	flex-shrink: 0;
	width: 3rem;
}
.button-pill > span {
	letter-spacing: -0.025em;
	font-weight: 400;
	font-size: 1.125rem;
	line-height: 1.75rem;
	padding-left: 1rem;
	padding-right: 1rem;
}
.button-pill span span {
	display: block;
	font-size: 0.875rem;
	font-weight: 300;
	line-height: 1.25rem;
}
.button-pill:hover svg,
.button-pill:hover {
	color: rgba(255, 255, 255, 1) !important;
}
#nx-console:hover {
	background-color: rgba(0, 122, 204, 1);
}
#nx-console svg {
	color: rgba(0, 122, 204, 1);
}
#nx-console-jetbrains {
	margin-top: 2rem;
}
#nx-console-jetbrains:hover {
	background-color: rgba(255, 49, 140, 1);
}
#nx-console-jetbrains svg {
	color: rgba(255, 49, 140, 1);
}
#nx-repo:hover {
	background-color: rgba(24, 23, 23, 1);
}
#nx-repo svg {
	color: rgba(24, 23, 23, 1);
}
#nx-cloud {
	margin-bottom: 2rem;
	margin-top: 2rem;
	padding: 2.5rem 2rem;
}
#nx-cloud > div {
	align-items: center;
	display: flex;
}
#nx-cloud > div svg {
	border-radius: 0.375rem;
	flex-shrink: 0;
	width: 3rem;
}
#nx-cloud > div h2 {
	font-size: 1.125rem;
	font-weight: 400;
	letter-spacing: -0.025em;
	line-height: 1.75rem;
	padding-left: 1rem;
	padding-right: 1rem;
}
#nx-cloud > div h2 span {
	display: block;
	font-size: 0.875rem;
	font-weight: 300;
	line-height: 1.25rem;
}
#nx-cloud p {
	font-size: 1rem;
	line-height: 1.5rem;
	margin-top: 1rem;
}
#nx-cloud pre {
	margin-top: 1rem;
}
#nx-cloud a {
	color: rgba(107, 114, 128, 1);
	display: block;
	font-size: 0.875rem;
	line-height: 1.25rem;
	margin-top: 1.5rem;
	text-align: right;
}
#nx-cloud a:hover {
	text-decoration: underline;
}
#commands {
	padding: 2.5rem 2rem;
	margin-top: 3.5rem;
}
#commands h2 {
	font-size: 1.25rem;
	font-weight: 400;
	letter-spacing: -0.025em;
	line-height: 1.75rem;
	padding-left: 1rem;
	padding-right: 1rem;
}
#commands p {
	font-size: 1rem;
	font-weight: 300;
	line-height: 1.5rem;
	margin-top: 1rem;
	padding-left: 1rem;
	padding-right: 1rem;
}
details {
	align-items: center;
	display: flex;
	margin-top: 1rem;
	padding-left: 1rem;
	padding-right: 1rem;
	width: 100%;
}
details pre > span {
	color: rgba(181, 181, 181, 1);
	display: block;
}
summary {
	border-radius: 0.5rem;
	display: flex;
	font-weight: 400;
	padding: 0.5rem;
	cursor: pointer;
	transition-property:
		background-color,
		border-color,
		color,
		fill,
		stroke,
		opacity,
		box-shadow,
		transform,
		filter,
		backdrop-filter,
		-webkit-backdrop-filter;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	transition-duration: 150ms;
}
summary:hover {
	background-color: rgba(243, 244, 246, 1);
}
summary svg {
	height: 1.5rem;
	margin-right: 1rem;
	width: 1.5rem;
}
#love {
	color: rgba(107, 114, 128, 1);
	font-size: 0.875rem;
	line-height: 1.25rem;
	margin-top: 3.5rem;
	opacity: 0.6;
	text-align: center;
}
#love svg {
	color: rgba(252, 165, 165, 1);
	width: 1.25rem;
	height: 1.25rem;
	display: inline;
	margin-top: -0.25rem;
}
@media screen and (min-width: 768px) {
	#hero {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
	#hero .logo-container {
		display: flex;
	}
	#middle-content {
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 4rem;
	}
}
```
