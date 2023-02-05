import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './router'
import VueResource from 'vue-resource'
import VueSession from "vue-session";



Vue.use(VueRouter)
Vue.use(VueResource)

Vue.use(VueSession);

const router = new VueRouter({
  routes: Routes,
  mode:'history'
})

new Vue({
  render: (h) => h(App),
  router:router
}).$mount('#app')
