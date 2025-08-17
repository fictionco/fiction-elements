import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import FClose from '../FClose.vue'

describe('fClose', () => {
  it('renders with default props', () => {
    const wrapper = mount(FClose)

    expect(wrapper.find('.close').exists()).toBe(true)
    expect(wrapper.find('.close-line1').exists()).toBe(true)
    expect(wrapper.find('.close-line2').exists()).toBe(true)
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(FClose)

    await wrapper.find('.close').trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.[0][0]).toBeInstanceOf(Event)
  })

  it('applies light color mode classes', () => {
    const wrapper = mount(FClose, {
      props: { colorMode: 'light' },
    })

    expect(wrapper.find('.bg-white').exists()).toBe(true)
  })

  it('applies dark color mode classes', () => {
    const wrapper = mount(FClose, {
      props: { colorMode: 'dark' },
    })

    expect(wrapper.find('.bg-gray-950').exists()).toBe(true)
  })

  it('applies auto color mode classes by default', () => {
    const wrapper = mount(FClose)

    expect(wrapper.find('.bg-gray-950.dark\\:bg-white').exists()).toBe(true)
  })

  it('has correct animations classes', () => {
    const wrapper = mount(FClose)

    const closeElement = wrapper.find('.close')
    expect(closeElement.classes()).toContain('hover:scale-110')
    expect(closeElement.classes()).toContain('active:scale-90')
    expect(closeElement.classes()).toContain('hover:rotate-90')
  })

  it('sets unique ID from shortId', () => {
    const wrapper = mount(FClose)

    // Should have an ID attribute (shortId generates random IDs)
    expect(wrapper.find('.close').attributes('id')).toBeDefined()
  })

  it('becomes in-view after mount', async () => {
    const wrapper = mount(FClose)

    // Wait for setTimeout to complete
    await new Promise((resolve) => setTimeout(resolve, 150))

    expect(wrapper.find('.in-view').exists()).toBe(true)
  })
})
