import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['esm', 'cjs'],
	dts: {
		resolve: true,
		entry: 'src/index.ts',
	},
	external: [
		'react',
		'react-dom',
		'react/jsx-runtime',
		'tailwindcss',
		'class-variance-authority',
		'clsx',
		'lucide-react',
		'radix-ui',
	],
	sourcemap: true,
	clean: true,
	minify: false,
	splitting: false,
	injectStyle: false,
})