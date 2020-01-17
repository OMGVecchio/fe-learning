<template>
  <page-layout>
    <div class="block">
      <button @click="checkCall">check ownCall</button>
      <button @click="checkApply">check ownApply</button>
      <button @click="checkBind">check ownBind</button>
    </div>
    <p>result1: {{ result1 }}</p>
    <p>result2: {{ result2 }}</p>
    <p>result3: {{ result3 }}</p>
  </page-layout>
</template>

<script>
export default {
  data() {
    return {
      result1: 'original',
      result2: 'original',
      result3: 'original',
    }
  },
  methods: {
    test() {
      const vm = this
      return function (r2, r3) {
        vm.result1 = this.r1
        vm.result2 = r2
        vm.result3 = r3
      }
    },
    checkCall() {
      const ctx = { r1: 'call' }
      this.test().ownCall(ctx, 2, 3)
    },
    checkApply() {
      const ctx = { r1: 'apply' }
      this.test().ownApply(ctx, [3, 4])
    },
    checkBind() {
      const ctx = { r1: 'bind' }
      this.test().ownBind(ctx, 4)(5)
    },
  },
  mounted() {
    const randomAttr = () => Date.now() + Math.random()
    Function.prototype.ownCall = function(ctx, ...args) {
      const attr = randomAttr()
      ctx[attr] = this
      ctx[attr](...args)
      delete ctx[attr]
    }
    Function.prototype.ownApply = function(ctx, args) {
      if (!args instanceof Array) {
        console.error('second parameter of ownAplly must be array')
      }
      const attr = randomAttr()
      ctx[attr] = this
      ctx[attr](...args)
      delete ctx[attr]
    }
    Function.prototype.ownBind = function(ctx, ...args) {
      const attr = randomAttr()
      ctx[attr] = this
      return function (...args2) {
        ctx[attr](...args, ...args2)
      }
    }
  },
}
</script>
