import { createRouter, createWebHashHistory } from 'vue-router';
import { routers } from '@/assets/data/menu';
const routes = [
    {
        path: '/',
        name: 'layout',
        component: () => import('@/components/layout/index.vue'),
        children: [],
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/404/index.vue'),
    },
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            title: '登录页',
        },
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

function addRoutes(menus) {
    let hasAddNewRoutes = false;
    menus.forEach(item => {
        if (!router.hasRoute(item.path)) {
            router.addRoute('layout', item);
            hasAddNewRoutes = true;
        }
    });
    return hasAddNewRoutes;
}
addRoutes(routers)
export default router;
