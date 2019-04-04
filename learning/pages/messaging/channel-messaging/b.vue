<template>
  <div class="block">
    <p>I'm b</p>
    <p>
      <input type="text" v-model="msg">
      <button @click="sendMsg">send to c</button>
    </p>
    <p>c says：{{ receiveMsg || 'nothing' }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '',
      receiveMsg: '',
      port: null
    }
  },
  mounted() {
    window.addEventListener('message', e => {
      if (e.data === 'initPort') {
        this.port = e.ports[0]
        this.port.onmessage = e => {
          this.receiveMsg = e.data
        }
      }
    })
  },
  methods: {
    sendMsg() {
      if (this.port) {
        this.port.postMessage(this.msg)
      }
    }
  }
}
</script>
