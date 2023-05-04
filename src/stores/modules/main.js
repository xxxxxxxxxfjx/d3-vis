import { defineStore } from 'pinia';

const useMainStore = defineStore('mainStore', {
    state: () => ({
        windowWidth: 0,
        asideWidth: 200,
    }),
});

export default useMainStore;
