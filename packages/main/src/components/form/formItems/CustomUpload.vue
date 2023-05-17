<template>
  <el-form-item
    :label="data.label"
    :prop="data.prop"
    :show-message="showMessage"
    :rules="data.rules"
    :required="data.required"
  >
    <el-upload
      :action="data.action"
      :headers="data.headers"
      :method="data.method"
      :multiple="data.multiple"
      :data="data.data"
      :name="data.name"
      :with-credentials="data.withCredentials"
      :show-file-list="data.showFileList"
      :drag="data.drag"
      :accept="data.accept"
      :file-list="data.value"
      :list-type="data.listType"
      :auto-upload="data.autoUpload"
      :disabled="data.disabled"
      :limit="data.limit"
      :on-preview="data.onPreview"
      :on-remove="data.onRemove"
      :on-success="data.onSuccess"
      :on-error="data.onError"
      :on-progress="data.onProgress"
      :on-change="onChange"
      :before-upload="data.beforeUpload"
      :before-remove="data.beforeRemove"
      :http-request="data.httpRequest"
      :on-exceed="data.onExceed"
    >
      <el-icon class="el-icon--upload">
        <!-- <upload-filled /> -->
        +
      </el-icon>
      <div class="el-upload__text">将文件放在此处或<em>单击上传</em></div>
      <template #tip>
        <div class="el-upload__tip">最多上传{{ data.multiple ? `${data.limit}` : '1' }}份文件</div>
      </template>
    </el-upload>
  </el-form-item>
</template>

<script lang="ts" setup>
// import { UploadFilled } from '@element-plus/icons-vue'
import { CustomUpload } from '@/models/formItems'

const props = defineProps({
  data: {
    type: CustomUpload,
    required: true,
  },
  showMessage: {
    type: Boolean,
    default: true,
  },
})
const emit = defineEmits(['change'])
const onChange = (...args) => {
  emit('change', ...args)
}
</script>
