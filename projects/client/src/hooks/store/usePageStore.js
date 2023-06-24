import { create } from "zustand";

const usePageStore = create((set) => ({
	page: 1,
	count: 1,
	goToPage: (page) => set((state) => ({ 
		page: ((page > 0 && page <= state.count) ? Number(page) : state.page) 
	})),
	nextPage: () => set(state => ({ 
		page: state.page < state.count ? state.page + 1 : state.page
	})),
	prevPage: () => set(state => ({ 
		page: state.page > 1 ? state.page - 1 : state.page
	})),
	setCount: (num) => set({ count: num })
}));

export default usePageStore;