import { defineConfig } from 'tsup'

export default defineConfig({
	// ✅ Просто строка — tsup сам разрешит путь относительно cwd
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
		'tailwind-merge',
		'tw-animate-css',
		'shadcn',
	],
	sourcemap: true,
	clean: true,
	minify: false,
	splitting: false,
	banner: { js: "'use client'" },
})