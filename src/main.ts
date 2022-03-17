import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.less';
import './assets/styles/theme.less';
import Antd from 'ant-design-vue';
import { useStore } from 'vuex'
import {Book} from './types'
import storage from './utils/storage'
const app = createApp(App)

// app.config.globalProperties.$message = message;
// app.config.globalProperties.$store = useStore()

// Spin.setDefaultIndicator({
//   indicator: h('i', { class: 'anticon anticon-loading anticon-spin ant-spin-dot' }),
// });

router.beforeEach((to,from,next)=>{
	if(to.matched.some(record => record.meta.requireAuth)){
		if(!storage.getItem('Token')){
			next({
				path:'/login',
				query:{redirect:to.fullPath}// 将跳转的路由path作为参数，登录成功后跳转该路由
			})
		}else{
			next()
		}
	}else{
		next()
	}
})

app.use(router)
app.use(store)
app.use(Antd)
app.mount('#app')
