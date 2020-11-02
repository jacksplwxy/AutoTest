<template>
  <div>
    <Header @add="addUndoItem" />
    <UndoList
      :list="undoList"
      @delete="handleItemDelete"
      @status="changeStatus"
      @reset="resetStatus"
      @change="changeItemValue"
    />
  </div>
</template>

<script>
import Header from './components/Header'
import UndoList from './components/UndoList'
import axios from 'axios'
export default {
  name: 'TodoList',
  components: {
    Header,
    UndoList
  },
  data () {
    return {
      undoList: []
    }
  },
  methods: {
    addUndoItem (inputValue) {
      this.undoList.push({
        value: inputValue,
        status: 'div'
      })
    },
    handleItemDelete (index) {
      this.undoList.splice(index, 1)
    },
    changeStatus (index) {
      this.undoList[index].status = 'input'
    },
    resetStatus () {
      this.undoList.forEach((item) => {
        item.status = 'div'
      })
    },
    changeItemValue (obj) {
      // const tempArr = [...this.undoList]
      // tempArr[obj.index] = {
      //   value: obj.value,
      //   status: 'div'
      // }
      // this.undoList = tempArr
      this.$set(this.undoList, obj.index, {
        value: obj.value,
        status: 'div'
      })
    }
  },
  mounted () {
    axios.get('/getUndoList.json').then(res => {
      this.undoList = res.data
    }).catch((e) => {})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus"></style>
