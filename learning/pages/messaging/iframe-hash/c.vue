<template>
  <div>
    无需UI
  </div>
</template>

<script>
export default {
  mounted() {
    window.addEventListener('hashchange', () => {
      const msg = window.location.hash.split('#')[1] || ''
      const target = window.parent.parent
      const { origin, pathname } = target.location
      const fullPath = `${origin}${pathname}#${msg}`
      target.location.href = fullPath
    })
  }
}
</script>

<style>

</style>
