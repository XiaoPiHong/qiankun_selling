<template>
  <el-form-item
    :label="data.label"
    :prop="data.prop"
    :show-message="showMessage"
    :rules="data.rules"
    :required="data.required"
  >
    <el-checkbox-group :model-value="data.getValue()" :disabled="data.disabled" @change="onChange">
      <el-checkbox v-for="option of data.options" :key="option.value" :label="option.value">
        {{ option.label }}
      </el-checkbox>
    </el-checkbox-group>
  </el-form-item>
</template>

<script lang="ts" setup>
import { CustomCheckbox } from '@/models/formItems'

const props = defineProps({
  data: {
    type: CustomCheckbox,
    required: true,
  },
  showMessage: {
    type: Boolean,
    default: true,
  },
})
const emit = defineEmits(['change'])
const onChange = (value: any) => {
  emit('change', value)
}
</script>
