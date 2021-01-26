<template>
  <template v-if="loading">
    LOADING…
  </template>
  <template v-if="user">
    <single-list-add />
    <hr>
    <div class="lists-wrapper">
      <single-list
        v-for="list in collectionData"
        :id="list.id"
        :key="list.id"
        :title="list.title"
        :items="list.items"
      />
    </div>
  </template>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

import UserAuth from '@/models/user/auth';
import Collection from '@/models/db/collection';

import SingleListAdd from '@/components/SingleList/SingleListAdd.vue';
import SingleList from '@/components/SingleList/SingleList.vue';

export default defineComponent({
  components: {
    SingleListAdd,
    SingleList,
  },
  setup() {
    const { user } = UserAuth();

    const listsCollection = Collection('lists', {
      onMount: true,
    });

    onMounted(() => {
      listsCollection.getRealTimeCollection();
    });

    return {
      ...listsCollection,
      user,
      showForm: false,
      lists: [],
    };
  },

});
</script>

<style lang="scss" scoped>
  .lists-wrapper {
    display: flex;
  }
</style>
