import router from '../router'
import store from '../store/index'
import { getToken } from '@/utils/auth'

const message = (message, type) => {
  store.dispatch('setAlert', { message, type })
}

const whiteList = ['/login', '/register']
router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/dashboard' })
    } else {
      if (store.getters.roles === null) {
        store.dispatch('getInfo').then(() => {
          next()
        }).catch((err) => {
          store.dispatch('fedLogout')
          message(err || 'Verification failed, please login again', 'error')
          next({ path: '/login' })
        })
      } else {
        if (to.meta.roles) {
          if (to.meta.roles.includes(store.getters.roles)) {
            next()
          } else {
            message('You are not allowed to enter that part.', 'error')
            next({ path: '/dashboard' })
          }
        } else {
          next()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})
