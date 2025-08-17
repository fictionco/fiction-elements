<script lang="ts" setup>
import { uiReset, waitFor } from '@fiction/utils'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import FClose from '@/components/FClose.vue'
import { popupUtil } from '@/utils/popupUtil'

defineOptions({ name: 'FModal' })

const {
  vis = false,
  modalClass,
  styleClass,
  fullScreen = false,
  hasClose = false,
  title = '',
  transitionMode = 'modal',
  teleportTo = 'body',
} = defineProps<{
  vis?: boolean
  modalClass?: string
  styleClass?: string
  fullScreen?: boolean
  hasClose?: boolean
  title?: string
  transitionMode?: 'modal' | 'slideUp'
  teleportTo?: string | Element
}>()

const emit = defineEmits<{
  'update:vis': [value: boolean]
  'close': [value: boolean]
  'escape': [value: boolean]
}>()

function close(args: { reason: 'escape' | 'reset' }): void {
  const { reason } = args
  emit('update:vis', false)
  emit('close', true)
  if (reason === 'escape')
    emit('escape', true)
}

const cls = modalClass ? [modalClass] : ['max-w-screen-md p-24']
const defaultStyleClass = styleClass ? [styleClass] : ['bg-theme-0 text-theme-900', 'shadow-xl']

if (fullScreen)
  cls.push('fixed inset-0')
else
  cls.push('rounded-xl my-6 mx-3')

const classes = [
  'relative',
  'text-left',
  'transform',
  'transition-all',
  'w-full',
  ...cls,
  ...defaultStyleClass,
]

const afterVisible = ref(false)
const cleanups: (() => void)[] = []

onMounted(async () => {
  const unwatch = watch(
    () => vis,
    (vis) => {
      if (vis) {
        popupUtil.activate()
        setTimeout(() => (afterVisible.value = true), 300)
      } else {
        afterVisible.value = false
        popupUtil.deactivate()
      }
    },
    { immediate: true },
  )

  cleanups.push(() => {
    unwatch()
    popupUtil.deactivate()
  })

  await waitFor(50)
  const resetCleanup = uiReset.onReset(() => {
    if (vis)
      close({ reason: 'reset' })
  })
  cleanups.push(resetCleanup)
})

onUnmounted(() => {
  cleanups.forEach((c) => c())
})

const modalTransition = computed(() => {
  if (transitionMode === 'slideUp') {
    return {
      enterActiveClass: 'ease-[cubic-bezier(0.25,1,0.33,1)] duration-500',
      enterFromClass: 'opacity-0 translate-y-full scale-95',
      enterToClass: 'opacity-100 translate-y-0 scale-100',
      leaveActiveClass: 'ease-[cubic-bezier(0.25,1,0.33,1)] duration-500',
      leaveFromClass: 'opacity-100 translate-y-0 scale-100',
      leaveToClass: 'opacity-0 translate-y-full scale-95',
    }
  }
  return {
    enterActiveClass: 'ease-[cubic-bezier(0.25,1,0.33,1)] duration-500',
    enterFromClass: 'opacity-0 scale-75',
    enterToClass: 'opacity-100 translate-y-0 scale-100',
    leaveActiveClass: 'ease-[cubic-bezier(0.25,1,0.33,1)] duration-500',
    leaveFromClass: 'opacity-100 translate-y-0 scale-100',
    leaveToClass: 'opacity-0 scale-75',
  }
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <Teleport :to="teleportTo">
    <div
      class="fixed inset-0 z-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      :class="!vis ? 'pointer-events-none' : ''"
    >
      <Transition
        enter-active-class="ease-out duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="ease-in duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="vis"
          class="fixed inset-0 bg-theme-800/60 active:bg-theme-800/80 cursor-pointer dark:bg-theme-600/90 backdrop-blur-sm transition-opacity"
          @click="close({ reason: 'escape' })"
        />
      </Transition>
      <div
        class="fixed inset-0 z-40 overflow-y-auto"
        @click="close({ reason: 'escape' })"
      >
        <div class="flex min-h-full items-center justify-center text-center">
          <Transition v-bind="modalTransition">
            <div
              v-if="vis"
              :class="classes"
              class="click-stop"
              @click.stop
            >
              <div
                v-if="hasClose || title"
                :class="!title && hasClose ? 'absolute top-0 right-0 z-10' : 'flex justify-between items-center border-b border-theme-200 dark:border-theme-700'"
              >
                <h2 v-if="title" class="text-xl font-semibold p-5">
                  {{ title }}
                </h2>
                <FClose
                  v-if="hasClose"
                  class="relative"
                  data-test-id="close-modal"
                  @click.stop="close({ reason: 'escape' })"
                />
              </div>
              <slot />
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </Teleport>
</template>
