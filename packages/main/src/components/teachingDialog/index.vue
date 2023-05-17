<template>
  <my-dialog
    :show="show"
    :title="title"
    @open="onOpen"
    @close="onClose"
    :position="{ dialogTop: 30, dialogLeft: 30, dialogRight: 30, dialogBottom: 30 }"
  >
    <template #default>
      <div class="teaching-container">
        <div class="teaching-container__content" v-html="html"></div>
      </div>
    </template>
  </my-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import * as teachingDialogApi from '@/apis/public/teachingDialog/teachingDialog'

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['submit', 'close', 'update:show'])
const html = ref('')
/**
 * 监听打开弹窗事件
 */
const onOpen = () => {
  teachingDialogApi
    .postTeaching({
      pageIndex: 1,
      pageSize: 30,
      orderBy: 'Sort desc,CreateTime desc',
      search:
        'h`h`h``h`|DocumentType`CategoryName`IsEnable``Title`|2`产品刊登`1`标题`【Allegro】产品刊登教程和操作技巧`创建时间|eq`eq`eq``like`|`````',
    })
    .then((res) => {
      html.value = res.Data.rows[0].Content
    })
}

/**
 * 监听关闭弹窗事件
 */
const onClose = () => {
  emit('update:show', false)
  emit('close')
}
</script>
<style lang="scss" scoped>
.teaching-container {
  .teaching-container__content {
    padding: 30px;
  }
}
</style>
