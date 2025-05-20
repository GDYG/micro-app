import React, { useEffect, useState } from "react";
/**
 * @description 加载主应用的共享包
 */
import { loadRemoteModule } from "./utils/loadRemoteModule";
import { apps } from "./utils/apps-config";
import * as styles from "./styles/button.module.css";
import RemoteUserInfo from "./pages/RemoteUserInfo";

export default function App() {
  const [Button, setButton] = useState(null);

  /**
   * @description 加载主应用的共享包
   */
  useEffect(() => {
    async function init() {
      try {
        const uiConfig = apps.filter((v) => v.module === "./ui")[0];
        const { Button } = await loadRemoteModule({
          url: uiConfig.url,
          scope: uiConfig.scope,
          module: uiConfig.module,
        });
        setButton(() => Button);
      } catch (err) {
        console.err("error", err);
      }
    }

    init();
  }, []);

  // 监听通讯事件
  useEffect(() => {
    window.addEventListener("customEvent", (event) => {
      console.log("自定义事件：", event.detail);
    });
  }, []);

  if (!Button) return null;

  return (
    <h1>
      Hello from App1 (React)
      <section>
        <Button />
        <button className={styles.button}>css module</button>
      </section>
      <RemoteUserInfo />
    </h1>
  );
}
