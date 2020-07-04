import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Contents from './components/Contents.vue';
import Test from './Test.vue';

Vue.config.productionTip = false;

const router = new VueRouter({
  routes: [
    { path: '/', component: Contents, props: { contentType: 'posts'} },
    { path: '/:contentType', component: Contents, props: true },
    { path: '/:contentType/tags/:tag', component: Contents, props: true },
    { path: '/:contentType/:title', component: Contents, props: true },
  ]
});

Vue.use(VueRouter);

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app');
