import Vue from 'vue'
import VueRouter from 'vue-router'
import BooksList from '@/components/books/BooksList'
import ViewBook from '@/components/books/ViewBook'

Vue.use(VueRouter)

export default new VueRouter({

    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'BooksList',
            component: BooksList
        },
        {
            path: '/view/:id(\\d+)',
            name: 'ViewBook',
            component: ViewBook,
            props: true
        }
    ]
})