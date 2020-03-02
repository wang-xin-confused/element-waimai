import Vue from 'vue';
import Router from 'vue-router';
import goods from '@/components/goods/goods';
import seller from '@/components/seller/seller';
import ratings from '@/components/ratings/ratings';

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active', // 对路由激活时样式名称的修改
  routes: [
    {
      path: '/',
      redirect: { name: 'Goods' },
    },
    {
      path: '/goods', // 当有时候路径很长的时候,给路由起个名字比较方便
      name: 'Goods', // 命名路由
      component: goods,
    },
    {
      path: '/seller',
      name: 'Seller',
      component: seller,
    },
    {
      path: '/ratings',
      name: 'Ratings',
      component: ratings,
    },
  ],
});
