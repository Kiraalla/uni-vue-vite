import uni from '@dcloudio/vite-plugin-uni'
import { defineConfig } from 'vite'
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    uni(),
  ],
  build: {
    minify: false, // 禁用代码压缩
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
