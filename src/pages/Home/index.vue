<template>
  <div class="home">
    <el-form class="kimetsu" label-width="auto" style="max-width: 600px">
      <div class="sum-value">
        <el-text>Kết quả cần tính</el-text>
        <el-input-number v-model="sumValue" :min="0" />
      </div>
      <el-divider />
      <div class="result">
        <el-text class="result-text">{{
          loading
            ? "Đang tìm kết quả..."
            : result || "Kết quả sẽ hiển thị tại đây"
        }}</el-text>
      </div>
      <el-divider />

      <div class="number">
        <el-text class="number-title">Số lượng các số đang có</el-text>
        <div class="form-quantity">
          <div
            class="form-item"
            v-for="(item, index) in formNumber"
            :key="index"
          >
            <el-text>{{ item.label }}</el-text>
            <el-input-number
              v-model="formQuantityNumber[`${item.key}`]"
              :min="0"
            />
          </div>
        </div>
      </div>
      <div class="calculate">
        <el-text class="calculate-title"
          >Số lượng các phép tính đang có</el-text
        >
        <div class="form-quantity">
          <div
            class="form-item"
            v-for="(item, index) in formCalculate"
            :key="index"
          >
            <el-text>{{ item.label }}</el-text>
            <el-input-number
              v-model="formQuantityCalculate[`${item.key}`]"
              :min="0"
            />
          </div>
        </div>
      </div>

      <el-divider />
      <div class="action">
        <el-button :loading="loading" @click="handleCalculate" type="primary"
          >Tìm kết quả</el-button
        >
        <el-button
          :loading="loading"
          v-if="count > 0"
          @click="handleNextCalculate"
          type="success"
          >Trừ và tiếp tục tính</el-button
        >
        <!-- <el-button type="primary">Primary</el-button> -->
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { formCalculate, formNumber } from "../../constants";
import { getCalculator } from "../../utils";
import { ElNotification } from "element-plus";

interface FormQuantity {
  [key: string]: number;
}

const formQuantityNumber = reactive<FormQuantity>({
  quantity0: 0,
  quantity1: 0,
  quantity2: 0,
  quantity3: 0,
  quantity4: 0,
  quantity5: 0,
  quantity6: 0,
  quantity7: 0,
  quantity8: 0,
  quantity9: 0,
});

const formQuantityCalculate = reactive<FormQuantity>({
  quantityPlus: 0,
  quantityMinus: 0,
  quantityMulti: 0,
  quantityDivide: 0,
});

const sumValue = ref(20);
const result = ref<string>("");
const count = ref(0);
const oldResult = ref<any>([]);
const loading = ref(false);

const updateForm = () => {
  const newFormCalculate = { ...formQuantityCalculate };
  const newFormNumber = { ...formQuantityNumber };
  for (const item of oldResult.value) {
    if (typeof item === "string") {
      switch (item) {
        case "+":
          newFormCalculate.quantityPlus -= 1;
          break;
        case "-":
          newFormCalculate.quantityMinus -= 1;
          break;
        case "*":
          newFormCalculate.quantityMulti -= 1;
          break;
        case "/":
          newFormCalculate.quantityDivide -= 1;
          break;
      }
    }

    if (typeof item === "number") {
      switch (item) {
        case 0:
          newFormNumber.quantity0 -= 1;
          break;
        case 1:
          newFormNumber.quantity1 -= 1;
          break;
        case 2:
          newFormNumber.quantity2 -= 1;
          break;
        case 3:
          newFormNumber.quantity3 -= 1;
          break;
        case 4:
          newFormNumber.quantity4 -= 1;
          break;
        case 5:
          newFormNumber.quantity5 -= 1;
          break;
        case 6:
          newFormNumber.quantity6 -= 1;
          break;
        case 7:
          newFormNumber.quantity7 -= 1;
          break;
        case 8:
          newFormNumber.quantity8 -= 1;
          break;
        case 9:
          newFormNumber.quantity9 -= 1;
          break;
      }
    }
  }

  formQuantityCalculate.quantityPlus = newFormCalculate.quantityPlus;
  formQuantityCalculate.quantityMinus = newFormCalculate.quantityMinus;
  formQuantityCalculate.quantityMulti = newFormCalculate.quantityMulti;
  formQuantityCalculate.quantityDivide = newFormCalculate.quantityDivide;

  formQuantityNumber.quantity0 = newFormNumber.quantity0;
  formQuantityNumber.quantity1 = newFormNumber.quantity1;
  formQuantityNumber.quantity2 = newFormNumber.quantity2;
  formQuantityNumber.quantity3 = newFormNumber.quantity3;
  formQuantityNumber.quantity4 = newFormNumber.quantity4;
  formQuantityNumber.quantity5 = newFormNumber.quantity5;
  formQuantityNumber.quantity6 = newFormNumber.quantity6;
  formQuantityNumber.quantity7 = newFormNumber.quantity7;
  formQuantityNumber.quantity8 = newFormNumber.quantity8;
  formQuantityNumber.quantity9 = newFormNumber.quantity9;
};

const handleNextCalculate = () => {
  if (oldResult.value) {
    updateForm();
    handleCalculate();
  }
};
const handleCalculate = async () => {
  let arrayNumber: number[] = [];
  let index = 0;
  for (const [key, value] of Object.entries(formQuantityNumber)) {
    arrayNumber = [...arrayNumber, ...new Array(value).fill(index)];
    index++;
  }

  const arrayCalculate: string[] = [
    ...new Array(formQuantityCalculate.quantityPlus).fill("+"),
    ...new Array(formQuantityCalculate.quantityMinus).fill("-"),
    ...new Array(formQuantityCalculate.quantityMulti).fill("*"),
    ...new Array(formQuantityCalculate.quantityDivide).fill("/"),
  ];

  if (arrayNumber.length == 0 && arrayCalculate.length == 0) return;

  loading.value = true;
  let arrayResult: any = [];
  try {
    arrayResult =
      (await getCalculator(arrayNumber, arrayCalculate, sumValue.value)) || [];
  } catch (error) {}
  loading.value = false;
  oldResult.value = arrayResult;

  const text =
    arrayResult?.length > 0 ? arrayResult.join(" ") : "Không tìm thấy";
  result.value = text;

  ElNotification({
    title: "Thông báo",
    message: text,
  });

  if (arrayResult.length > 0) {
    count.value += 1;
  }
};
</script>

<style scoped lang="scss">
.home {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 100px;

  .result {
    border: 1px solid rgb(78, 177, 78);
    padding: 10px;
    border-radius: 10px;
    background-color: rgb(132, 238, 132);
    display: flex;
    justify-content: center;
    .result-text {
      font-size: 1rem;
      color: black;
      font-weight: 600;
    }
  }
  .sum-value {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-text {
      font-weight: 600;
      font-size: 1rem;
    }
    margin-bottom: 20px;
  }
  .kimetsu {
    .number-title,
    .calculate-title {
      font-weight: 600;
      font-size: 1rem;
    }
    .form-quantity {
      display: grid;
      margin-top: 20px;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-gap: 12px;
      .el-text {
        display: block;
        margin-bottom: 4px;
      }

      @media screen and (max-width: 900px) {
        grid-template-columns: 1fr 1fr;
      }
    }

    .calculate {
      margin-top: 40px;
    }

    .action {
      margin-top: 20px;
    }
  }
}
</style>
