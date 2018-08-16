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
