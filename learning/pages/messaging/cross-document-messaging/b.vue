<template>
  <div class="block">
    <p>
      <input type="text" v-model="msg" />
      <button @click="sendMsg">发送</button>
    </p>
    <p>
      等待接收的信息：{{ receiveMsg || '暂无' }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '',
      receiveMsg: ''
    }
  },
  mounted() {
    window.addEventListener('message', e => {
      this.receiveMsg = e.data
    })
  },
  methods: {
    sendMsg() {
      window.parent.postMessage(this.msg, '*')
    }
  }
}
</script>
