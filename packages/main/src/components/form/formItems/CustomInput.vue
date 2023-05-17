<template>
  <el-form-item
    :label="data.label"
    :prop="data.prop"
    :show-message="showMessage"
    :rules="data.rules"
    :required="data.required"
  >
    <el-input
      :type="data.type"
      :model-value="data.getValue()"
      :disabled="data.disabled"
      :placeholder="data.placeholder"
      :maxlength="data.maxlength"
      :clearable="false"
      @input="onChange"
    >
      <template v-if="data.append" #append>
        {{ data.append }}
      </template>
    </el-input>
  </el-form-item>
</template>

<script lang="ts" setup>
import { CustomInput } from '@/models/formItems'

const props = defineProps({
  data: {
    type: CustomInput,
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
