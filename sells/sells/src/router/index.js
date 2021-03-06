import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Goods from '@/components/goods/goods';
import Ratings from '@/components/ratings/ratings';
import Seller from '@/components/seller/seller';

Vue.use(VueRouter);
Vue.use(VueResource);
export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Goods',
      component: Goods
    }, {
      path: '/goods',
      name: 'Goods',
      component: Goods
    }, {
      path: '/ratings',
      name: 'Ratings',
      component: Ratings
    }, {
      path: '/seller',
      name: 'Seller',
      component: Seller
    }
  ]

});
