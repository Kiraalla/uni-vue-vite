import {
  createSSRApp
} from "vue";
import App from "./App.vue";
import { registerGlobalComponents } from './utils/components';
import http from './utils/http';

export function createApp() {
  const app = createSSRApp(App);
  // 提供http方法, 供组件调用
  app.provide('$http', http);
  // 全局注册所有组件
  registerGlobalComponents(app);
  return {
    app,
  };
}
