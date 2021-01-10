import Vue from 'vue'
import VueRouter from "vue-router"

Vue.use(VueRouter);


const routes = [

    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/login'),
    },
    {
        path: '/',
        name: 'home',
        component: () => import('../views/home'),
        children: [
            {
                path: 'project',
                name: 'project',
                component: () => import('../views/api_manage/project_manage/project'),
            },
            {
                path: '',
                name: 'project',
                component: () => import('../views/api_manage/project_manage/project'),
            },
            {
                path: 'interface',
                name: 'interface',
                component: () => import('../views/api_info/apiInfo'),
            },

        ]
    },
];


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
