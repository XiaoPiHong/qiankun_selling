import { ref, Ref } from 'vue'

export default function (options: {
  dialogTop: Ref<number>
  dialogLeft: Ref<number>
  dialogRight: Ref<number>
  dialogBottom: Ref<number>
}) {
  const dragging = ref(false)
  const prevDragoverX = ref(0)
  const prevDragoverY = ref(0)

  const dragstartDialog = (event: MouseEvent) => {
    dragging.value = true
    prevDragoverX.value = event.clientX
    prevDragoverY.value = event.clientY
  }

  const dragoverDialog = (event: MouseEvent) => {
    if (dragging.value) {
      const { clientX } = event
      const { clientY } = event
      let dX = clientX - prevDragoverX.value
      let dY = clientY - prevDragoverY.value
      const { dialogTop, dialogLeft, dialogRight, dialogBottom } = options
      if (dialogTop.value + dY < 0 || dialogBottom.value - dY < 0) {
        dY = 0
      }
      if (dialogLeft.value + dX < 0 || dialogRight.value - dX < 0) {
        dX = 0
      }
      dialogTop.value += dY
      dialogLeft.value += dX
      dialogRight.value -= dX
      dialogBottom.value -= dY
      prevDragoverX.value = clientX
      prevDragoverY.value = clientY
    }
  }

  const dragendDialog = () => {
    dragging.value = false
  }

  return {
    dragstartDialog,
    dragoverDialog,
    dragendDialog,
  }
}
