<template>
  <page-layout>
    <div class="block">
      打开控制台 window.Promise2
    </div>
  </page-layout>
</template>

<script>
export default {
  destroyed() {
    window.Promise2 = undefined
  },
  mounted() {
    const isFunction = fn => typeof fn === 'function'
    const isPromise = promise => promise instanceof Promise2
    const noop = () => {}

    class Promise2 {
      constructor(fn) {
        if (fn && isFunction(fn)) {
          this.STATUS = {
            PENDING: 0,
            RESOLVE: 1,
            REJECT:  2
          }
          this.result
          this.cbs = []
          this.status = this.STATUS.PENDING

          // resolve 在对外使用时 this 指针错误
          this.resolve = this.resolve.bind(this)
          this.done = this.done.bind(this)
          this.then = this.then.bind(this)
          this.catch = this.catch.bind(this)

          setTimeout(() => {
            fn(this.resolve, this.reject)
          }, 0)

        } else {
          throw new Error('a function param is needed by Promise2 constructor')
        }
      }
      resolve(data) {
        try {
          const { cbs, status, STATUS, resolve } = this
          if (status !== STATUS.RESOLVE) {
            this.status = STATUS.RESOLVE
          }
          this.result = data
          if (cbs.length > 0) {
            const cb = cbs.shift()
            const result = cb(data)
            if (isPromise(result)) {
              result.done(res => {
                resolve(res)
              })
            } else {
              resolve(result || null)
            }
          } else {
            if (this.doneCB) {
              this.doneCB(this.result)
              delete this.doneCB
            }
          }
        } catch(err) {
          this.reject(err)
        }
      }
      reject(err) {
        this.status = this.STATUS.REJECT
        this.throwError(err)
      }
      then(cb) {
        if (cb && isFunction(cb)) {
          this.cbs.push(cb)
          return this
        } else {
          throw new Error('a function param is needed by Promise2 then method')
        }
      }
      catch(errCapture) {
        if (!this.throwError) {
          this.throwError = errCapture
        }
        return this
      }
      done(cb) {
        this.doneCB = cb
      }
    }

    window.Promise2 = Promise2

    new Promise2((res, rej) => {
      res(1)
    }).then(d1 => {
      return ++d1
    }).then(d2 => {
      return ++d2
    }).then(d3 => {
      return ++d3
    }).then(d4 => {
      return new Promise2((r1, r2) => {
        r1(12312312)
      })
    }).then(d5 => {
      console.log(d5)
    }).then(d6 => {
      console.log(d6)
    }).then(d7 => {
      return new Promise2((r1, r2) => {
        setTimeout(() => {
          r1(100000)
        }, 0)
      })
    }).then(d8 => {
      console.log(d8)
      console.log('ok哟')
    }).catch(err => {
      console.log(err)
    })
  },
}
</script>
