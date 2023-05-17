<template>
  <div class="container-component">
    <el-input
      v-show="props.data.show"
      class="container-component__input"
      :model-value="props.data.getValue().value"
      placeholder="回车查询"
      @input="onInputChange"
      @keyup.enter="props.data.onSearch"
    >
      <template #prepend>
        <el-select
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
      </template>
    </el-input>
    <my-button v-for="item in buttons" :key="item.text" :prop="item" />
  </div>
</template>
<script lang="ts" setup>
import { useButtons } from '@/composables'
import { SearchKeyInput } from '@/models/searchFormItems'

const props = defineProps({
  data: {
    type: SearchKeyInput,
    required: true,
  },
})
const { buttons } = useButtons([
  {
    buttonType: 'warning',
    text: '搜索',
    icon: 'search-form-items-search',
    onClick: props.data.onSearch,
  },
  {
    buttonType: 'warning',
    icon: 'search-form-items-refresh',
    onClick: props.data.onReset,
  },
  {
    buttonType: 'warning',
    icon: 'search-form-items-drop-down',
    onClick: props.data.onExpand,
  },
])
const emit = defineEmits(['change'])
const onInputChange = (value: any) => {
  console.log('onInputChange', value)
  emit('change', { value, key: props.data.getValue().key })
}
const onSelectChange = (value: any) => {
  console.log('onSelectChange', value)
  emit('change', { key: value, value: props.data.getValue().value })
}
</script>
<style lang="scss" scoped>
:deep(.el-input__wrapper) {
  padding-right: 0;
}

.container-component {
  flex-basis: 30%;
  margin-right: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  .container-component__input {
    flex: 1;
    width: 0;
  }
}
</style>
