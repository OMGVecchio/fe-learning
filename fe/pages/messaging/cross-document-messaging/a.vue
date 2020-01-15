<template>
  <page-layout>
    <div class="block">
      <div class="block">
        <p>
          <input type="text" v-model="msg" />
          <button @click="sendMsg">发送</button>
        </p>
        <p>
          // 第一的值是 nuxt 手动触发的 postMessage 么？
        </p>
        <p>
          从 iframe 来的信息是：{{ receiveMsg || '暂无' }}
        </p>
      </div>
      <div class="block">
        <iframe :src="frameUrl" ref="frame" />
      </div>
    </div>
  </page-layout>
</template>

<script>
export default {
  data() {
    return {
      msg: '',
      receiveMsg: '',
      frameUrl: `${this.$crossDomain}/messaging/cross-document-messaging/b`
    }
  },
  mounted() {
    window.addEventListener('message', e => {
      this.receiveMsg = e.data
    })
  },
  methods: {
    sendMsg() {
      this.$refs.frame.contentWindow.postMessage(this.msg, '*')
    }
  }
}
</script>

<style>
.index-page {
  margin-bottom: 20px;
}
</style>
