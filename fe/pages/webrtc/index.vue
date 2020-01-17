<template>
  <page-layout>
    <div class="block">
      <ul>
        <li v-for="type in types" :key="type.title">
          <nuxt-link :to="type.href">{{ type.title }}</nuxt-link>
        </li>
      </ul>
    </div>
  </page-layout>
</template>

<script>
export default {
  data() {
    return {
      types: [{
        title: 'Local Peer Connection',
        href: '/webrtc/local'
      }, {
        title: 'Remote Peer Connection',
        href: '/webrtc/remote'
      }]
    }
  }
}
</script>
