<template>
  <page-layout :back="2">
    <div class="block">
      <iframe :src="bUrl" ref="b" />
      <iframe :src="cUrl" ref="c" />
    </div>
  </page-layout>
</template>

<script>
export default {
  data() {
    return {
      bUrl: `${this.$crossDomain}/messaging/channel-messaging/b`,
      cUrl: `${this.$crossDomain}/messaging/channel-messaging/c`
    }
  },
  mounted() {
    const mc = new MessageChannel()
    const f0 = this.$refs.b.contentWindow
    const f1 = this.$refs.c.contentWindow
    window.addEventListener('load', () => {
      f0.postMessage('initPort', '*', [mc.port1])
      f1.postMessage('initPort', '*', [mc.port2])
    })
  }
}
</script>
