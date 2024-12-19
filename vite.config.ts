import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
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
			'@services': path.resolve(__dirname, './src/services'),
			'@context': path.resolve(__dirname, './src/context'),
			'@shared': path.resolve(__dirname, './src/shared'),
            '@ui': path.resolve(__dirname, './src/components/ui'),
            '@constants': path.resolve(__dirname, './src/constants'),
            '@pages': path.resolve(__dirname, './src/pages'),
			'@main': path.resolve(__dirname, './src/main'),
			'@editModals': path.resolve(__dirname, './src/components/features/FreelancerProfile/EditModals'),
		},
	},
})
