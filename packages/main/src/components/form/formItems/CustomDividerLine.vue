<template>
  <div>
    <el-form-item
      :label="data.label"
      :prop="data.prop"
      :show-message="showMessage"
      :rules="data.rules"
      :required="data.required"
    />
    <div class="divider-line" :class="data.getValue()" />
  </div>
</template>

<script lang="ts" setup>
import { CustomDividerLine } from '@/models/formItems'

const props = defineProps({
  data: {
    type: CustomDividerLine,
    required: true,
  },
  showMessage: {
    type: Boolean,
    default: true,
  },
})
</script>

<style lang="scss" scoped>
.el-form-item {
  overflow: hidden;
  margin-bottom: 0 !important;
}

.divider-line {
  margin-bottom: 18px;
  color: #d8d8d8;
}

.none {
  border-style: none;
}

.dashed {
  border-width: 1px;
  border-style: dashed;
}

.thin {
  border-width: 1px;
  border-style: solid;
}

.middle {
  border-width: 2px;
  border-style: solid;
}
</style>
