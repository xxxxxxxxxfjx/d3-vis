import { defineStore } from 'pinia';
import { login } from '@/services/modules/login.js';
import {setToken} from '@/hooks/cookies'
const useLoginStore = defineStore('loginStore', {
    state: () => ({}),
    actions: {
        async fetchLogin({ username, password }) {
            const res = await login(username, password);
            setToken(res.token)
        },
    },
});
export default useLoginStore;
