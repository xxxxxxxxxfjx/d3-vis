import router from '@/router/index.js';
import { getToken } from '@/hooks/cookies';
import { notification } from '@/hooks/notification';
import { openLoading, closeLoading } from '@/hooks/loading';

router.beforeEach((to, from, next) => {
    openLoading();
    const token = getToken();
    // 1.不存在token 且加载页面不是登录页面路由
    if (!token && to.path != '/login') {
        notification('请先登录', 'error');
        return next({ path: '/login' });
    }

    // 2.重复登录
    if (token && to.path == '/login') {
        notification('请勿重复登录', 'error');
        return next({ path: from.path ? from.path : '/' });
    }
    // 3.token存在但是没有获取用户信息

    document.title = to.meta.title ? to.meta.title + ' D3 练习汇总' : 'D3 练习汇总';
    next();
});

router.afterEach((to, from) => {
    closeLoading();
});

//TODO:暂时不进行动态路由的添加，待完成
