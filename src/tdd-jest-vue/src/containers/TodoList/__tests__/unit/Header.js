import { shallowMount } from '@vue/test-utils'
import Header from '../../components/Header.vue'
import { findTestWrapper } from '../../../../utils/testUtils'

it('Header样式发生改变做提示', () => {
  const wrapper = shallowMount(Header)
  expect(wrapper).toMatchSnapshot()
})

it('Header包含input框', () => {
  const wrapper = shallowMount(Header)
  const input = findTestWrapper(wrapper, 'input')
  expect(input.exists()).toBe(true)
})

it('Header包含input框初始内容为空', () => {
  const wrapper = shallowMount(Header)
  const inputValue = wrapper.vm.$data.inputValue
  expect(inputValue).toBe('')
})

it('Header包含input框值发生变化，数据应该跟着变化', () => {
  const wrapper = shallowMount(Header)
  const input = findTestWrapper(wrapper, 'input')
  input.setValue('jacksplwxy')
  const inputValue = wrapper.vm.$data.inputValue
  expect(inputValue).toBe('jacksplwxy')
})

it('Header包含input框输入回车，无内容时无反应', () => {
  const wrapper = shallowMount(Header)
  const input = findTestWrapper(wrapper, 'input')
  input.setValue('')
  input.trigger('keyup.enter')
  expect(wrapper.emitted().add).toBeFalsy()
})

it('Header包含input框输入回车，有内容时向外触发事件,同时清空input框', () => {
  const wrapper = shallowMount(Header)
  const input = findTestWrapper(wrapper, 'input')
  input.setValue('jacksplwxy')
  input.trigger('keyup.enter')
  expect(wrapper.emitted().add).toBeTruthy()
  const inputValue = wrapper.vm.$data.inputValue
  expect(inputValue).toBe('')
})
