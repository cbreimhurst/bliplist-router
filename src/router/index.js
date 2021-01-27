import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './../pages/Home.vue'
import Lists from './../pages/Lists.vue'
import List from './../pages/List.vue'
import SignUp from './../pages/SignUp.vue'
import LogIn from './../pages/LogIn.vue'

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
      },
      { 
        path: '/sign-up', 
        component: SignUp 
      },
      { 
        path: '/log-in', 
        component: LogIn 
      }
    ],
})
