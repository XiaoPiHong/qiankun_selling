<template>
  <el-form-item
    :label="data.label"
    :prop="data.prop"
    :show-message="showMessage"
    :rules="data.rules"
    :required="data.required"
  >
    <el-input
      type="textarea"
      :model-value="data.getValue()"
      :disabled="data.disabled"
      :clearable="false"
      :autosize="data.autosize"
      resize="none"
      @input="onChange"
    />
  </el-form-item>
</template>

<script lang="ts" setup>
import { CustomTextarea } from '@/models/formItems'

const props = defineProps({
  data: {
    type: CustomTextarea,
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
