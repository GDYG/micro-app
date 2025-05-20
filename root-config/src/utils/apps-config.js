export const apps = [
  {
    name: "@mfe/app1",
    url: "http://localhost:9001/remoteEntry.js",
    scope: "app1",
    module: "./root",
    activeWhen: ["/app1"],
    customProps: {
      containerId: "app1-container",
    },
  },
  {
    name: "@mfe/app2",
    url: "http://localhost:9002/remoteEntry.js",
    scope: "app2",
    module: "./root",
    activeWhen: ["/app2"],
    customProps: {
      containerId: "app2-container",
    },
  },
];
