import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.less';
import './assets/styles/theme.less';
import Antd from 'ant-design-vue';
import { useStore } from 'vuex'
import {Book} from './types/global'
const app = createApp(App)

// app.config.globalProperties.$message = message;
app.config.globalProperties.$store = useStore()

// Spin.setDefaultIndicator({
//   indicator: h('i', { class: 'anticon anticon-loading anticon-spin ant-spin-dot' }),
// });


app.use(router)
app.use(store)
app.use(Antd)
app.mount('#app')
