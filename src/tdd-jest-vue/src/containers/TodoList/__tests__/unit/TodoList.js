import { shallowMount } from '@vue/test-utils'
import TodoList from '../../TodoList.vue'
import Header from '../../components/Header.vue'
import UndoList from '../../components/UndoList.vue'

it('TodoItem初始化时，undoList为空', () => {
  const wrapper = shallowMount(TodoList)
  const undoList = wrapper.vm.$data.undoList
  expect(undoList).toEqual([])
})

it('TodoItem监听add事件时，会增加一个内容', () => {
  const wrapper = shallowMount(TodoList)
  wrapper.setData({
    undoList: [1, 2, 3]
  })
  wrapper.vm.addUndoItem(4)
  expect(wrapper.vm.$data.undoList).toEqual([1, 2,3,4])
})

it('TodoList 调用UndoList，应该传递list参数', () => {
  const wrapper = shallowMount(TodoList)
  const undoList = wrapper.find(UndoList)
  const list = undoList.props('list')
  expect(list).toBeTruthy()
})

it('TodoList 调用handleItemDelete，UndoList列表内容会减少一个', () => {
  const wrapper = shallowMount(TodoList)
  wrapper.setData({
    undoList: [1, 2, 3]
  })
  wrapper.vm.handleItemDelete(1)
  expect(wrapper.vm.$data.undoList).toEqual([1, 3])
})