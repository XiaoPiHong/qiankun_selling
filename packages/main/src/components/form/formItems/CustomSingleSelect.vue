<template>
  <el-form-item
    :label="data.label"
    :prop="data.prop"
    :show-message="showMessage"
    :rules="data.rules"
    :required="data.required"
  >
    <el-select
      :model-value="data.getValue()"
      :disabled="data.disabled"
      clearable
      @change="onChange"
    >
      <el-option
        v-for="option in data.options"
        :key="option.value"
        :label="option.label"
        :value="option.value"
      />
    </el-select>
  </el-form-item>
</template>

<script lang="ts" setup>
import { CustomSingleSelect } from '@/models/formItems'

const props = defineProps({
  data: {
    type: CustomSingleSelect,
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
