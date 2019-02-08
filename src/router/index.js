import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/LoginPage'
import SignUp from '@/components/SignUpPage'
import UserPage from '@/components/UserPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Sign Up',
      component: SignUp
    },
    {
      path: '/user',
      name: 'User Page',
      component: UserPage
    }
  ]
})
