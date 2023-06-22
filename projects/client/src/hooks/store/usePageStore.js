import { create } from "zustand";

const usePageStore = create((set) => ({
	page: 1,
	count: 1,
	nextPage: () => set(state => state.page < state.count && ({ page: state.page + 1 })),
	prevPage: () => set(state => state.page > 1 && ({ page: state.page - 1 })),
	goToPage: (page) => set((state) => (page > 0 && page <= state.count) && ({ page })),
	setCount: (num) => ({ count: num }),
}));

export default usePageStore;