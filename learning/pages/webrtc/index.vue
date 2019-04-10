<template>
  <module-layout>
    <div class="block">

    </div>
  </module-layout>
</template>

<script>
export default {
  mounted() {
    navigator.webkitGetUserMedia({
      video: true,
      // audio: true
    }, (videoStream, audioStream) => {

    }, err => {
      console.log(err)
    })
  },
}
</script>

<style>

</style>
