<template>
  <div class="container">
    <van-form @submit="login">
      <van-field
        v-model="username"
        name="Username"
        placeholder="Username"
        :rules="[{ required: true, message: 'Username is required' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="Password"
        placeholder="Password"
        :rules="[{ required: true, message: 'Password is required' }]"
      />
      <van-button
        type="primary"
        block
        native-type="submit"
      >
        Login
      </van-button>
      <van-button
        icon="plus"
        type="info"
        block
        @click="loginWithGoogle"
      >
        Login with Google
      </van-button>
    </van-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Button, Field, Form } from 'vant';

export default defineComponent({
  components: {
    'van-button': Button,
    'van-field': Field,
    'van-form': Form,
  },
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      firebase.auth();
    },
    loginWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      firebase.auth().signInWithPopup(provider).then((result) => {
        console.log(result);
      });
    },
  },
});
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 100vw;
    min-height: 100vh;
  }

  button + button {
    margin-top: 20px;
  }

  form {
    width: 100%;
    max-width: 600px;
  }
</style>
