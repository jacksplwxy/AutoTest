<template>
  <div class="undolist">
    <div  class="title">
        正在进行
       <span data-test="count" class="count"> {{ list.length }}</span>
    </div>
    <ul class="list">
      <li v-for="(item, index) in list" :key="index" data-test="item" style="display:flex;">
        <p>{{ item }}</p>
        <span
          data-test="delete-button"
          @click="
            () => {
              handleDelete(index);
            }
          "
        >删除</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'UndoList',
  props: ['list'],
  data () {
    return {}
  },
  methods: {
    handleDelete (index) {
      this.$emit('delete', index)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.undolist{
    width 600px
    margin 0 auto
    .title{
        line-height 30px
        font-size 24px
        font-weight bold
        margin 10px 0
        .count{
            float right
            display block
            width 20px
            height 20px
            line-height 20px
            text-align center
            background #e6e6e6
            border-radius 10px
            color #000
            margin-top 5px
            font-size 12px
        }
    }
    .list>li{
        display flex
        justify-content space-between
        border-left 2px solid green
        background #cccccc
        margin-bottom 10px
        padding 10px
    }
}
</style>
