<script setup lang="ts">
import { ref } from 'vue'
import { FModal, FClose } from '@/index'

const showModal = ref(false)
const showModalWithTitle = ref(false)
const showSlideUpModal = ref(false)
</script>

<template>
  <div class="min-h-screen bg-background p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-8 text-foreground">
        Fiction Elements Demo
      </h1>

      <div class="space-y-6">
        <!-- Basic Modal Demo -->
        <div class="bg-background border border-border p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4">Basic Modal</h2>
          <button
            class="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
            @click.stop="showModal = true"
          >
            Open Basic Modal
          </button>
        </div>

        <!-- Modal with Title Demo -->
        <div class="bg-background border border-border p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4">Modal with Title & Close</h2>
          <button
            class="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
            @click.stop="showModalWithTitle = true"
          >
            Open Modal with Title
          </button>
        </div>

        <!-- Slide Up Modal Demo -->
        <div class="bg-background border border-border p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4">Slide Up Modal</h2>
          <button
            class="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
            @click.stop="showSlideUpModal = true"
          >
            Open Slide Up Modal
          </button>
        </div>

        <!-- FClose Component Demo -->
        <div class="bg-background border border-border p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4">FClose Component</h2>
          <div class="flex items-center gap-4">
            <FClose @click="console.log('Light close clicked')" />
            <FClose color-mode="dark" @click="console.log('Dark close clicked')" />
            <FClose color-mode="auto" @click="console.log('Auto close clicked')" />
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <FModal v-model:vis="showModal">
      <div class="p-6">
        <h3 class="text-lg font-medium mb-2">Basic Modal Content</h3>
        <p class="text-theme-600 mb-4">
          This is a basic modal without title or close button.
          Click outside or press Escape to close.
        </p>
        <button
          class="px-4 py-2 bg-theme-500 text-white rounded hover:bg-theme-600"
          @click="showModal = false"
        >
          Close
        </button>
      </div>
    </FModal>

    <FModal
      v-model:vis="showModalWithTitle"
      title="Modal with Title"
      has-close
    >
      <div class="p-6">
        <p class="text-theme-600 mb-4">
          This modal has a title and close button. The close button triggers the escape event.
        </p>
        <div class="flex gap-2">
          <button
            class="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
            @click="showModalWithTitle = false"
          >
            Save
          </button>
          <button
            class="px-4 py-2 bg-theme-300 text-theme-700 rounded hover:bg-theme-400"
            @click="showModalWithTitle = false"
          >
            Cancel
          </button>
        </div>
      </div>
    </FModal>

    <FModal
      v-model:vis="showSlideUpModal"
      title="Slide Up Animation"
      has-close
      transition-mode="slideUp"
    >
      <div class="p-6">
        <p class="text-theme-600 mb-4">
          This modal slides up from the bottom instead of scaling from center.
        </p>
        <button
          class="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
          @click="showSlideUpModal = false"
        >
          Got it!
        </button>
      </div>
    </FModal>
  </div>
</template>
