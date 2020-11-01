<template>
  <div class="header">
    <div class="header-content">
      TodoList
      <input class="header-input" type="text " data-test='header-input' v-model="inputValue"
          placeholder="请输入待完成项"
          @keyup.enter="addTodoItem"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {},
  data () {
    return {
      inputValue: ''
    }
  },
  methods: {
    addTodoItem () {
      if (this.inputValue) {
        this.$emit('add', this.inputValue)
        this.inputValue = ''
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
 .header{
   line-height  60px;
   background #ccc;
   .header-content{
     width 600px
     margin 0 auto
     .header-input{
       width 360px
       float right
       line-height 24px
       outline none
       margin-top 18px
     }
   }
 }
</style>
