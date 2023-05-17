<template>
  <component
    :is="TYPE_TO_COMPONENT_MAP[model._type]"
    v-for="model of props.form.list"
    :key="model.prop"
    :prop="model.prop"
    :data="model"
    @change="(...args) => onChange(model, args)"
  />
</template>
<script lang="ts" setup>
import { SearchForm } from '@/models'
import { TYPE_TO_COMPONENT_MAP } from './searchFormItems'
import { SearchFormItemModelType } from '@/models/searchFormItems'

const props = defineProps({
  form: {
    type: SearchForm,
    required: true,
  },
})
const onChange = (model: SearchFormItemModelType, args: any[]) => {
  model.onBeforeChange(...args)
  model.onChange(...args)
  model.onAfterChange(...args)
}
</script>
<style lang="scss" scoped></style>
