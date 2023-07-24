import { create } from "zustand";

const useListStore = create()((set) => ({
  IngredientList: [],
  count: 1,
  setIngredientList: (IngredientList) => set({ IngredientList }),
  inc: () => set((state) => ({ count: state.count + 1 })),
}));

export default useListStore;
