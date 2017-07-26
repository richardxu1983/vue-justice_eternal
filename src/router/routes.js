/**
 * Created by bingoogolapple on 2017/7/14.
 */
import blogRoutes from './blog-routes'

/**
 * 路由表配置
 */
export default [
  {
    name: 'AboutMe',
    path: '/AboutMe',
    component: resolve => require.ensure([], () => resolve(require('@/views/AboutMe.vue')), 'AboutMe')
  },

  {
    name: 'instruction',
    path: '/instruction',
    component: resolve => require.ensure([], () => resolve(require('@/views/instruction.vue')), 'instruction')
  },

  {
    name: 'Bilibili',
    path: '/Bilibili',
    component: resolve => require.ensure([], () => resolve(require('@/views/Bilibili.vue')), 'Bilibili')
  },
  {
    name: 'Bilibili1',
    path: '/Bilibili1',
    component: resolve => require.ensure([], () => resolve(require('@/views/Bilibili1.vue')), 'Bilibili1')
  },
  {
    name: 'Bilibili2',
    path: '/Bilibili2',
    component: resolve => require.ensure([], () => resolve(require('@/views/Bilibili2.vue')), 'Bilibili2')
  },
  {
    name: 'Bilibili3',
    path: '/Bilibili3',
    component: resolve => require.ensure([], () => resolve(require('@/views/Bilibili3.vue')), 'Bilibili3')
  },
  {
    name: 'Bilibili4',
    path: '/Bilibili4',
    component: resolve => require.ensure([], () => resolve(require('@/views/Bilibili4.vue')), 'Bilibili4')
  },
  {
    path: '/Blog',
    component: resolve => require.ensure([], () => resolve(require('@/views/Blog.vue')), 'Blog'),
    children: blogRoutes
  },
  {
    path: '*',
    redirect: '/Blog'
  }
]
