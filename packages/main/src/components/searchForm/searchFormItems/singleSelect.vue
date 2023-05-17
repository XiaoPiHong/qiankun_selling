<template>
  <el-select
    v-show="props.data.show"
    class="container-component"
    :model-value="props.data.getValue()"
    clearable
    filterable
    :placeholder="props.data.placeholder"
    :teleported="false"
    @change="onChange"
  >
    <el-option
      v-for="item in props.data.options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>
<script lang="ts" setup>
import { SingleSelect } from '@/models/searchFormItems'

const props = defineProps({
  data: {
    type: SingleSelect,
    required: true,
  },
})
const emit = defineEmits(['change'])
const onChange = (value: any) => {
  emit('change', value)
}
</script>
<style lang="scss" scoped>
.container-component {
  flex-basis: 10%;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
