import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: () => import('@/views/info-manage/preview.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'question/:id', title: '查看回答', name: 'answer-detail', component: () => import('@/views/info-manage/answer.vue') },
        { path: 'visitor/:type/:id', title: '访客查看记录详情', name: 'visitor-detail', component: () => import('@/views/person-manage/visitor-detail.vue') },
        { path: 'face/:id', title: '人脸详情', name: 'face-detail', component: () => import('@/views/person-manage/face-detail.vue') },
        { path: 'article/:id', title: '文章详情', name: 'artical-detail', component: () => import('@/views/info-manage/article-detail.vue') },
        { path: 'bug/operate/:id', title: '故障详情', name: 'bug-detail', component: () => import('@/views/bug-manage/bug-detail.vue') },
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: () => import('@/views/home/home.vue') },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: () => import('@/views/own-space/own-space.vue') },
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/people',
        icon: 'person-stalker',
        name: 'people',
        title: '人员管理',
        component: Main,
        children: [
            {
                path: 'property',
                icon: 'lock-combination',
                name: 'property',
                title: '物业人员管理',
                component: () => import('@/views/person-manage/property.vue')
            },
            {
                path: 'household',
                icon: 'person',
                name: 'household',
                title: '住户管理',
                component: () => import('@/views/person-manage/household.vue')
            },
            {
                path: 'visitor',
                icon: 'man',
                name: 'visitor',
                title: '访客管理',
                component: () => import('@/views/person-manage/visitor.vue')
            },
            {
                path: 'not-register',
                icon: 'xbox',
                name: 'not-register',
                title: '非注册人员记录',
                component: () => import('@/views/person-manage/not-register.vue')
            },
        ]
    },
    {
        path: '/system',
        icon: 'gear-b',
        name: 'system',
        title: '系统管理',
        component: Main,
        children: [
            {
                path: 'camera',
                icon: 'aperture',
                name: 'camera',
                title: '摄像头管理',
                component: () => import('@/views/system-manage/camera.vue')
            },
            {
                path: 'record',
                icon: 'ribbon-a',
                name: 'record',
                title: '门禁记录',
                component: () => import('@/views/system-manage/camera-record.vue')
            }
        ]
    },
    {
        path: '/info',
        icon: 'clipboard',
        name: 'article',
        title: '信息管理',
        component: Main,
        children: [
            { path: 'artical-publish', title: '文章发布', name: 'artical-publish', icon: 'compose', component: () => import('@/views/info-manage/article-publish.vue') },
            { path: 'artical-list', title: '文章列表', name: 'artical-list', icon: 'document-text', component: () => import('@/views/info-manage/article-list.vue') },
            { path: 'notice', title: '通知管理', name: 'community-notice', icon: 'chatboxes', component: () => import('@/views/info-manage/community-notice.vue') },
            { path: 'question', title: '问答管理', name: 'user-question', icon: 'chatboxes', component: () => import('@/views/info-manage/question-answer.vue') },
        ]
    },
    {
        path: '/bug',
        icon: 'bug',
        name: 'bug',
        title: '故障处理',
        component: Main,
        children: [
            {
                path: 'operate',
                icon: 'bug',
                name: 'bug_operate',
                title: '故障处理',
                component: () => import('@/views/bug-manage/bug-operate.vue')
            }
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
