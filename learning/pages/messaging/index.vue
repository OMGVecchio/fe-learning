<template>
  <div class="block">
    <ul>
      <li v-for="item in messageTypes" :key="item.title">
        <a :href="item.url">
          {{ item.title }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messageTypes: [{
        title: '信道通信',
        url: '/messaging/channel-messaging/a'
      }, {
        title: '跨文档通信',
        url: '/messaging/cross-document-messaging/a'
      }, {
        title: 'window-name',
        url: '/messaging/iframe-name/a'
      }]
    }
  }
}
</script>
