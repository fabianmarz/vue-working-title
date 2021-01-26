<template>
  <template v-if="loading">
    Loading…
  </template>
  <template v-else>
    <el-form
      :model="documentData"
      @submit.prevent="onSubmit"
    >
      <el-form-item label="Title">
        <el-input v-model="documentData.title" />
      </el-form-item>
      <el-form-item label="Description">
        <el-input
          v-model="documentData.description"
          type="textarea"
          rows="5"
        />
      </el-form-item>
      <el-form-item label="Instant delivery">
        <el-switch v-model="documentData.delivery" />
      </el-form-item>
      <el-form-item label="Instant delivery">
        <el-upload
          action="#"
          multiple
          :http-request="test"
          :file-list="fileList"
        >
          <el-button
            size="small"
            type="primary"
          >
            Click to upload
          </el-button>
          <template #tip>
            <div class="el-upload__tip">
              jpg/png files with a size less than 500kb
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          native-type="submit"
        >
          Create
        </el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </template>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElSwitch,
  ElUpload,
} from 'element-plus';

import Document from '@/models/db/document';
import Storage from '@/models/db/storage';
import { ElUploadRequestOptions } from 'element-plus/packages/upload/src/upload.type';

export default defineComponent({
  components: {
    ElButton,
    ElForm,
    ElFormItem,
    ElInput,
    ElSwitch,
    ElUpload,
  },
  props: {
    listId: { type: String, required: true },
    itemId: { type: String, required: true },
  },
  setup(props) {
    const reference = `lists/${props.listId}/items`;
    const document = Document(reference, {
      documentId: props.itemId,
      onMount: true,
    });

    const fileList = reactive([]);

    const onSubmit = () => {
      document.updateDocument(document.documentData.value);
    };

    const test = (data: ElUploadRequestOptions) => {
      console.log(typeof data, data);
      const { file } = data;
      const storage = Storage();
      storage.createFile(file);
    };

    return {
      ...document,
      onSubmit,
      test,
      fileList,
    };
  },
});
</script>
