<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
</script>

<template>
  <main class="main">
    <Header />
    <el-main class="container">
      <RouterView></RouterView>
    </el-main>
  </main>
</template>

<style scoped lang="scss">
.main {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .container {
    flex: 1;
    display: flex;
  }
}
</style>
