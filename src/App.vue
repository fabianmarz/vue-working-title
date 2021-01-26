<template>
  <div class="container">
    <router-view />
  </div>
</template>

<style lang="scss">
@import '~/node_modules/element-plus/packages/theme-chalk/src/reset';

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 100vw;
  min-height: 100vh;
}
</style>
