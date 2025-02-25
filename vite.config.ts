import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path";
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		svgr({
			include: 'src/assets/icons/named_exported/**/*.svg',
			exclude: [
				'node_modules/**',
			],
			svgrOptions: {
				exportType: 'named',
			},
		})
	],
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler'
			}
		}
	},
	resolve: {
		alias: {
			'@styles': path.resolve(__dirname, './src/styles'),
			'@icons': path.resolve(__dirname, './src/assets/icons'),
			'@images': path.resolve(__dirname, './src/assets/images'),
			'@services': path.resolve(__dirname, './src/services'),
			'@context': path.resolve(__dirname, './src/context'),
			'@components': path.resolve(__dirname, './src/components'),
			'@entities': path.resolve(__dirname, './src/entities'),
			'@shared': path.resolve(__dirname, './src/shared'),
            '@ui': path.resolve(__dirname, './src/components/ui'),
            '@constants': path.resolve(__dirname, './src/constants'),
			'@hooks': path.resolve(__dirname, './src/hooks'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@utils': path.resolve(__dirname, './src/utils'),
		},
	},
})
