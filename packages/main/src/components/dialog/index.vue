<template>
  <div v-if="show">
    <teleport :to="to">
      <div class="modal" v-show="modal"></div>
      <div
        ref="dialogRef"
        class="dialog"
        :style="{
          inset: `${dialogTop}px ${dialogRight}px ${dialogBottom}px ${dialogLeft}px`,
        }"
      >
        <div class="dialog__title" @mousedown="onMousedownTitle">
          <span>{{ title }}</span>
          <div>
            <svg-icon
              icon-class="dialog-minimize"
              style="font-size: 18px; cursor: pointer"
              @click="onClickMinimizeBtn"
            ></svg-icon>
            <svg-icon
              icon-class="dialog-maximize"
              style="margin-left: 4px; font-size: 18px; cursor: pointer"
              @click="onClickMaximizeBtn"
            ></svg-icon>
            <svg-icon
              icon-class="dialog-close-square"
              style="margin-left: 4px; font-size: 18px; cursor: pointer"
              @click="onClickCloseSquareBtn"
            ></svg-icon>
          </div>
        </div>

        <div class="dialog__content" v-show="!isMinimize">
          <div class="dialog__content-body">
            <el-scrollbar v-if="enableScroll" always>
              <slot></slot>
            </el-scrollbar>
            <slot v-else></slot>
          </div>
          <div class="dialog__content-footer">
            <slot name="footer"></slot>
          </div>
        </div>

        <!-- <div class="dialog__resize dialog__resize-lt" @mousedown="onMousedownResizeLt"></div>
      <div class="dialog__resize dialog__resize-rt" @mousedown="onMousedownResizeRt"></div>
      <div class="dialog__resize dialog__resize-rb" @mousedown="onMousedownResizeRb"></div>
      <div class="dialog__resize dialog__resize-lb" @mousedown="onMousedownResizeLb"></div> -->
      </div>
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, toRefs, watch, computed } from 'vue'
import SvgIcon from '@/components/svgIcon/index.vue'
import { useDragDialog, useResizeDialog } from './composables'
import * as dialogToKey from '@/configs/dialog-to-key'

const props = defineProps({
  position: {
    type: Object,
    default: () => ({ dialogTop: 20, dialogLeft: 200, dialogRight: 200, dialogBottom: 50 }),
  },
  show: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  /**
   * Dialog 自身是否插入至 body 元素上（为了让弹窗不随body自适应宽高，实际是插入到dialogToKey.PAGE_CONTAINER）
   */
  appendToBody: {
    type: Boolean,
    default: false,
  },
  /**
   * 启用滚动
   */
  enableScroll: {
    type: Boolean,
    default: true,
  },
  /** 遮罩层 */
  modal: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['update:show', 'open', 'close'])

onMounted(() => {
  document.body.addEventListener('mousemove', onMousemoveBody)
  document.body.addEventListener('mouseup', onMouseupBody)
  document.body.addEventListener('mouseleave', onMouseleaveBody)
})

onUnmounted(() => {
  document.body.removeEventListener('mousemove', onMousemoveBody)
  document.body.removeEventListener('mouseup', onMouseupBody)
  document.body.removeEventListener('mouseleave', onMouseleaveBody)
})

const to = computed(() =>
  props.appendToBody ? `#${dialogToKey.PAGE_CONTAINER}` : `#${dialogToKey.PAGE_TABS_CONTAINER}`
)
const dialogRef = ref()
const isMaximize = ref(false)
const isMinimize = ref(false)
const dialogMinWidth = ref(250)
const dialogMinHeight = ref(50)
const dialogTop = ref(100)
const dialogLeft = ref(100)
const dialogRight = ref(100)
const dialogBottom = ref(100)
const { show } = toRefs(props)
const { dragstartDialog, dragoverDialog, dragendDialog } = useDragDialog({
  dialogTop,
  dialogLeft,
  dialogRight,
  dialogBottom,
})
const { dragstartResize, dragoverResize, dragendResize } = useResizeDialog({
  dialogTop,
  dialogLeft,
  dialogRight,
  dialogBottom,
})

watch(show, (newValue) => (newValue ? onOpen() : onClose()))

watch(
  () => props.position,
  (newValue) => {
    dialogTop.value = newValue.dialogTop
    dialogLeft.value = newValue.dialogLeft
    dialogRight.value = newValue.dialogRight
    dialogBottom.value = newValue.dialogBottom
  },
  {
    deep: true,
    immediate: true,
  }
)

/**
 * 监听点击最小化按钮
 */
const onClickMinimizeBtn = () => {
  isMinimize.value = true
  const { parentElement } = dialogRef.value
  const { offsetHeight, offsetWidth } = parentElement
  dialogLeft.value = 10
  dialogTop.value = 10
  dialogRight.value = offsetWidth - dialogMinWidth.value - 10
  dialogBottom.value = offsetHeight - dialogMinHeight.value - 10
  // onClose()
}

/**
 * 监听点击最大化按钮
 */
const onClickMaximizeBtn = () => {
  if (isMinimize.value) isMinimize.value = false
  if (isMaximize.value === false) {
    dialogTop.value = dialogLeft.value = dialogRight.value = dialogBottom.value = 10
    isMaximize.value = true
  } else {
    dialogTop.value = props.position.dialogTop
    dialogLeft.value = props.position.dialogLeft
    dialogRight.value = props.position.dialogRight
    dialogBottom.value = props.position.dialogBottom
    isMaximize.value = false
  }
}

/**
 * 监听点击关闭按钮
 */
const onClickCloseSquareBtn = () => {
  onClose()
}

/**
 * 监听点击取消按钮
 */
const onClickCancelBtn = () => {
  onClose()
}

/**
 * 监听 mousemove Body
 */
const onMousemoveBody = (event: MouseEvent) => {
  dragoverDialog(event)
  dragoverResize(event)
}
/**
 * 监听 mouseup Body
 */
const onMouseupBody = () => {
  dragendDialog()
  dragendResize()
}

/**
 * 监听 mouseleave Body
 */
const onMouseleaveBody = () => {
  dragendDialog()
  dragendResize()
}

/**
 * 监听 mousedown 标题区域
 */
const onMousedownTitle = dragstartDialog

/**
 * 监听 mousedown 调整左上角
 */
const onMousedownResizeLt = (event: MouseEvent) => dragstartResize(event, 'lt')

/**
 * 监听 mousedown 调整右上角
 */
const onMousedownResizeRt = (event: MouseEvent) => dragstartResize(event, 'rt')

/**
 * 监听 mousedown 调整右下角
 */
const onMousedownResizeRb = (event: MouseEvent) => dragstartResize(event, 'rb')

/**
 * 监听 mousedown 调整左下角
 */
const onMousedownResizeLb = (event: MouseEvent) => dragstartResize(event, 'lb')

/**
 * 监听打开抽屉事件
 */
const onOpen = () => {
  emit('open')
}

/**
 * 监听关闭抽屉事件
 */
const onClose = () => {
  emit('update:show', false)
  emit('close')
}
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 8px;
  left: 0;
  background-color: black;
  opacity: 0.7;
  z-index: 999;
}

.dialog {
  position: absolute;
  z-index: 999;
  box-sizing: border-box;
  padding: 0 8px 8px;
  border: 1px solid #b3b3b3;
  border-radius: 4px;
  background: rgb(238 238 238);

  .dialog__resize {
    position: absolute;
    width: 8px;
    height: 8px;
    user-select: none;

    &.dialog__resize-lt {
      top: 0;
      left: 0;
      cursor: nw-resize;
    }

    &.dialog__resize-rt {
      top: 0;
      right: 0;
      cursor: ne-resize;
    }

    &.dialog__resize-rb {
      right: 0;
      bottom: 0;
      cursor: nw-resize;
    }

    &.dialog__resize-lb {
      bottom: 0;
      left: 0;
      cursor: ne-resize;
    }
  }

  .dialog__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    margin: 0 -8px;
    padding: 0 8px;
    font-size: 15px;
    cursor: move;
    user-select: none;
  }

  .dialog__content {
    overflow: hidden;
    box-sizing: border-box;
    height: calc(100% - 40px);
    border: 1px solid #b3b3b3;

    .dialog__content-body {
      overflow: hidden;
      height: calc(100% - 30px);
      background-color: #fff;
    }

    .dialog__content-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 30px;
      padding: 0 8px;
      background-color: rgb(244 244 244);
    }
  }
}
</style>
