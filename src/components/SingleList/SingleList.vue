<template>
  <el-space
    size="large"
    alignment="start"
  >
    <div class="single-list">
      <h3>{{ title }}</h3>
      <ul>
        <draggable
          v-model="collectionData"
          group="{ put: true }"
          @change="change"
        >
          <li
            v-for="item in collectionData"
            :key="item.id"
          >
            <single-list-item
              :item="item"
              :list-id="id"
            />
          </li>
        </draggable>
        <li>
          <el-card
            v-show="addingItem"
            shadow="hover"
          >
            <el-form @submit.prevent="addListItem">
              <el-input
                ref="itemInput"
                v-model="itemTitle"
              />
            </el-form>
          </el-card>
          <el-button
            type="info"
            icon="el-icon-plus"
            circle
            size="mini"
            :native-type="addingItem ? 'submit' : 'button'"
            @click="addingItem = true"
          />
          <i class="el-icon-close" />
        </li>
      </ul>
    </div>
  </el-space>
</template>

<script lang="ts">
import {
  defineComponent, onMounted, ref, watch,
} from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import {
  ElButton, ElSpace, ElCard, ElInput, ElForm,
} from 'element-plus';

import SingleListItem from '@/components/SingleList/SingleListItem.vue';

import Document from '@/models/db/document';
import Collection from '@/models/db/collection';

export default defineComponent({
  components: {
    SingleListItem,
    draggable: VueDraggableNext,
    ElButton,
    ElForm,
    ElSpace,
    ElCard,
    ElInput,
  },
  props: {
    id: { type: String, required: true },
    title: { type: String, default: '' },
    items: { type: Array, default: () => [] },
  },
  setup(props) {
    const reference = `lists/${props.id}/items`;
    const document = Document(reference);
    const collection = Collection(reference, {
      onMount: true,
      orderBy: 'createdOn',
    });

    const itemInput = ref<HTMLInputElement|null>(null);
    const addingItem = ref(false);
    const itemTitle = ref('');

    watch(addingItem, (value) => {
      if (value && itemInput.value) {
        itemInput.value.focus();
      }
    });

    onMounted(() => {
      collection.getRealTimeCollection();
    });

    return {
      ...document,
      ...collection,
      itemInput,
      addingItem,
      itemTitle,
    };
  },
  methods: {
    change(event: any) {
      if (event.added) {
        const item = event.added.element;
        this.addDocument({
          ...item,
          order: event.added.newIndex,
        });
      }
      if (event.removed) {
        this.removeDocument(event.removed.element.id);
      }
    },
    addListItem() {
      if (!this.itemTitle) {
        return;
      }
      this.createDocument({
        title: this.itemTitle,
      });
      this.itemTitle = '';
    },
  },
});
</script>

<style lang="scss">
  .single-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: $--size-base;
    background: $--color-info-lighter;

    ul {
      min-width: 260px;
      padding: 0;
      list-style: none;
    }

    li {
      margin-bottom: .5rem;
    }
  }
</style>
