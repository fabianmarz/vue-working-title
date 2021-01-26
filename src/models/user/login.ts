import { toRefs, reactive, computed } from 'vue';
import firebase from 'firebase/app';
import 'firebase/firestore';

interface LoginState {
  error: any;
  username: string;
  password: string;
  user: firebase.User|null;
}

export default function () {
  const state = reactive({
    error: null,
    username: '',
    password: '',
    user: null,
  } as LoginState);

  const isValid = computed(() => {
    const { username, password } = state;
    return username && password;
  });

  const login = () => {
    firebase.auth().signInWithEmailAndPassword(state.username, state.password)
      .then((s) => console.log(s), (error) => {
        console.log(error);
        state.error = error;
      });
  };

  const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((s) => {
        console.log(s);
      }, (error) => {
        state.error = error;
      })
      .catch((error) => {
        state.error = error;
      });
  };

  const logout = () => {
    firebase
      .auth()
      .signOut();
  };

  return {
    ...toRefs(state),
    isValid,
    login,
    loginWithGoogle,
    logout,
  };
}
