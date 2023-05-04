import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router/index.js';
import pinia from '@/stores/index.js'
import 'normalize.css';
import '@/assets/css/index.css';
import '@/hooks/routerGuard';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
app.use(pinia).use(router).mount('#app');
