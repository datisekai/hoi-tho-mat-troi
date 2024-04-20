<template>
  <div class="inosuke">
    <el-text class="title">Nguồn: FB Nguyễn Đức Huy</el-text>
    <div class="images">
      <div class="image" v-for="(img, i) in inosukes" :key="i">
        <el-image :src="img" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inosukes } from "../../constants";
</script>

<style scoped lang="scss">
.inosuke {
  .title {
    font-weight: 600;
  }
  .images {
    margin-top: 20px;
    .image {
      text-align: center;
      margin: 0 auto;
    }
  }
}
</style>
