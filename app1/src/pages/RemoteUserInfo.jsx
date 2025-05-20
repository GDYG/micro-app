// 子应用中（动态加载主应用的 store）
import { useEffect, useState } from "react";
import { loadRemoteModule } from "../utils/loadRemoteModule";
import { apps } from "../utils/apps-config";

export default function RemoteUserInfo() {
  const [useGlobalStore, setStore] = useState(null);

  useEffect(() => {
    const loadStore = async () => {
      const uiConfig = apps.filter((v) => v.module === "./store")[0];
      const module = await loadRemoteModule({
        url: uiConfig.url,
        scope: uiConfig.scope,
        module: uiConfig.module,
      });
      // console.log(3333, module.default);
      setStore(() => module.default);
    };

    loadStore();
  }, []);

  if (!useGlobalStore) return <div>loading...</div>;

  return <RemoteUserInfoLoader useGlobalStore={useGlobalStore} />;
}

function RemoteUserInfoLoader({ useGlobalStore }) {
  const user = useGlobalStore((state) => state.user);
  const setUser = useGlobalStore((state) => state.setUser);

  return (
    <div>
      <h2>共享用户信息</h2>
      <div>{user?.name || "暂无用户"}</div>
      <button onClick={() => setUser({ name: "Alice" })}>设为 Alice</button>
    </div>
  );
}
