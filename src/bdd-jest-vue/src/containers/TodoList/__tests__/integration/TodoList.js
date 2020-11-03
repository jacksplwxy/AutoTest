import { mount } from '@vue/test-utils'
import { findTestWrapper } from '../../../../utils/testUtils'
import TodoList from '../../TodoList.vue'
import store from '../../../../store'
import axios from '../../__mocks__/axios'

beforeEach(() => {
  axios.successs = true
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

it(`
    1. 用户进入页面时，请求远程数据
    2. 列表应该展示远程返回的数据
`, (done) => {
  const wrapper = mount(TodoList, { store })
  wrapper.vm.$nextTick(() => {
    const listItems = findTestWrapper(wrapper, 'list-item')
    expect(listItems.length).toBe(2)
    done()
  })
})

// it(`
// 1. 用户进入页面时，等待 5s，请求远程数据
// 2. 列表应该展示远程返回的数据
// `, (done) => {
//   const wrapper = mount(TodoList, {
//     store
//   })

//   jest.runAllTimers()
//   wrapper.vm.$nextTick(() => {
//     const listItems = findTestWrapper(wrapper, 'list-item')
//     expect(listItems.length).toBe(2)
//     done()
//   })
// })

it(`
    1. 用户进入页面时，请求远程数据失败
    2. 列表应该展示空数据，不应该挂掉
`, (done) => {
  axios.successs = false // 返回失败时
  const wrapper = mount(TodoList, { store })

  wrapper.vm.$nextTick(() => {
    const listItems = findTestWrapper(wrapper, 'list-item')
    expect(listItems.length).toBe(0)
    done()
  })
})
