import Vue from 'vue'
import VueRouter from 'vue-router'
import Editor from '../views/Editor.vue'
import List from '../views/List.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'list',
        component: List
    },
    {
        path: '/edit/:template',
        name: 'edit',
        component: Editor,
    },
    {
        path: '/create',
        name: 'create',
        component: Editor,
    },
    {path: '*', redirect: '/'}
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
