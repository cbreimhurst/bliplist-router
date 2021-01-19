import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './../pages/Home.vue'
import Lists from './../pages/Lists.vue'
import List from './../pages/List.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
      { 
        path: '/', 
        component: HomePage 
    },
      { 
        path: '/lists', 
        component: Lists 
    },
      { 
        path: '/list/:uuid', 
        component: List 
      }
    ]
})
