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
  computed: {
    upUrlPath() {
      const pathArr = window.location.pathname.split('/')
      pathArr.pop()
      pathArr.pop()
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
