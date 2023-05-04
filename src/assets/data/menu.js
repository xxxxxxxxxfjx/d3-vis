const menus = [
    {
        path: null,
        icon: 'help',
        name: '平行坐标图',
        child: [
            {
                path: '/parallel/index_01',
                icon: 'home-filled',
                name: '简单平行坐标图',
            },
            {
                path: '/parallel/index_02',
                name: '/2222',
                icon: 'home-filled',
            },
        ],
    },

    {
        path: '/scatter/index01',
        name: '散点图',
        icon: 'help',
    },
    {
        path: null,
        name: '面积图',
        icon: 'help',
        child: [
            {
                path: '/area/index02',
                name: '简单面积图',
                icon: 'home-filled',
            },
            {
                path: '/area/index01',
                icon: 'home-filled',
                name: '面积图+brush',
            },
            {
                path: '/area/index03',
                icon: 'home-filled',
                name: '多面积视图',
            },
        ],
    },
];

const routers = [
    {
        path: '/parallel/index_01',
        name: '/parallel/index_01',
        component: () => import('@/views/vis/parallel/index01.vue'),
        meta: {
            title: '平行坐标图',
        },
    },
    {
        path: '/parallel/index_02',
        name: '/parallel/index_02',
        component: () => import('@/views/vis/parallel/index02.vue'),
        meta: {
            title: '平行坐标图',
        },
    },
    {
        path: '/scatter/index01',
        name: '平行坐标图',
        component: () => import('@/views/vis/scatter/index.vue'),
        meta: {
            title: '平行坐标图',
        },
    },
    {
        path: '/area/index01',
        name: '/area/index01',
        component: () => import('@/views/vis/area/index01.vue'),
        meta: {
            title: '面积图',
        },
    },
    {
        path: '/area/index02',
        name: '/area/index02',
        component: () => import('@/views/vis/area/index02.vue'),
        meta: {
            title: '面积图',
        },
    },
    {
        path: '/area/index03',
        name: '/area/index03',
        component: () => import('@/views/vis/area/index03.vue'),
        meta: {
            title: '面积图',
        },
    },
];

export { menus, routers };
