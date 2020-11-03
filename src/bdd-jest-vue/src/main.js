import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueRouter from 'vue-router'
import TodoList from './containers/TodoList/TodoList.vue'
import NotFoundPage from './containers/NotFoundPage/NotFoundPage.vue'

Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  { path: '/', component: TodoList },
  { path: '*', component: NotFoundPage }
]
const router = new VueRouter({ routes })

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
