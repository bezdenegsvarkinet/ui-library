/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
import path, { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from '@vitest/browser-playwright'
import tailwindcss from '@tailwindcss/vite'
import dtsPlugin from 'vite-plugin-dts'

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
	plugins: [
		react(),
		dtsPlugin({
			// Генерируем типы ТОЛЬКО для entry point
			include: ['src/index.ts'],
			exclude: ['src/**/*.stories.ts', 'src/**/*.stories.tsx', 'src/main.tsx', 'src/App.tsx'],
			// Генерируем типы В ПАПКУ dist, а не src
			outDir: resolve(__dirname, 'dist'),
			rollupTypes: true,
			tsconfigPath: resolve(__dirname, 'tsconfig.json'),
		}),
		tailwindcss(),
	],
	build: {
		// ВАЖНО: режим библиотеки, а не приложения
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'UiLibrary',
			fileName: format => `index.${format === 'es' ? 'mjs' : 'js'}`,
			formats: ['es', 'cjs'],
		},
		rollupOptions: {
			// Не включаем react/react-dom в сборку
			external: ['react', 'react-dom', 'react/jsx-runtime'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
				},
			},
			// Игнорировать CSS файлы внутри stories при сборке
			onwarn(warning, warn) {
				if (warning.code === 'FILE_NAME_CONFLICT') return
				warn(warning)
			},
		},
		cssCodeSplit: false,
		emptyOutDir: true,
		sourcemap: true,
		minify: false,
	},
	test: {
		projects: [
			{
				extends: true,
				plugins: [
					// The plugin will run tests for the stories defined in your Storybook config
					// See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
					storybookTest({
						configDir: path.join(dirname, '.storybook'),
					}),
				],
				test: {
					name: 'storybook',
					browser: {
						enabled: true,
						headless: true,
						provider: playwright({}),
						instances: [
							{
								browser: 'chromium',
							},
						],
					},
					setupFiles: ['.storybook/vitest.setup.ts'],
				},
			},
		],
	},
})