<template>
  <draggable class="dragArea list-group w-full" :list="list" @change="log">
    <div
      class=""
      v-for="element in list"
      :key="element.name"
    >
      {{ element.name }}
    </div>
  </draggable>
  <van-row>
    <van-col span="8">
      <van-button>hello</van-button>
    </van-col>
    <van-col span="8">
      <van-button>hello</van-button>
    </van-col>
    <van-col span="8">
      <van-button>hello</van-button>
    </van-col>
  </van-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';

import {
  Col,
  Row,
  Button,
} from 'vant';

export default defineComponent({
  data() {
    return {
      enabled: true,
      list: [
        { name: 'John', id: 1 },
        { name: 'Joao', id: 2 },
        { name: 'Jean', id: 3 },
        { name: 'Gerard', id: 4 },
      ],
      dragging: false,
    };
  },
  methods: {
    log(event: CustomEvent) {
      console.log(event);
    },
  },
  components: {
    'van-col': Col,
    'van-button': Button,
    'van-row': Row,
    draggable: VueDraggableNext,
  },
});
</script>
