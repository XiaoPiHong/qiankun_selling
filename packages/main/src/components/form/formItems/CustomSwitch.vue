<template>
  <el-form-item
    :label="data.label"
    :prop="data.prop"
    :show-message="showMessage"
    :rules="data.rules"
    :required="data.required"
  >
    <el-switch
      :model-value="data.getValue()"
      :disabled="data.disabled"
      @change="onChange"
      style="--el-switch-on-color: #87b87f; --el-switch-off-color: #d15b47"
      :active-text="data.activeText"
      inline-prompt
      :inactive-text="data.inactiveText"
    />
  </el-form-item>
</template>

<script lang="ts" setup>
import { CustomSwitch } from '@/models/formItems'

const props = defineProps({
  data: {
    type: CustomSwitch,
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
