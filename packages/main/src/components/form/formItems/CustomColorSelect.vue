<template>
  <el-form-item
    :label="data.label"
    :prop="data.prop"
    :show-message="showMessage"
    :rules="data.rules"
    :required="data.required"
  >
    <!-- el-input是让表单监测并校验自定义封装的组件  -->
    <el-input :model-value="data.getValue()" readonly style="display: none"></el-input>
    <ul @click.stop="onChange" class="custom-color-select-container">
      <li
        :style="{ backgroundColor: item.label }"
        v-for="item in data.options"
        :key="item.value"
        :data-index="item.value"
      >
        <svg-icon
          icon-class="form-items-check"
          color="#fff"
          v-show="data.getValue() === item.value"
        />
      </li>
    </ul>
  </el-form-item>
</template>

<script lang="ts" setup>
import { CustomColorSelect } from '@/models/formItems'

const props = defineProps({
  data: {
    type: CustomColorSelect,
    required: true,
  },
  showMessage: {
    type: Boolean,
    default: true,
  },
})
const emit = defineEmits(['change'])
const onChange = (e) => {
  // 事件委托
  if (e.target.nodeName === 'LI') {
    const curId = e.target.dataset.index
    emit('change', curId)
  }
}
</script>

<style lang="scss" scoped>
.custom-color-select-container {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0;
  overflow: hidden;

  li {
    width: 24px;
    height: 24px;
    margin: 8px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
