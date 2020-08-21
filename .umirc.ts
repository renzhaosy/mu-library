import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'Library Name',
  mode: 'site',
  // links: ['http://cdn.renzhaosy.cn/normalize.css'],
  // more config: https://d.umijs.org/config
  resolve: {
    includes: ['docs', 'packages/hooks/src', 'packages/design/src', 'packages/seed-components/src'],
  },
  hash: true,
  dynamicImport: {},
});
