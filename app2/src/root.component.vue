<template>
  <div class="app2">
    <h2>🚀 Hello from Vue App2!</h2>
  </div>

  <div>当前用户：{{ currentUser.name || "暂无用户" }}</div>
  <button @click="toggleStatus">切换用户状态</button>
</template>

<script setup lang="ts">
import { loadRemoteModule } from "./utils/loadRemoteModule";
import { ref, onMounted, onUnmounted } from "vue";
const currentUser = ref({ name: "" });
let store;
let unsubscribe;

// 页面加载时初始化用户状态
onMounted(() => {
  const loadStore = async () => {
    store = await loadRemoteModule({
      url: "http://localhost:9000/remoteEntry.js",
      scope: "container",
      module: "./store-vue",
    });

    // 立即获取用户
    const user = store.GlobalState.getUser();
    updateUser(user);

    // 订阅用户变化
    unsubscribe = store.GlobalState.subscribeUser(updateUser);
  };

  loadStore();
});

// 组件卸载时取消订阅，防止内存泄漏
onUnmounted(() => {
  if (unsubscribe) unsubscribe();
});

function updateUser(user) {
  if (user) {
    currentUser.value = { name: user.user.name };
  }
}

// 修改状态
function toggleStatus() {
  const newName = currentUser.value.name === "Bob" ? "Alice" : "Bob";
  if (store) {
    store.GlobalState.setUser({ name: newName });
  }
}

window.dispatchEvent(
  new CustomEvent("customEvent", { detail: { userId: 123, name: "Tom" } })
);
</script>

<style scoped>
.app2 {
  padding: 20px;
  background: #f0f0f0;
}
</style>
