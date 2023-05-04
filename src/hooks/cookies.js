import { useCookies } from '@vueuse/integrations/useCookies';

const cookies = useCookies();
const token = 'token';

export function setToken(value) {
    cookies.set(token,value)
}

export function getToken() {
    return cookies.get(token)
}

export function removeToken() {
    cookies.remove(token)
}