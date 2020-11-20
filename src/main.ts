import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import firebase from 'firebase/app';
import './registerServiceWorker';
import router from './router';

import App from './App.vue';

firebase.initializeApp({
  apiKey: 'AIzaSyCQjjIHLAAe0Rh1-HhsisAyBsKWYpGA-1k',
  authDomain: 'working-title-1c0ef.firebaseapp.com',
  databaseURL: 'https://working-title-1c0ef.firebaseio.com',
  projectId: 'working-title-1c0ef',
  storageBucket: 'working-title-1c0ef.appspot.com',
  messagingSenderId: '198377782117',
  appId: '1:198377782117:web:1ab00c2eb800acbb95ff8c',
});

const app = createApp(App);
const i18n = createI18n();

app.use(router);
app.use(i18n);
app.mount('#app');

export default app;
