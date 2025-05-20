## MF + Single-spa

## 项目结构

- `root-config` --- 主应用
- `app1` ---- react子应用
- `app2` ---- vue子应用

## 开始

### 启动主应用

```bash
cd root-config
npm run start
```

### 启动子应用

```bash
# 进入到相应子应用中，执行
npm run start
or
cd root-config
npm run start:xxx
```

### 功能

- [x] 注册配置主应用single-spa 和 MF 加载方式
- [x] 只按需动态加载对应子应用
- [x] 共享包 - 子应用使用MF配置模块导出
- [x] 样式隔离 - css module
- [x] 通信机制 - 事件总线

## RoadMap

- [] 样式隔离 - 沙箱机制（shadow-dom）
- [] 数据管理 - Zustand
