<template>
  <module-layout>
    <div class="block">
      <div class="wrap">
        <div class="panel"></div>
        <div class="panel"></div>
        <div class="panel"></div>
      </div>
      <img src="http://via.placeholder.com/355x150/f10000/000000" alt="占位符" class="placeholder">
    </div>
  </module-layout>
</template>

<script>
export default {
  mounted() {
    !function flexible () {
      const html = document.documentElement
      const dpr = devicePixelRatio
      const setMeta = () => {
        const meta = document.createElement('meta')
        meta.setAttribute('name', 'viewport')
        meta.setAttribute('content', `width=device-width,initial-scale=1.0`)
        document.head.appendChild(meta)
      }
      const isIOS = () => {
        return (/iphone/ig).test(navigator.appVersion)
      }
      const getScale = () => {
        if (isIOS()) {
          if (dpr >= 3) {
            return 1/3
          } else if (dpr >=2) {
            return 1/2
          } else {
            return 1
          }
        } else {
          return 1
        }
      }
      const changeFontsize = () => {
        const { clientWidth } = html
        html.style.fontSize = clientWidth / 7.5 + 'px'
      }
      window.onresize = () => {
        changeFontsize()
      }
      setMeta()
      changeFontsize()
    }()
  },
}
</script>

<style lang="less" scoped>
  @baseDesign: 100;

  .px2rem(@n, @d) {
    @{n}: @d / @baseDesign * 1rem;
  }

  html {
    font-size: 100px;
  }
  body {
    margin: 0;
  }
  .wrap {
    clear: both;
  }
  .panel {
    float: left;
    .px2rem(width, 250);
    .px2rem(height, 250);
    background-color: skyblue;
    &:nth-of-type(2) {
      background-color: blueviolet;
    }
    &:nth-of-type(3) {
      background-color: salmon;
    }
  }
  .placeholder {
    .px2rem(width, 355);
    .px2rem(height, 150);
  }
</style>
