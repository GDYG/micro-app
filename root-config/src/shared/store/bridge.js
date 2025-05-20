import useGlobalStore from "./useGlobalStore";

export const GlobalState = {
  getUser: () => useGlobalStore.getState().user,
  setUser: (user) => useGlobalStore.getState().setUser(user),
  subscribeUser: (cb) => useGlobalStore.subscribe(cb),
};
