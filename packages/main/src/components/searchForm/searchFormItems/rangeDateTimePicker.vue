<template>
  <div class="container-component" v-show="props.data.show">
    <el-select
      class="container-component__select"
      :model-value="props.data.getValue().key"
      filterable
      :teleported="false"
      @change="onSelectChange"
    >
      <el-option
        v-for="item in props.data.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <div class="container-component__prepicker">
      <el-date-picker
        v-model="_preValue"
        :placeholder="props.data.prePlaceholder"
        :type="props.data.type"
        :teleported="false"
        :value-format="props.data.valueFormat"
        @change="onPrePickerChange"
      />
    </div>
    <span class="container-component__text"> 至 </span>
    <div class="container-component__appendpicker">
      <el-date-picker
        v-model="_appendValue"
        :placeholder="props.data.appendPlaceholder"
        :type="props.data.type"
        :teleported="false"
        :value-format="props.data.valueFormat"
        @change="onAppendPickerChange"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { watch, ref, computed } from 'vue'
import { RangeDateTimePicker } from '@/models/searchFormItems'

const props = defineProps({
  data: {
    type: RangeDateTimePicker,
    required: true,
  },
})
const emit = defineEmits(['change'])
const _preValue = ref<any>('')
const _appendValue = ref<any>('')
const preValue = computed(() => props.data.getValue().value[0])
const appendValue = computed(() => props.data.getValue().value[1])

watch(
  preValue,
  (value) => {
    if (value !== _preValue.value) {
      _preValue.value = value
    }
  },
  {
    immediate: true,
  }
)

watch(
  appendValue,
  (value) => {
    if (value !== _appendValue.value) {
      _appendValue.value = value
    }
  },
  {
    immediate: true,
  }
)

const onPrePickerChange = (value: any) => {
  const val = props.data.getValue()
  emit('change', { value: [value, val.value[1]], key: val.key })
}
const onAppendPickerChange = (value: any) => {
  const val = props.data.getValue()
  emit('change', { value: [val.value[0], value], key: val.key })
}
const onSelectChange = (value: any) => {
  emit('change', { key: value, value: props.data.getValue().value })
}
</script>
<style lang="scss" scoped>
.container-component {
  flex-basis: 33%;
  margin-right: 10px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: end;
  margin-bottom: 10px;

  .container-component__select {
    flex: 1;
    width: 0;
  }

  .container-component__prepicker {
    flex-basis: 35%;

    :deep(.el-date-editor.el-input, .el-date-editor.el-input__wrapper) {
      width: unset;
    }
  }

  .container-component__text {
    color: #606266;
    font-size: 14px;
  }

  .container-component__appendpicker {
    flex-basis: 35%;

    :deep(.el-date-editor.el-input, .el-date-editor.el-input__wrapper) {
      width: unset;
    }
  }
}
</style>
