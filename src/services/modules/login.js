import Request from '../Request';
export function login(username, password) {
    return Request.post({
        url: 'admin/login',
        params: {
            username,
            password,
        },
    });
}
