import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import StylelintPlugin from 'vite-plugin-stylelint'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
// import viteCompression from 'vite-plugin-compression'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // viteCompression({
    //   verbose: true,
    //   disable: false,
    //   deleteOriginFile: true,
    //   // 对于大于1m的文件才进行压缩
    //   // threshold:1024000,
    //   algorithm: 'gzip',
    //   ext: 'gz',
    // }),
    // #========gzip start
    // # gzip
    // # 开启gzip
    // gzip on;
    // # 开启gzip静态压缩功能
    // gzip_static on;
    // # gzip缓存大小
    // gzip_buffers 4 16k;
    // # gzip http版本
    // gzip_http_version 1.1;
    // # gzip压缩级别 1-10
    // gzip_comp_level 5;
    // # gzip压缩类型
    // gzip_types text/plain application/javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    // # 是否在http header中添加Vary: Accept-Encoding，建议开启
    // gzip_vary on;
    // #========gzip end
    eslintPlugin(),
    StylelintPlugin({ fix: true }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],
      symbolId: 'icon-[dir]-[name]',
      inject: 'body-last',
      customDomId: '__svg__icons__dom__',
    }),
  ],
  define: {
    // 解决i18n警告
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/element-global.scss" as *;`,
      },
    },
  },
  server: {
    host: 'localhost',
    port: 8080,
    open: true,
    proxy: {
      // '/new': {
      //   target: 'http://localhost:48149',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/new/, ''),
      // },
    },
  },
})
