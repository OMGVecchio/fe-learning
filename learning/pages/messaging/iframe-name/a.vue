<template>
  <div class="block">
    value in b.vue is：{{ result || 'waiting' }}
    <iframe :src="url" width="0" height="0" ref="frame" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: '',
      url: ''
    }
  },
  mounted() {
    const { origin } = window.location
    const CrossDomain = this.$crossDomain
    const iframe = this.$refs.frame
    let hasDone = false
    this.url = `${CrossDomain}/messaging/iframe-name/b`
    iframe.addEventListener('load', () => {
      if (hasDone) {
        this.result = iframe.contentWindow.name
      } else {
        this.url = `${origin}/messaging/iframe-name/c`
        hasDone = true
      }
    })
  }
}
</script>
