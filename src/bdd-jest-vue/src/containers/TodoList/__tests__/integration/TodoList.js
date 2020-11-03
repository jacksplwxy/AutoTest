import { mount } from '@vue/test-utils'
import { findTestWrapper } from '../../../../utils/testUtils'
import TodoList from '../../TodoList.vue'
import store from '../../../../store'

beforeEach(() => {
  jest.useFakeTimers()
})

it(`
1、用户会在header输入框输入内容
2、用户会点击回车按钮
3、列表项应该增加用户输入内容的列表项
`, () => {
  const wrapper = mount(TodoList, { store })
  const inputs = findTestWrapper(wrapper, 'header-input')
  const inputElem = inputs.at(0)
  const content = 'jacksplwxy'
  inputElem.setValue(content)
  inputElem.trigger('keyup.enter')

  const listItems = findTestWrapper(wrapper, 'list-item')
  expect(listItems.length).toBe(1)
  expect(listItems.at(0).text()).toContain(content)
})

// it(`
//     1. 用户进入页面时，请求远程数据
//     2. 列表应该展示远程返回的数据
// `, () => {
//   const wrapper = mount(TodoList, { store })
//   wrapper.vm.$nextTick(() => {
//     const listItems = findTestWrapper(wrapper, 'list-item')
//     expect(listItems.length).toBe(2)
//   })
// })

it(`
1. 用户进入页面时，等待 5s，请求远程数据
2. 列表应该展示远程返回的数据
`, () => {
  const wrapper = mount(TodoList, {
    store
  })
  
  jest.runAllTimers()
  wrapper.vm.$nextTick(() => {
    const listItems = findTestWrapper(wrapper, 'list-item')
    expect(listItems.length).toBe(2)
  })

})
