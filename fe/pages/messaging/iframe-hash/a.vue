<template>
  <page-layout :back="2">
    <div class="block">
      <p>
        从 b 收到的消息是：{{ decodeURIComponent(msg) || '暂无' }}
      </p>
      <p>
        <input type="text" v-model="hash">
        <button @click="changeHash">切换 hash</button>
      </p>
      <iframe :src="url" ref="iframe" />
    </div>
  </page-layout>
</template>

<script>
export default {
  data() {
    const originUrl = `${this.$crossDomain}/messaging/iframe-hash/b`
    return {
      hash: '',
      msg: '',
      originUrl,
      url: originUrl
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
      this.msg = window.location.hash.split('#')[1] || ''
    })
  },
  methods: {
    changeHash() {
      this.url = `${this.originUrl}#${this.hash}`
    }
  }
}
</script>

<style>

</style>
