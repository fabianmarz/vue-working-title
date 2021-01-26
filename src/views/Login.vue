<template>
  <div class="container">
    <p v-if="error">
      {{ error.message }}
    </p>
    <el-form @submit="login">
      <el-form-item>
        <el-input
          v-model="username"
          name="Username"
          placeholder="Username"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="password"
          type="password"
          name="Password"
          placeholder="Password"
          :rules="[{ required: true, message: 'Password is required' }]"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          native-type="submit"
        >
          Login
        </el-button>
        <el-button
          icon="el-icon-plus"
          type="info"
          @click="loginWithGoogle"
        >
          Login with Google
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import {
  ElButton, ElInput, ElForm, ElFormItem,
} from 'element-plus';

import userAuth from '@/models/user/auth';
import userLogin from '@/models/user/login';

export default defineComponent({
  components: {
    ElButton,
    ElInput,
    ElForm,
    ElFormItem,
  },
  setup() {
    const { error } = userAuth();
    const loginState = userLogin();

    return {
      ...loginState,
      error: computed(() => (loginState.error || error).value),
    };
  },
});
</script>

<style lang="scss" scoped>
  form {
    width: 100%;
    max-width: 600px;
  }
</style>
