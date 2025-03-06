import uni from '@dcloudio/vite-plugin-uni'
import { defineConfig } from 'vite'
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    uni(),
  ],
  resolve: {
    alias: {
      // 解決pnpm 依赖问题
      '@vueuse/shared': require.resolve('@vueuse/shared'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // 使用固定的文件名（不包含哈希）
        entryFileNames: 'js/[name].js',
        chunkFileNames: 'js/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
})
