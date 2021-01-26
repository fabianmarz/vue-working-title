<template>
  <el-button @click="showForm = true">
    Add List
  </el-button>
  <el-form
    v-show="showForm"
    @submit.prevent="addList"
  >
    <el-input
      v-model="title"
      name="title"
      placeholder="List title"
    />
  </el-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElButton, ElInput, ElForm } from 'element-plus';

import Document from '@/models/db/document';

export default defineComponent({
  components: {
    ElButton,
    ElInput,
    ElForm,
  },
  setup() {
    const listsDocuments = Document('lists');

    return {
      ...listsDocuments,
    };
  },
  data() {
    return {
      title: '',
      showForm: false,
    };
  },
  methods: {
    addList() {
      this.createDocument({
        title: this.title,
      });
      this.title = '';
    },
  },
});
</script>
