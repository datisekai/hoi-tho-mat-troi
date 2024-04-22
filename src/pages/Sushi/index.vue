<template>
  <div class="sushi">
    <!-- <el-text class="title">Nguồn: YTB Lâm Thần Đen</el-text>
    <div class="videos">
      <div class="video" v-for="(item, i) in sushis" :key="i">
        <iframe
          :width="'90%'"
          :src="item"
          title="YouTube video player"
          class="player"
          loading="lazy"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </div> -->
    Đang phát triển
  </div>
</template>

<script setup lang="ts">
import { sushis } from "../../constants";
</script>

<style scoped lang="scss">
.sushi {
  width: 100%;
  .title {
    font-weight: 600;
  }
  .videos {
    margin-top: 20px;
    .video {
      margin-top: 10px;
      display: flex;
      justify-content: center;
    }
  }

  .player {
    aspect-ratio: 16/9;
  }
}
</style>
