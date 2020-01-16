<template>
  <div class="block">
    <ul>
      <li v-for="module in modules" :key="module.title">
        <nuxt-link :to="module.href">
          {{ module.title }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modules: [{
        title: 'iframe cross-domain',
        href: '/messaging'
      }, {
        title: 'call/apply/bind',
        href: '/context-change'
      }, {
        title: 'Promise2',
        href: '/promise'
      }, {
        title: 'flexible',
        href: '/flexible'
      }, {
        title: 'media',
        href: '/media'
      }, {
        title: 'WebGL',
        href: '/webgl'
      }, {
        title: 'WebRTC',
        href: '/webrtc'
      }]
    }
  }
}
</script>
