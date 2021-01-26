import { toRefs, reactive } from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';

export const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCQjjIHLAAe0Rh1-HhsisAyBsKWYpGA-1k',
  authDomain: 'working-title-1c0ef.firebaseapp.com',
  databaseURL: 'https://working-title-1c0ef.firebaseio.com',
  projectId: 'working-title-1c0ef',
  storageBucket: 'working-title-1c0ef.appspot.com',
  messagingSenderId: '198377782117',
  appId: '1:198377782117:web:1ab00c2eb800acbb95ff8c',
});

interface UserState {
  user: firebase.User | null;
  loading: boolean;
  error: any;
}

export default function () {
  const state = reactive<UserState>({
    user: null,
    loading: true,
    error: null,
  });

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      state.user = user;
    } else {
      state.user = null;
    }
    state.loading = false;
  });

  return {
    ...toRefs(state),
  };
}
