import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import '../assets/css/global.css'
import todo from '../components/todo.vue'
import sidebar from "@/components/sidebar";
import user from "@/components/user";
import timecounter from "@/components/timecounter";
import charts from "@/components/charts";
Vue.use(VueRouter)
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
//定义路由的入口和组件匹配
const routes = [
  {path:'/',redirect:'/login'},
  {path:'/login',component:login},
  {path:'/test',component: sidebar},
  {path:'/user',component: user},
  {path: '/timecounter',component: timecounter},
  {path:'/charts',component: charts},
  {path:'/todo',component:todo}
]
const router = new VueRouter({
  routes
})
//挂载路由导航守卫
router.beforeEach((to,from,next)=>{
  //to为要访问的路径
  if(to.path==='/login')return next();
  //from是哪个路径跳转而来
  const tokenstr=window.sessionStorage.getItem('token');
  if(!tokenstr)return next('/login');
  //next是一个放行函数
  next();
})


export default router
