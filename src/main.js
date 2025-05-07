//APP Core
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import pinia from './config/pinia';

//APP Core styles
import './scss/reset.scss';
import './scss/theme.scss';
import './scss/customToast.scss';

//Import plugins
import useToastPlugin from './config/toast';

const app = createApp(App);

useToastPlugin(app);

app.use(router);
app.use(pinia);

app.mount('#app');
