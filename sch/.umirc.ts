// @ts-ignore
import { defineConfig } from 'umi';

export default defineConfig({
  title: '车云基础平台',
  history: {
    type: 'hash',
  },
  hash: true,
  npmClient: 'pnpm',
  plugins: ['@umijs/plugins/dist/dva'],
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/Logo', component: '@/routes/login' },
    { path: '/Maintain', component: '@/routes/maintain' },
    { path: '/404', component: '@/routes/404.js' },
    { path: '/*', component: '@/routes/404.js' },
  ],
  fastRefresh: true,
  dva: {
    immer: { immer: true },
  },
  publicPath: '/tsvcloud/',
  outputPath: 'tsvcloud',
  // plugins: ['./plugins/katex.js', './src/utils/mapPlugin.js'  ],

  // 引入外部文件
  // externals: { 'AMap': 'window.AMap', 'AMapUI': 'window. AMapUI' },
  // chunks: ['vendors', 'umi'],
  // chainWebpack: function (config: any, { webpack }: any) {
  //   config.merge({
  //     optimization: {
  //       splitChunks: {
  //         chunks: 'all',
  //         minSize: 30000,
  //         minChunks: 3,
  //         automaticNameDelimiter: '.',
  //         cacheGroups: {
  //           vendor: {
  //             name: 'vendors',
  //             test({ resource }: any) {
  //               return /[\\/]node_modules[\\/]/.test(resource);
  //               // return /[\\/]node_modules[\\/](xlsx|echarts|antd|d3)[\\/]/.test(resource);
  //             },
  //             priority: 10,
  //           },
  //         },
  //       },
  //     },
  //   });
  // },
  // analyze: {
  //   analyzerMode: 'server',
  //   analyzerPort: 8888,
  //   openAnalyzer: true,
  //   // generate stats file while ANALYZE_DUMP exist
  //   generateStatsFile: false,
  //   statsFilename: 'stats.json',
  //   logLevel: 'info',
  //   defaultSizes: 'parsed', // stat  // gzip
  // },
});
