<template>
  <page-layout>
    <div class="block">
      <div class="wrap">
        <div class="panel"></div>
        <div class="panel"></div>
        <div class="panel"></div>
      </div>
      <img :src="$getImage(355, 150)" alt="占位符" class="placeholder">
    </div>
  </page-layout>
</template>

<script>
/*
 * 第一种方式(类vw)：
 * 设计稿默认为 750px 尺寸；页面宽度分成 100 份，每一份为 1rem
 * 假设一个元素在设计稿的宽为 W，则换算成 rem 为 W/750*100=W/7.5
 * 现在需要解决的问题是如何保证每一份的大小为 1rem(其实就是vw)：假设当前页面宽度为 PW，保持 html.fontSize=PW/100
 */

/*
 * 第二种方式：
 * 设计稿默认为 750px 尺寸；html.fontSize 初始大小为 100px
 * 假设一个元素在设计稿的宽为 W，则换算成 rem 为 W*1/100=W/100
 * 假设当前页面宽度为 PW，则元素需要放大 PW/750 倍
 * 所以要放大 html.fontSize 使 rem 增大从而放大元素，就需要保持 html.fontSize=PW/750*100=PW/7.5
 */

const designWidth = 750 // 设计稿的宽度
const splitCount = 100 // 方法一：屏幕宽度分割的块数
const fontSize = 100 // 方法二：初始字体大小
const TYPE = 1 // 控制器 1：方法一；2：方法二。需要与 less 的 @TYPE 一起修改
export default {
  html: null,
  methods: {
    resetFontsize() {
      this.$options.html.style.fontSize = ''
    },
    changeFontsize() {
      const { html } = this.$options
      const { style, clientWidth } = html
      if (TYPE === 1) {
        style.fontSize = clientWidth / 100 + 'px'
      } else {
        style.fontSize = clientWidth / 750 * 100 + 'px'
      }
    },
    isIOS() {
      return (/iphone/ig).test(navigator.appVersion)
    },
    setFlexible() {
      // TODO 这里没有考虑 dpr 的影响
      const dpr = devicePixelRatio || 1
      const getScale = () => {
        if (this.isIOS()) {
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
      this.changeFontsize()
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.changeFontsize)
    this.resetFontsize()
    this.$options.html = null
  },
  mounted() {
    this.$options.html = document.documentElement
    window.addEventListener('resize', this.changeFontsize)
    this.setFlexible()
  },
}
</script>

<style lang="less" scoped>
  @designWidth: 750px;
  // 方法一
  @splitCount: 100;
  // 方法二
  @fontSize: 100px;
  // 控制器
  @TYPE: 1;


  // 方法一换算
  .px2rem(@n, @d) when (@TYPE = 1) {
    @{n}: @d / @designWidth * @splitCount * 1rem;
  }
  // 方法二换算
  .px2rem(@n, @d) when (@TYPE = 2) {
    @{n}: @d / @fontSize * 1rem;
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
    .px2rem(width, 250);
    .px2rem(height, 250);
  }
</style>
