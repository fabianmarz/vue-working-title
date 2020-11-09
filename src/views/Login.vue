<template>
  <div class="container">
    <van-form @submit="login">
      <van-field v-model="username"
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
      <van-button type="primary" block native-type="submit">Login</van-button>
    </van-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  Button,
  Field,
  Form,
} from 'vant';

export default defineComponent({
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      console.log('test');
    },
  },
  components: {
    'van-button': Button,
    'van-field': Field,
    'van-form': Form,
  },
});
</script>

<style lang="scss" scoped>
  .container {
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  form {
    width: 100%;
    max-width: 600px;
  }
</style>
