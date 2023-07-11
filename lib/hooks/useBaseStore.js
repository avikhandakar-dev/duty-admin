import { create } from "zustand";
import { persist } from "zustand/middleware";

const useBaseStore = create()(
  persist(
    (set, get) => ({
      showSidebar: true,
      setShowSidebar: (value) =>
        set({
          showSidebar: value,
        }),
    }),
    {
      name: "base-storage",
    }
  )
);
export default useBaseStore;
