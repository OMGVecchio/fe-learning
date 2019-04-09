<template>
  <div class="block">
    <p>
      接收到 a 的信息是：{{ decodeURIComponent(msg) || '暂无' }}
    </p>
    <p>
      <input v-model="hash" />
      <button @click="sendMsg">发送给 a</button>
    </p>
    <iframe :src="url" style="display: none;" />
  </div>

</template>

<script>
export default {
  data() {
    const originUrl = 'http://zhitou.dev.zbjdev.com/messaging/iframe-hash/c'
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
    sendMsg() {
      this.url = `${this.originUrl}#${this.hash}`
    }
  }
}
</script>

<style>

</style>
