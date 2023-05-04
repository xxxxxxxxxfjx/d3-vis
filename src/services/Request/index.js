import axios from 'axios';
import { BASE_URL, TIMEOUT } from './config';
import { getToken } from '@/hooks/cookies';
class Request {
    constructor(BASE_URL, TIMEOUT) {
        this.instance = axios.create({
            baseURL: BASE_URL,
            timeout: TIMEOUT,
        });

        this.instance.interceptors.request.use(
            config => {
                const token = getToken();
                if (token) {
                    config.headers['token'] = token;
                }
                return config;
            },
            err => {
                return Promise.reject(err);
            }
        );

        this.instance.interceptors.response.use(
            res => {
                return res.data.data;
            },
            err => {
                return Promise.reject(err);
            }
        );
    }

    request(config) {
        return new Promise((resolve, reject) => {
            this.instance
                .request(config)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    get(config) {
        return this.request({ ...config, method: 'get' });
    }
    post(config) {
        return this.request({ ...config, method: 'post' });
    }
}

export default new Request(BASE_URL, TIMEOUT);
