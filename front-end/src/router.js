import register from './components/register.vue'
import login from './components/login.vue'
import home from './components/home.vue'
import create from './components/create.vue'
import gallery from './components/gallery.vue'
// import test from './components/test.vue'
// import showtest from './components/showtest.vue'

export default[
    {path:'/',component:login},
    {path:'/login',component:login},
    {path:'/register',component:register},
    {path:'/home/:id',component:home},
    {path:'/create/:id',component:create},
    // {path:'/test/:id',component:test},
    // {path:'/test',component:showtest},
    {path:'/gallery/:id',component:gallery},
    
]