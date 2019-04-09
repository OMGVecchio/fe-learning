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
        title: 'iframe 跨主域',
        href: '/messaging'
      }]
    }
  }
}
</script>
