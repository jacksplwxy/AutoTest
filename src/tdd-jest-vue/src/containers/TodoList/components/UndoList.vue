<template>
  <div>
    <div data-test="count">{{ list.length }}</div>
    <ul>
      <li v-for="(item, index) in list" :key="index" data-test="item" style="display:flex;">
        {{ item }}
        <span
          data-test="delete-button"
          @click="
            () => {
              handleDelete(index);
            }
          "
        >-</span>
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
<style scoped lang="stylus"></style>
