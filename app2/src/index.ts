import { createApp } from "vue";
import Root from "./root.component.vue";

let app: ReturnType<typeof createApp> | null = null;

export async function bootstrap() {
  // 初始化逻辑
}

export async function mount(props: any) {
  app = createApp(Root);
  app.mount(`#${props.containerId || "root"}`);
}

export async function unmount() {
  if (app) {
    app.unmount();
    app = null;
  }
}

if (!(window as any)?.singleSpaNavigate) {
  app = createApp(Root);
  app.mount("#root");
}
