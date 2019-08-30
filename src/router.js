import Vue from 'vue'
import Router from 'vue-router'
// import Index from './views/Index.vue'
import Products from './views/Products.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '*',
            redirect: '/'
        },
        {
            path: '/',
            component: Products
        },
        {
            path: '/grade',
            component: () => import(/* Grade */ './views/Grade.vue')
        },
        {
            path: '/seller',
            component: () => import(/* Seller */ './views/Seller.vue')
        }

    ],
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})
