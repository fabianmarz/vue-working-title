<template>
  <template v-if="loading">
    Loading…
  </template>
  <template v-else>
    <el-form
      :model="documentData"
      @submit.prevent="submitForm"
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
        <el-progress
          v-show="processing"
          :percentage="progress"
        />
        <el-upload
          action="#"
          multiple
          :http-request="handleUpload"
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
          Save
        </el-button>
        <el-button @click="$router.back()">
          Back
        </el-button>
      </el-form-item>
    </el-form>
    {{ storageData }}
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
  ElProgress,
} from 'element-plus';

import { ElUploadRequestOptions } from 'element-plus/packages/upload/src/upload.type';

import Document from '@/models/db/document';
import Storage from '@/models/db/storage';

export default defineComponent({
  components: {
    ElButton,
    ElForm,
    ElFormItem,
    ElInput,
    ElSwitch,
    ElUpload,
    ElProgress,
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

    const storage = Storage({
      path: props.listId,
    });

    const fileList = reactive([]);

    const submitForm = () => {
      document.updateDocument(document.documentData.value);
    };

    const handleUpload = (data: ElUploadRequestOptions) => {
      const { file } = data;
      storage.createFile(file);
    };

    return {
      ...document,
      submitForm,
      handleUpload,
      fileList,
      ...storage,
    };
  },
});
</script>
