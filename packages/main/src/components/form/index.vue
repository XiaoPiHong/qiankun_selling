<template>
  <my-dialog
    :show="form.show"
    :title="form.title"
    :append-to-body="form.appendToBody"
    :modal="form.modal"
    @open="onOpen"
    @close="onClose"
  >
    <template #default>
      <div style="padding: 10px 100px 0">
        <el-form
          ref="formEl"
          :model="formModel"
          :rules="formRules"
          :label-width="form.config.labelWidth"
          :label-position="form.config.labelPosition"
          :size="form.config.size"
        >
          <el-row :gutter="form.config.gutter" style="margin-left: 0; margin-right: 0">
            <el-col
              v-for="model of list"
              :key="model.prop"
              :prop="model.prop"
              :span="model.colSpan"
            >
              <component
                :is="TYPE_TO_COMPONENT_MAP[model._type]"
                :data="model"
                @change="(...args) => onChange(model, args)"
              />
            </el-col>
          </el-row>
        </el-form>
      </div>
    </template>
    <template #footer>
      <el-button @click="onClickCancelBtn"> 取消 </el-button>
      <el-button type="primary" @click="onClickSaveBtn"> 确定 </el-button>
    </template>
  </my-dialog>
</template>
<script lang="ts" setup>
import { ref, toRefs, computed } from 'vue'
import { TYPE_TO_COMPONENT_MAP } from './formItems'
import { FormItemModelType } from '@/models/formItems'
import { Form } from '@/models'

const props = defineProps({
  form: {
    type: Form,
    required: true,
  },
})
const emit = defineEmits(['submit', 'close'])

const formEl = ref()
const { list } = toRefs(props.form)

const formModel = computed(() => {
  const result = {}

  list.value.forEach((model) => {
    result[model.prop] = model.getFormValue()
  })
  return result
})

const formRules = computed(() => {
  const result = {}

  for (let i = 0, len = list.value.length; i < len; i++) {
    const { prop, rules } = list.value[i]
    result[prop] = rules
  }
  return result
})

/**
 * 监听点击保存按钮
 */
const onClickSaveBtn = () => {
  formEl.value.validate().then(() => {
    const data = {
      ...formModel.value,
    }

    emit('submit', data)
  })
}

/**
 * 监听点击取消按钮
 */
const onClickCancelBtn = () => {
  onClose()
}

const onChange = (model: FormItemModelType, args: any[]) => {
  model.onBeforeChange(...args)
  model.onChange(...args)
  model.onAfterChange(...args)
}

/**
 * 监听打开弹窗事件
 */
const onOpen = () => {
  console.log('open Form')
}

/**
 * 监听关闭弹窗事件
 */
const onClose = () => {
  // props.form.update({
  //   show: false,
  // })
  emit('close')
}
</script>
<style lang="scss" scoped></style>
