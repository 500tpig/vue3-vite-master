import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'

import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://blog.csdn.net/pzy_666/article/details/123017630
import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'

import path, { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  return {
    base: env.VITE_PUBLIC_PATH, // 设置打包路径
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    plugins: [
      vue(),
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz'
      }),
      Components({
        extensions: ['vue', 'md', 'tsx'],
        include: [/\.md$/, /\.vue$/, /\.tsx$/, /\.ts$/],
        dts: resolve(__dirname, './presets/types/components.d.ts'),
        resolvers: [AntDesignVueResolver({ importStyle: 'less' })]
      }),
      PkgConfig(),
      OptimizationPersist()
    ],
    css: {
      preprocessorOptions: {
        scss: {
          // 关闭编译时 字符编码 报错问题
          charset: false,
          additionalData: `@import "./src/style/variable.scss";` //引用公共样式，使用vite搭建项目只安装sass即可，不需要安装node-sass,sass-loader
        },
        less: {
          modifyVars: {
            // 更改主题在这里
          },
          javascriptEnabled: true
        }
      }
    },
    build: {
      chunkSizeWarningLimit: 1000,
      brotliSize: false,
      // 拆分打包的配置方法
      rollupOptions: {
        // 分包
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        },
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    server: {
      host: '0.0.0.0',
      port: 4000, // 设置服务启动端口号
      open: true, // 设置服务启动时是否自动打开浏览器
      https: false,
      cors: true // 允许跨域

      // 设置代理，根据我们项目实际情况配置
      // proxy: {
      //   '/api': {
      //     target: 'http://xxx.xxx.xxx.xxx:8000',
      //     changeOrigin: true,
      //     secure: false,
      //     rewrite: path => path.replace('/api/', '/')
      //   }
      // }
    }
  }
})
