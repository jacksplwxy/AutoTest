import { shallowMount } from '@vue/test-utils'
import TodoList from '../../TodoList.vue'
import Header from '../../components/Header.vue'

it('TodoItem初始化时，undoList为空', () => {
  const wrapper = shallowMount(TodoList)
  const undoList = wrapper.vm.$data.undoList
  expect(undoList).toEqual([])
})

it('TodoItem监听add事件时，会增加一个内容', () => {
  const wrapper = shallowMount(TodoList)
  const header = wrapper.find(Header)
  header.vm.$emit('add', 'jacksplwxy')
  const undoList = wrapper.vm.$data.undoList
  expect(undoList).toEqual(['jacksplwxy'])
})
