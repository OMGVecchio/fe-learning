<template>
  <page-layout>
    <div class="block">
      <ul>
        <li v-for="item in messageTypes" :key="item.title">
          <nuxt-link :to="item.url">
            {{ item.title }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </page-layout>
</template>

<script>
export default {
  data() {
    const mainHref = '/messaging'
    return {
      messageTypes: [{
        title: '信道通信',
        url: `${mainHref}/channel-messaging/a`
      }, {
        title: '跨文档通信',
        url: `${mainHref}/cross-document-messaging/a`
      }, {
        title: 'window-name',
        url: `${mainHref}/window-name/a`
      }, {
        title: 'iframe-hash',
        url: `${mainHref}/iframe-hash/a`
      }]
    }
  }
}
</script>
