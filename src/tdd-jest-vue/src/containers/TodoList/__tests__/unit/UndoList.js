import { shallowMount } from '@vue/test-utils'
import UndoList from '../../components/UndoList.vue'
import { findTestWrapper } from '../../../../utils/testUtils'

describe('UndoList 组件', () => {
  it('参数为[]，count 值为0，且列表无内容', () => {
    const wrapper = shallowMount(UndoList, {
      propsData: { list: [] }
    })
    const countELem = findTestWrapper(wrapper, 'count')
    const listItems = findTestWrapper(wrapper, 'item')
    expect(countELem.at(0).text()).toEqual('0')
    expect(listItems.length).toEqual(0)
  })

  it('参数为[1,2,3]，count 值为3，且列表有内容,且存在删除按钮', () => {
    const wrapper = shallowMount(UndoList, {
      propsData: { list: [{ value: 1, status: 'div' }, { value: 2, status: 'div' }, { value: 3, status: 'div' }] }
    })
    const countELem = findTestWrapper(wrapper, 'count')
    const listItems = findTestWrapper(wrapper, 'item')
    const deleteButtons = findTestWrapper(wrapper, 'delete-button')
    expect(countELem.at(0).text()).toEqual('3')
    expect(listItems.length).toEqual(3)
    expect(deleteButtons.length).toEqual(3)
  })

  it('删除按钮点击时，向外触发删除事件', () => {
    const wrapper = shallowMount(UndoList, {
      propsData: { list: [{ value: 1, status: 'div' }, { value: 2, status: 'div' }, { value: 3, status: 'div' }] }
    })
    const deleteButton = findTestWrapper(wrapper, 'delete-button').at(1)
    deleteButton.trigger('click')
    expect(wrapper.emitted().delete).toBeTruthy()
    expect(wrapper.emitted().delete[0][0]).toBe(1)
  })

  it('列表项点击时，向外触发status事件', () => {
    const wrapper = shallowMount(UndoList, {
      propsData: { list: [{ value: 1, status: 'div' }, { value: 2, status: 'div' }, { value: 3, status: 'div' }] }
    })
    const deleteButton = findTestWrapper(wrapper, 'item').at(1)
    deleteButton.trigger('click')
    expect(wrapper.emitted().status).toBeTruthy()
    expect(wrapper.emitted().status[0][0]).toBe(1)
  })

  it('列表显示一个输入框，两个正常列表内容', () => {
    const wrapper = shallowMount(UndoList, {
      propsData: { list: [{ value: 1, status: 'div' }, { value: 2, status: 'input' }, { value: 3, status: 'div' }] }
    })
    const input = findTestWrapper(wrapper, 'input')
    expect(input.length).toBe(1)
    expect(input.at(0).element.value).toBe('2')
  })

  it('input失去焦点时 ，向外触发reset事件', () => {
    const wrapper = shallowMount(UndoList, {
      propsData: { list: [{ value: 1, status: 'div' }, { value: 2, status: 'input' }, { value: 3, status: 'div' }] }
    })
    const inputElem = findTestWrapper(wrapper, 'input').at(0)
    inputElem.trigger('blur')
    expect(wrapper.emitted().reset).toBeTruthy()
  })

  it('input变化时 ，向外触发change事件', () => {
    const wrapper = shallowMount(UndoList, {
      propsData: { list: [{ value: 1, status: 'div' }, { value: 2, status: 'input' }, { value: 3, status: 'div' }] }
    })
    const inputElem = findTestWrapper(wrapper, 'input').at(0)
    inputElem.trigger('change')
    expect(wrapper.emitted().change).toBeTruthy()
    expect(wrapper.emitted().change[0][0]).toEqual({
      value: '2',
      index: 1
    })
  })
})
