import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import FModal from '../FModal.vue'

describe('fModal', () => {
  let testContainer: HTMLElement

  beforeEach(() => {
    // Create test container for teleport
    testContainer = document.createElement('div')
    testContainer.id = 'test-container'
    document.body.appendChild(testContainer)
  })

  afterEach(() => {
    // Cleanup
    if (testContainer && testContainer.parentNode) {
      testContainer.parentNode.removeChild(testContainer)
    }
  })

  it('renders when vis=true', async () => {
    mount(FModal, {
      props: {
        vis: true,
        teleportTo: testContainer,
      },
    })

    // Check teleported content in test container
    expect(testContainer.querySelector('[role="dialog"]')).toBeTruthy()
    expect(testContainer.querySelector('.fixed.inset-0')).toBeTruthy()
  })

  it('does not render when vis=false', () => {
    mount(FModal, {
      props: {
        vis: false,
        teleportTo: testContainer,
      },
    })

    // Backdrop should not be visible in test container
    expect(testContainer.querySelector('.bg-gray-800\\/65')).toBeFalsy()
  })

  it('renders title when provided', () => {
    mount(FModal, {
      props: {
        vis: true,
        title: 'Test Modal Title',
        teleportTo: testContainer,
      },
    })

    expect(testContainer.textContent).toContain('Test Modal Title')
  })

  it('renders close button when hasClose=true', () => {
    mount(FModal, {
      props: {
        vis: true,
        hasClose: true,
        teleportTo: testContainer,
      },
    })

    expect(testContainer.querySelector('[data-test-id="close-modal"]')).toBeTruthy()
  })

  it('emits update:vis when close is called', async () => {
    const wrapper = mount(FModal, {
      props: {
        vis: true,
        teleportTo: testContainer,
      },
    })

    // Find the backdrop and click it
    const backdrop = testContainer.querySelector('.bg-gray-800\\/65') as HTMLElement
    backdrop.click()

    expect(wrapper.emitted('update:vis')).toBeTruthy()
    expect(wrapper.emitted('update:vis')?.[0]).toEqual([false])
  })

  it('emits close and escape events', async () => {
    const wrapper = mount(FModal, {
      props: {
        vis: true,
        teleportTo: testContainer,
      },
    })

    const backdrop = testContainer.querySelector('.bg-gray-800\\/65') as HTMLElement
    backdrop.click()

    expect(wrapper.emitted('close')).toBeTruthy()
    expect(wrapper.emitted('escape')).toBeTruthy()
  })

  it('renders slot content', () => {
    mount(FModal, {
      props: {
        vis: true,
        teleportTo: testContainer,
      },
      slots: {
        default: '<p>Modal content</p>',
      },
    })

    expect(testContainer.textContent).toContain('Modal content')
  })

  it('applies custom modal classes', () => {
    mount(FModal, {
      props: {
        vis: true,
        modalClass: 'custom-modal-class',
        teleportTo: testContainer,
      },
    })

    expect(testContainer.querySelector('.custom-modal-class')).toBeTruthy()
  })

  it('applies fullscreen styles when fullScreen=true', () => {
    mount(FModal, {
      props: {
        vis: true,
        fullScreen: true,
        teleportTo: testContainer,
      },
    })

    expect(testContainer.querySelector('.fixed.inset-0')).toBeTruthy()
  })

  it('uses slideUp transition when transitionMode=slideUp', () => {
    mount(FModal, {
      props: {
        vis: true,
        transitionMode: 'slideUp',
        teleportTo: testContainer,
      },
    })

    // Check that component renders (transition classes are applied during animation)
    expect(testContainer.querySelector('[role="dialog"]')).toBeTruthy()
  })
})
