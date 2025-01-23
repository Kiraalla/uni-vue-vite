import {
  createSSRApp
} from "vue";
import App from "./App.vue";
import http from './utils/http';

export function createApp() {
  const app = createSSRApp(App);
  // 提供http方法, 供组件调用
  app.provide('$http', http);
  return {
    app,
  };
}
