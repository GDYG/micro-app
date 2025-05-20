// root-config/src/index.js
import { registerApplication, start } from "single-spa";
import { apps } from "./utils/apps-config";
import { loadRemoteModule } from "./utils/loadRemoteModule";

apps.forEach((v, i) => {
  registerApplication({
    name: v.name,
    activeWhen: v.activeWhen,
    app: async () => {
      const app = await loadRemoteModule({
        url: v.url,
        scope: v.scope,
        module: v.module, // 与 ModuleFederationPlugin 中暴露的 module 名字一致
      });
      return app;
    },
    customProps: v.customProps,
  });
});

window.addEventListener("customEvent", (event) => {
  console.log("自定义事件：", event.detail);
});

start();
