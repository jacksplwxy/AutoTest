import { shallowMount } from '@vue/test-utils'
import TodoList from '../../TodoList.vue'
import UndoList from '../../components/UndoList.vue'

describe('TodoList 组件', () => {
  it('初始化时，undoList为空', () => {
    const wrapper = shallowMount(TodoList)
    const undoList = wrapper.vm.$data.undoList
    expect(undoList).toEqual([])
  })

  it('监听add事件时，会增加一个内容', () => {
    const wrapper = shallowMount(TodoList)
    wrapper.setData({
      undoList: [{ value: 1, status: 'div' }, { value: 2, status: 'div' }, { value: 3, status: 'div' }]
    })
    wrapper.vm.addUndoItem(4)
    expect(wrapper.vm.$data.undoList).toEqual([{ value: 1, status: 'div' }, { value: 2, status: 'div' }, { value: 3, status: 'div' }, { value: 4, status: 'div' }])
  })

  it('调用UndoList，应该传递list参数', () => {
    const wrapper = shallowMount(TodoList)
    const undoList = wrapper.find(UndoList)
    const list = undoList.props('list')
    expect(list).toBeTruthy()
  })

  it('调用handleItemDelete，UndoList列表内容会减少一个', () => {
    const wrapper = shallowMount(TodoList)
    wrapper.setData({
      undoList: [{ value: 1, status: 'div' }, { value: 2, status: 'div' }, { value: 3, status: 'div' }]
    })
    wrapper.vm.handleItemDelete(1)
    expect(wrapper.vm.$data.undoList).toEqual([{ value: 1, status: 'div' }, { value: 3, status: 'div' }])
  })

  it('调用handleStatusChange，UndoList内容改变', () => {
    const wrapper = shallowMount(TodoList)
    wrapper.setData({
      undoList: [{ value: 1, status: 'div' }, { value: 2, status: 'div' }, { value: 3, status: 'div' }]
    })
    wrapper.vm.changeStatus(1)
    expect(wrapper.vm.$data.undoList).toEqual([{ value: 1, status: 'div' }, { value: 2, status: 'input' }, { value: 3, status: 'div' }])
  })

  it('resetStatus执行时，UndoList内容变化', () => {
    const wrapper = shallowMount(TodoList)
    wrapper.setData({
      undoList: [{ value: 1, status: 'div' }, { value: 2, status: 'input' }, { value: 3, status: 'div' }]
    })
    wrapper.vm.resetStatus()
    expect(wrapper.vm.$data.undoList).toEqual([{ value: 1, status: 'div' }, { value: 2, status: 'div' }, { value: 3, status: 'div' }])
  })

  it('changeItemValue执行时，UndoList内容变化', () => {
    const wrapper = shallowMount(TodoList)
    wrapper.setData({
      undoList: [{ value: 1, status: 'div' }, { value: 2, status: 'input' }, { value: 3, status: 'div' }]
    })
    wrapper.vm.changeItemValue({
      index: 1,
      value: '444'
    })
    expect(wrapper.vm.$data.undoList).toEqual([{ value: 1, status: 'div' }, { value: '444', status: 'div' }, { value: 3, status: 'div' }])
  })
})
