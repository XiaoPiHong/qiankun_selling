<template>
  <div>
    <!-- button -->
    <el-button
      v-if="props.prop.show && props.prop.type === 'button'"
      style="margin-left: 0; margin-right: 10px"
      :type="props.prop.buttonType"
      :disabled="props.prop.disabled"
      @click="props.prop.onClick"
      :color="props.prop.color"
    >
      <template v-if="props.prop.icon">
        <svg-icon :icon-class="props.prop.icon" :color="props.prop.iconColor" />
      </template>
      {{ props.prop.text }}
      <template v-if="props.prop.infoIcon">
        <svg-icon :icon-class="props.prop.infoIcon" :color="props.prop.infoIconColor" />
      </template>
    </el-button>
    <!-- dropdown -->
    <el-dropdown
      trigger="click"
      style="margin-left: 0; margin-right: 10px"
      v-else-if="props.prop.show && props.prop.type === 'dropdown'"
    >
      <el-button :type="props.prop.buttonType" :color="props.prop.color">
        <template v-if="props.prop.icon">
          <svg-icon :icon-class="props.prop.icon" :color="props.prop.iconColor" />
        </template>
        {{ props.prop.text }}
        <template v-if="props.prop.infoIcon">
          <svg-icon :icon-class="props.prop.infoIcon" :color="props.prop.infoIconColor" />
        </template>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <template v-for="item in props.prop.dropDownOptions" :key="item.label">
            <div v-if="item.show" @click="item.onClick">
              <el-dropdown-item :disabled="item.disabled">{{ item.label }}</el-dropdown-item>
            </div>
          </template>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script lang="ts" setup>
import { Button } from '@/models'

const props = defineProps({
  prop: {
    type: Button,
    required: true,
  },
})
</script>
