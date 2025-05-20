import { createRoot } from "react-dom/client";
import App from "./App";

let root = null;

export async function bootstrap() {
  console.log("sub app bootstrap");
}

export async function mount(props) {
  const container =
    document.getElementById(props.containerId) ||
    document.getElementById("app1-container");
  root = createRoot(container);
  root.render(<App />);
}

export async function unmount() {
  root?.unmount();
}

// 独立运行时自动渲染
if (!window.singleSpaNavigate) {
  const container = document.getElementById("root");
  if (container) {
    root = createRoot(container);
    root.render(<App />);
  }
}
