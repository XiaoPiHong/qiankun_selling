import { ref, Ref } from 'vue'

type ResizeType = 'lt' | 'rt' | 'rb' | 'lb'
const RESIZE_BLOCK_WIDTH = 8
const RESIZE_BLOCK_HEIGHT = 8

export default function (options: {
  dialogTop: Ref<number>
  dialogLeft: Ref<number>
  dialogRight: Ref<number>
  dialogBottom: Ref<number>
}) {
  const resizing = ref(false)
  const resizeType = ref<ResizeType>('lt')
  const prevDragoverX = ref(0)
  const prevDragoverY = ref(0)
  const dialogMinWidth = ref(300)
  const dialogMinHeight = ref(150)

  const dragstartResize = (event: MouseEvent, type: ResizeType) => {
    resizing.value = true
    resizeType.value = type
    prevDragoverX.value = event.clientX
    prevDragoverY.value = event.clientY
  }

  const dragoverResize = (event: MouseEvent) => {
    if (resizing.value) {
      const { clientX } = event
      const { clientY } = event
      const dX = clientX - prevDragoverX.value
      const dY = clientY - prevDragoverY.value
      const { dialogTop, dialogLeft, dialogRight, dialogBottom } = options
      const HALF_RESIZE_BLOCK_HEIGHT = RESIZE_BLOCK_HEIGHT / 2
      const HALF_RESIZE_BLOCK_WIDTH = RESIZE_BLOCK_WIDTH / 2
      const canShrinkX =
        window.innerWidth - dialogLeft.value - dialogRight.value - dialogMinWidth.value > 0
      const canShrinkY =
        window.innerHeight - dialogTop.value - dialogBottom.value - dialogMinHeight.value > 0
      const canResizeTopOuter = dY < 0 && clientY <= dialogTop.value + HALF_RESIZE_BLOCK_HEIGHT
      const canResizeTopInner = dY > 0 && canShrinkY
      const canResizeLeftOuter = dX < 0 && clientX <= dialogLeft.value + HALF_RESIZE_BLOCK_WIDTH
      const canResizeLeftInner = dX > 0 && canShrinkX
      const canResizeRightOuter =
        dX > 0 && clientX >= window.innerWidth - dialogRight.value - HALF_RESIZE_BLOCK_WIDTH
      const canResizeRightInner = dX < 0 && canShrinkX
      const canResizeBottomOuter =
        dY > 0 && clientY >= window.innerHeight - dialogBottom.value - HALF_RESIZE_BLOCK_HEIGHT
      const canResizeBottomInner = dY < 0 && canShrinkY
      const canResizeTop = canResizeTopOuter || canResizeTopInner
      const canResizeLeft = canResizeLeftOuter || canResizeLeftInner
      const canResizeRight = canResizeRightOuter || canResizeRightInner
      const canResizeBottom = canResizeBottomOuter || canResizeBottomInner

      switch (resizeType.value) {
        case 'lt':
          if (canResizeLeft) {
            dialogLeft.value += dX
          }

          if (canResizeTop) {
            dialogTop.value += dY
          }
          break
        case 'rt':
          if (canResizeRight) {
            dialogRight.value -= dX
          }
          if (canResizeTop) {
            dialogTop.value += dY
          }
          break
        case 'rb':
          if (canResizeRight) {
            dialogRight.value -= dX
          }
          if (canResizeBottom) {
            dialogBottom.value -= dY
          }
          break
        case 'lb':
          if (canResizeLeft) {
            dialogLeft.value += dX
          }
          if (canResizeBottom) {
            dialogBottom.value -= dY
          }
          break
      }

      prevDragoverX.value = clientX
      prevDragoverY.value = clientY
    }
  }

  const dragendResize = () => {
    resizing.value = false
  }

  return {
    dragstartResize,
    dragoverResize,
    dragendResize,
  }
}
