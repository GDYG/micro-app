export async function loadRemoteModule({ url, scope, module }) {
  // 初始化共享作用域
  await __webpack_init_sharing__("default");

  // 加载远程入口
  if (!window[scope]) {
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Failed to load ${url}`));
      document.head.appendChild(script);
    });
  }

  const container = window[scope];
  if (!container) throw new Error(`Container ${scope} not found`);

  const initResult = container.init(__webpack_share_scopes__.default);
  if (initResult && initResult.then) {
    await initResult;
  }

  const factory = await container.get(module);
  const Module = factory();
  return Module;
}
