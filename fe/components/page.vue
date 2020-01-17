<template>
  <div class="page-demo block">
    <nuxt-link :to="upUrlPath">
      返回上一级
    </nuxt-link>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    back: {
      type: Number,
      default: 1
    }
  },
  computed: {
    upUrlPath() {
      const pathArr = location.pathname.split('/')
      let count = this.back
      while (count > 0) {
        pathArr.pop()
        count--
      }
      if (pathArr.length === 1) return '/'
      return pathArr.join('/')
    }
  }
}
</script>

<style scoped>
a {
  font-size: 20px;
}
</style>
