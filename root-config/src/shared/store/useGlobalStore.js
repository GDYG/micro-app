import { create } from "zustand";

const useGlobalStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  token: null,
  setToken: (token) => set({ token }),
}));

export default useGlobalStore;
