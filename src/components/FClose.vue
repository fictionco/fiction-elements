<script lang="ts" setup>
import { shortId } from '@fiction/utils'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

defineOptions({ name: 'FClose' })

const { colorMode = 'auto' } = defineProps<{
  colorMode?: 'light' | 'dark' | 'auto'
}>()

defineEmits<{
  click: [event: MouseEvent]
}>()

const inView = ref(false)
const randomId = shortId()

onMounted(() => {
  // Simple approach without visibility observer for now
  setTimeout(() => {
    inView.value = true
  }, 100)
})

onBeforeUnmount(() => {
  inView.value = false
})

const lineClass = computed(() => {
  if (colorMode === 'light')
    return 'bg-white'
  if (colorMode === 'dark')
    return 'bg-gray-950'
  else
    return 'bg-gray-950 dark:bg-white'
})
</script>

<template>
  <a
    :id="randomId"
    class="close block cursor-pointer duration-1000 hover:scale-110 active:scale-90 hover:rotate-90 transition-all ease-[cubic-bezier(0.25,1,0.33,1)] w-[60px] h-[60px] rounded-full"
    :class="inView ? 'in-view' : 'out-view'"
    @click="$emit('click', $event)"
  >
    <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px] rounded-full transition-all" />
    <span class="close-wrap overflow-hidden top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28px] h-[28px] absolute">
      <span :class="lineClass" class="close-line close-line1 h-full w-[3px] absolute rounded-[5px] left-[13px] transition-all" />
      <span :class="lineClass" class="close-line close-line2 h-full w-[3px] absolute rounded-[5px] left-[13px] transition-all" />
    </span>
  </a>
</template>

<style scoped>
.close {
  .close-line {
    animation-duration: 0.4s;
    animation-timing-function: cubic-bezier(0.52, 0.01, 0.16, 1);
    animation-fill-mode: forwards;
  }

  .close-line1 {
    transform: translateY(30px) translateX(-30px) rotate(0deg);
  }

  .close-line2 {
    transform: translateY(-30px) translateX(-30px) rotate(0deg);
  }

  &.in-view {
    .close-line1 {
      animation-name: crossRight;
      animation-delay: 0.15s;
    }
    .close-line2 {
      animation-name: crossLeft;
      animation-delay: 0.45s;
    }
  }

  &.out-view {
    .close-line1 {
      animation-name: crossRight;
      animation-delay: 0.15s;
      animation-direction: reverse;
    }
    .close-line2 {
      animation-name: crossLeft;
      animation-delay: 0.45s;
      animation-direction: reverse;
    }
  }
}

@keyframes crossRight {
  0% {
    transform: translateY(30px) translateX(-30px) rotate(0deg);
  }
  100% {
    transform: translateY(0) translateX(0) rotate(45deg);
  }
}

@keyframes crossLeft {
  0% {
    transform: translateY(-30px) translateX(-30px) rotate(0deg);
  }
  100% {
    transform: translateY(0) translateX(0) rotate(-45deg);
  }
}
</style>
