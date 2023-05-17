<template>
  <el-checkbox-group
    v-show="props.data.show"
    :model-value="props.data.getValue()"
    class="container-component"
    @change="onChange"
  >
    <el-checkbox-button v-for="item in props.data.options" :key="item.value" :label="item.value">
      {{ item.label }}
    </el-checkbox-button>
  </el-checkbox-group>
</template>
<script lang="ts" setup>
import { SingleCheckBoxButton } from '@/models/searchFormItems'

const props = defineProps({
  data: {
    type: SingleCheckBoxButton,
    required: true,
  },
})
const emit = defineEmits(['change'])
const onChange = (value: any) => {
  if (value.length === 0) {
    emit('change', [''])
  } else {
    emit('change', [value[value.length - 1]])
  }
}
</script>
<style lang="scss" scoped>
.container-component {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
