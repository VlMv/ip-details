import { create } from 'zustand';


import { IPData } from '../type';


interface IPStore {
  ipData: IPData | null,
  setIPData: (data: IPData) => void,
  clearIPData: () => void,
}

export const useIPStore = create<IPStore>((set) => ({
  ipData: null,
  setIPData: (data) => set({ ipData: data }),
  clearIPData: () => set({ ipData: null }),
}));

