import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

const Admin = resolve => require.ensure([], () => resolve(require('@/views/back/admin')), 'admin');
const EditArticle = resolve => require.ensure([], () => resolve(require('@/views/back/edit_article')), 'editArticle');
const BackHome =  resolve => require.ensure([], () => resolve(require('@/views/back/back_home')), 'backHome');
const ArticleMgt = resolve => require.ensure([], () => resolve(require('@/views/back/article_mgt')), 'articleMgt');
const CommentMgt = resolve => require.ensure([], () => resolve(require('@/views/back/comment_mgt')), 'commentMgt');
const CategoriesMgt = resolve => require.ensure([], () => resolve(require('@/views/back/categories_mgt')), 'categoriesMgt');
const SubCategoriesMgt = resolve => require.ensure([], () => resolve(require('@/views/back/sub_categories_mgt')), 'subCategoriesMgt');

const Login = resolve => require.ensure([], () => resolve(require('@/views/back/login')), 'login');

const Index = resolve => require.ensure([], () => resolve(require('@/views/front/index')), 'index');
const List = resolve => require.ensure([], () => resolve(require('@/views/front/list')), 'list');
const ArticleDetail = resolve => require.ensure([], () => resolve(require('@/views/front/article_detail')), 'articleDetail');
const MapSite = resolve => require.ensure([], () => resolve(require('@/views/front/map_site')), 'mapSite');
const NoPage = resolve => require.ensure([], () => resolve(require('@/views/404')), 'noPage');

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/admin',
      redirect: '/admin/back_home',
      component: Admin,
      children: [
        { path: 'edit_article', name: 'edit_article', component: EditArticle, icon: 'edit', meta: { requireAuth: true, title: 'Markdown编辑器', noNeedAdmin: true }},
        { path: 'back_home', name: 'back_home', component: BackHome, icon: 'home', meta: { requireAuth:true, title: '首页' }},
        { path: 'article_mgt', name: 'article_mgt', component: ArticleMgt, icon: 'instruction', meta: { requireAuth: true, title: '文章管理' }},
        { path: 'comment_mgt', name: 'comment_mgt', component: CommentMgt, icon: 'random', meta: { requireAuth: true, title: '评论管理' }},
        { path: 'categories_mgt', name: 'categories_mgt', component: CategoriesMgt, icon: 'respond', meta: { requireAuth: true, title: '专栏管理' }},
        { path: 'sub_categories_mgt/:id', name: 'sub_categories_mgt', component: SubCategoriesMgt, meta: { requireAuth: true, title: '子栏管理' }}
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requireAuth: true, title:'登录'}
    },
    {
      path: '/',
      redirect: '/home',
      component: Index,
      children: [
        { path: 'home', name: 'front_home', component: List, meta: { title:'陈卓林个人博客|技术博客' }},
        { path: 'list/:id', name: 'list', component: List, props: true },
        { path: 'article_detail/:id', name: 'article_detail', component: ArticleDetail, props: true },
        { path: 'map_site', name: 'map_site', component: MapSite, meta: { title: '归档-陈卓林的博客' }}
      ]
    },
    {
      path: '*',
      name: '404',
      component: NoPage,
      meta: {
        title: '404'
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  //统计代码
  if (_hmt) {
    if (to.path) {
      _hmt.push(['_trackPageview', '/#' + to.fullPath]);
    }
  }

  if (to.meta.title) {
    window.document.title = to.meta.title;
  }

  //初次登陆，从localStorage重新存储token
  if (!store.state.token && window.localStorage.token) {
    store.commit('saveToken', window.localStorage.token);
  }

  //根据路由是否有token和权限,决定跳转的界面
  if (store.state.token && to.name === 'login') {
    next({ name: 'back_home' });
  } else if (!store.state.token && to.meta.requireAuth) {
    if (to.name === 'login') {
      return next();
    }
    next({ name: 'login' });
  } else {
    next();
  }
});

router.afterEach((to, from, next) => {
  //跳转路由后，滚动回到顶端
  window.scrollTo(0, 0);
});

export default router;
