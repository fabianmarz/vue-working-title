<template>
  <Button type="primary">Hello World</Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Button } from 'vant';

export default defineComponent({
  components: {
    Button,
  },
  data() {
    return {
    };
  },
});
</script>
