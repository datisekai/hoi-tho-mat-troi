<template>
  <el-dialog
    v-model="dialogVisible"
    title="Thông báo"
    :width="devices.isMobile ? '90%' : '500'"
  >
    <div>
      <h3>Hướng dẫn sử dụng</h3>
      <div class="tnc">
        <div class="tnc-item">
          Bước 1: Nhập đúng số lượng các số & phép tính bạn đang có.
        </div>
        <div class="tnc-item">
          Bước 2: Ấn "Tìm kết quả" -> Kết quả sẽ được hiển thị trên khung màu
          xanh và thông báo.
        </div>
        <div class="tnc-item">
          <i>
            Chú ý: Để hệ thống tự động trừ các phép tính đã hiển thị ở lần trước
            và tiếp tục tính, anh em nhấn nút
            <strong>"Trừ và tiếp tục tính"</strong>. <br />
            => Đây là một tính năng giúp anh em không phải nhập lại các số, phép
            tính.
          </i>
        </div>
      </div>

      <div class="tags">
        <el-tag type="primary">#HTMT</el-tag>
        <el-tag type="primary">#Datisekai</el-tag>
        <el-tag type="primary">#S17</el-tag>
        <el-tag type="primary">#DSF</el-tag>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Ẩn thông báo</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import useDevice from "../../hooks/useDevice";

const dialogVisible = ref(true);

const { devices } = useDevice();
</script>

<style lang="scss">
.tnc {
  margin-top: 20px;
  .tnc-item {
    margin-bottom: 10px;
  }
}

.tags {
  margin-top: 10px;
  display: flex;
  gap: 8px;
}
</style>
