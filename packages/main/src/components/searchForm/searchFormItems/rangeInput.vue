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
    <el-input
      class="container-component__preinput"
      :model-value="props.data.getValue().value[0]"
      :placeholder="props.data.prePlaceholder"
      @input="onPreInputChange"
    />
    <span class="container-component__text"> 至 </span>
    <el-input
      class="container-component__appendinput"
      :model-value="props.data.getValue().value[1]"
      :placeholder="props.data.appendPlaceholder"
      @input="onAppendInputChange"
    />
  </div>
</template>
<script lang="ts" setup>
import { RangeInput } from '@/models/searchFormItems'

const props = defineProps({
  data: {
    type: RangeInput,
    required: true,
  },
})
const emit = defineEmits(['change'])
const onPreInputChange = (value: any) => {
  const val = props.data.getValue()
  emit('change', { value: [value, val.value[1]], key: val.key })
}
const onAppendInputChange = (value: any) => {
  const val = props.data.getValue()
  emit('change', { value: [val.value[0], value], key: val.key })
}
const onSelectChange = (value: any) => {
  emit('change', { key: value, value: props.data.getValue().value })
}
</script>
<style lang="scss" scoped>
.container-component {
  flex-basis: 23%;
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

  .container-component__preinput {
    flex-basis: 25%;
  }

  .container-component__text {
    color: #606266;
    font-size: 14px;
  }

  .container-component__appendinput {
    flex-basis: 25%;
  }
}
</style>
