const Koa = require('koa')
const router = require('koa-router')()
const app = new Koa()

const { Nuxt, Builder } = require('nuxt')
const config = require('./fe/nuxt.config')

require('./be/bigpipe')(router)

const start = async () => {
  const nuxt = new Nuxt(config)
  const {
    host = '127.0.0.1',
    port = 3000
  } = nuxt.options.server

  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // TODO 把 koa 流程和 API 搞清楚
  app
    .use(router.routes())
    .use(router.allowedMethods())
    .use(async ctx => {
      // ctx.res.statusCode = 200
      ctx.status = 200
      // Bypass Koa's built-in response handling
      ctx.respond = false
      // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
      ctx.req.ctx = ctx
      nuxt.render(ctx.req, ctx.res)
    })
    // TODO 'localhost' 会报错？
    .listen(port)
}

start()
