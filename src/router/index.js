import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/settings',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/basic-settings'),
                    meta: { title: '基础设置' }
                },
                {
                    path: '/business',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/business'),
                    meta: { title: '商品管理' }
                },
                {
                    path: '/sonManage',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/son-manage'),
                    meta: { title: '子站点管理' }
                },
                {
                    path: '/embody',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/embody'),
                    meta: { title: '提现管理' }
                },
                {
                    path: '/classify',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/classify'),
                    meta: { title: '用户商品管理' }
                },
                {
                    path: '/integral',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/integral'),
                    meta: { title: '积分管理' }
                },
                {
                    path: '/orders',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/users-orders'),
                    meta: { title: '用户订单管理' }
                },
                {
                    path: '/customer',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/customer'),
                    meta: { title: '用户管理' }
                },
                {
                    path: '/ticketsorder',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/tickets-order/order.vue'),
                    meta: { title: '门票订单' }
                },
                {
                    path: '/videoOrder',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/video-order/video-order.vue'),
                    meta: { title: '视频订单' }
                },
                {
                    path: '/tickets',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/tickets-statistics/tickets-statistics.vue'),
                    meta: { title: '门票数据统计' }
                },
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                }
                // {
                //     path: '/donate',
                //     component: () => import(/* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                //     meta: { title: '支持作者' }
                // }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
