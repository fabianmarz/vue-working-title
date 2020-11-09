import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';

const app = createApp(App);

const i18n = createI18n();

app.use(router);
app.use(i18n);
app.mount('#app');
