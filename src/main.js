import Vue from 'vue'
// TODO: use cookies to manage UI
// import Cookies from 'js-cookie'
import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate'
import App from './App.vue'

Vue.use(BootstrapVue)
// NOTE: workaround for VeeValidate + vuetable-2
Vue.use(VeeValidate, {fieldsBagName: 'formFields'})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
