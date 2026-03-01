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
			// ✅ Ключевая настройка: собрать все типы в один файл
			rollupTypes: true,

			// Явно указываем entry point
			entryRoot: resolve(__dirname, 'src'),
			include: [resolve(__dirname, 'src/index.ts')],

			// Исключаем story-файлы из генерации типов
			exclude: [resolve(__dirname, 'src/**/*.stories.ts'), resolve(__dirname, 'src/**/*.stories.tsx')],

			// Пути для Windows
			tsconfigPath: resolve(__dirname, 'tsconfig.build.json'),
			outDir: resolve(__dirname, 'dist'),
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