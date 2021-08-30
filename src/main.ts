import { createApp, h } from 'vue'
import App from './App.vue'
import router from './route/index'
import store from './store/index'
// import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import '@/assets/styles/common.less'
import '@/assets/styles/color.less'
import '@/assets/styles/index.less'
import { Button, Drawer, Input, message, Modal, Spin, Avatar, Image,Tabs, Upload, Radio} from 'ant-design-vue';
import { useStore } from 'vuex'

const app = createApp(App)

app.config.globalProperties.$message = message;
app.config.globalProperties.$store = useStore()

Spin.setDefaultIndicator({
  indicator: h('i', { class: 'anticon anticon-loading anticon-spin ant-spin-dot' }),
});

app.use(Button)
app.use(Modal)
app.use(Drawer)
app.use(Input)
app.use(Spin)
app.use(Avatar)
app.use(Image)
app.use(Tabs)
app.use(Upload)
app.use(Radio)

app.use(router)
app.use(store)
app.mount('#app')
