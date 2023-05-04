import nprogress from 'nprogress';

export function openLoading() {
    nprogress.start();
}
export function closeLoading() {
    nprogress.done();
}

