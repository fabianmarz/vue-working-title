import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import './registerServiceWorker';
import router from './router';

import App from './App.vue';

const app = createApp(App);
const i18n = createI18n();

app.use(router);
app.use(i18n);
app.mount('#app');

export default app;
