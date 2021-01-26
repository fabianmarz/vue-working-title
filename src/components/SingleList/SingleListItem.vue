<template>
  <component
    :is="editing ? 'span' : 'router-link'"
    :to="{
      name: 'SingleListItemDetails',
      params: {
        listId,
        itemId: item.id,
      },
    }"
  >
    <el-card shadow="hover">
      <el-form @submit.prevent="editItem">
        <el-input
          v-if="editing"
          v-model="title"
          @submit="editing = false"
        />
        <span v-else>{{ title }}</span>
        <i
          class="el-icon-edit"
          @click.prevent="editing = !editing"
        />
      </el-form>
    </el-card>
  </component>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ElCard, ElInput, ElForm } from 'element-plus';

import Document from '@/models/db/document';

export default defineComponent({
  components: {
    ElCard,
    ElInput,
    ElForm,
  },
  props: {
    item: { type: Object, required: true },
    listId: { type: String, required: true },
  },
  setup(props) {
    const reference = `lists/${props.listId}/items`;
    const document = Document(reference);

    const title = ref(props.item.title);
    const editing = ref(false);

    const editItem = () => {
      editing.value = !editing.value;

      if (!editing.value) {
        const item = {
          id: props.item.id,
          title: title.value,
        };
        document.updateDocument({ ...item });
      }
    };

    return {
      title,
      editing,
      ...document,
      editItem,
    };
  },
});
</script>

<style>
.el-card__body {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.el-icon-edit {
  display: none;
}

.el-card:hover .el-icon-edit{
  display: initial;
}
</style>
