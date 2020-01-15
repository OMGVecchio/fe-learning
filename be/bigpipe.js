module.exports = router => router.get('/bigpipe', async ctx => {
  ctx.res.writeHead(200, {
    'Content-Type': 'text/html'
  })
  await new Promise(resolve => {
    let count = 0
    let timer = setInterval(() => {
      ctx.res.write(`<div>${count}</div>`)
      ctx.res.write(`<script>console.log(${count})</script>`)
      count++
      if (count > 100) {
        clearInterval(timer)
        ctx.res.end()
        resolve()
      }
    }, 100)
  })
})
