<template>
  <el-header>
    <el-menu
      :default-active="activeIndex"
      class="header"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
      :router="true"
    >
      <el-menu-item index="">
        <h1>Datisekai</h1>
      </el-menu-item>
      <div class="flex-grow" />
      <el-menu-item v-for="menu in headerMenu" :index="`/${menu.href}`">{{
        menu.title
      }}</el-menu-item>
    </el-menu>
  </el-header>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { headerMenu } from "../constants";
import { useChangeView } from "../hooks/useChangeView";
import { useRoute } from "vue-router";

const { changeView } = useChangeView();
const route = useRoute();

watch(route, () => {
  activeIndex.value = route.path;
});

const activeIndex = ref(route.path);
const handleSelect = (key: string) => {
  console.log(key);
  changeView(key);
};
</script>

<style lang="scss">
.flex-grow {
  flex-grow: 1;
}

.el-header {
  overflow-x: auto;
}

.el-header::-webkit-scrollbar {
  display: none;
}
</style>
