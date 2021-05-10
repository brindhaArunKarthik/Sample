import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BButton, IconsPlugin } from 'bootstrap-vue'
import employees from './components/employees.vue'
Vue.use(require('vue-faker'), {locale: 'en_GB'});
Vue.use(BootstrapVue)
Vue.component('b-button', BButton)
Vue.use(IconsPlugin)
Vue.use(VueRouter)
Vue.config.productionTip = false
const router = new VueRouter({
  base: __dirname,
  //mode:'history',
  routes: [
    { path: '/employees',component:employees},
    ]
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
