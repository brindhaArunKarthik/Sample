import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BButton, IconsPlugin, SpinnerPlugin} from 'bootstrap-vue'
import firebase from "firebase/app";
//import * as firebase from "firebase/app"
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import employees from './components/employees.vue'

const config = {
  apiKey: "AIzaSyBTrezNtq9zdVJJNfyIzV-zDDFpJGf__GM",
  authDomain: "employee-8024d.firebaseapp.com",
  databaseURL: "https://employee-8024d-default-rtdb.firebaseio.com",
  projectId: "employee-8024d",
  storageBucket: "employee-8024d.appspot.com",
  messagingSenderId: "964374855407",
  appId: "1:964374855407:web:9f11fcb6633d19264aa51a",
  measurementId: "G-XJKTM0706X"
};
firebase.initializeApp(config);
Vue.use(require('vue-faker'), {locale: 'en_GB'});
Vue.use(BootstrapVue)
Vue.component('b-button', BButton)
Vue.use(IconsPlugin)
Vue.component('b-spinner',SpinnerPlugin)
Vue.use(VueRouter)
Vue.use(firebase)
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
