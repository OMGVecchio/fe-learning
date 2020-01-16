<template>
  <module-layout>
    <div class="block">
      <div>
        <audio autoplay ref="audio" />
        <video :width="width" :height="height" autoplay ref="video" />
        <canvas
          :width="width"
          :height="height"
          @mousemove="pickRGB"
          ref="canvas"
        />
        <div id="colorpicker" :style="{ backgroundColor: rgba }">{{ rgba }}</div>
      </div>
      <div class="clear">
        <div class="fl">
          <p>
            <button @click="capture">capture</button>
          </p>
          <img :src="captureImage" class="canvas-image"/>
        </div>
        <div class="fl">
          <p>
            <button @click="captureInvert">invert</button>
          </p>
          <img :src="invertImage" class="canvas-image">
        </div>
        <div class="fl">
          <p>
            <button @click="captureGrayscale">grayscale</button>
          </p>
          <img :src="grayscaleImage" class="canvas-image">
        </div>
        <div class="fl">
          <p>
            <button class="record-btn1" @click="startRecord">record start</button>
            <button class="record-btn2" @click="stopRecord">record stop</button>
          </p>
          <video
            class="record-video"
            :width="this.width"
            :height="this.height"
            :src="recordStream"
            autoplay
            loop
          />
        </div>
      </div>
    </div>
  </module-layout>
</template>

<script>
export default {
  drawRAFId: null, // drawCanvas 里 requestAnimationFrame 返回的 ID
  record: null, // 录像 MediaRecorder 的实例
  videoStream: null, // 录像 MediaRecorder 的实例所需的媒体流参数
  data() {
    return {
      width: 200,
      height: 200,
      captureImage: null,
      invertImage: null,
      grayscaleImage: null,
      rgba: "rgba(255,255,255,1)",
      recordStream: null
    }
  },
  methods: {
    drawCanvas() {
      const { canvas } = this.$refs
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      ctx.drawImage(this.$refs.video, 0, 0, 200, 200)
      this.$options.drawRAFId = requestAnimationFrame(this.drawCanvas)
    },
    initCanvas() {
      this.drawCanvas()
    },
    // 纯拍照
    capture() {
      this.captureImage = this.$refs.canvas.toDataURL()
    },
    // 可以用 css filter，在 video 元素上直接实现过滤效果
    // example：filter: blur(3px);filter: grayscale(1);filter: invert(1);filter: sepia(1);
    // 图片 invert 转换
    captureInvert() {
      const { canvas } = this.$refs
      const ctx = canvas.getContext('2d')
      const imageData = ctx.getImageData(0, 0, this.width, this.height)
      const { data } = imageData
      for (let i = 0; i < data.length; i += 4) {
        data[i]     = 225 - data[i]     // red
        data[i + 1] = 225 - data[i + 1] // green
        data[i + 2] = 225 - data[i + 2] // blue
      }
      ctx.putImageData(imageData, 0, 0)
      this.invertImage = canvas.toDataURL()
    },
    // grayscale
    captureGrayscale() {
      const { canvas } = this.$refs
      const ctx = canvas.getContext('2d')
      const imageData = ctx.getImageData(0, 0, this.width, this.height)
      const { data } = imageData
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i +1] + data[i +2]) / 3
        data[i]     = avg // red
        data[i + 1] = avg // green
        data[i + 2] = avg // blue
      }
      ctx.putImageData(imageData, 0, 0)
      this.grayscaleImage = canvas.toDataURL()
    },
    // 选择 RGBA
    pickRGB(e) {
      const { canvas } = this.$refs
      const ctx = canvas.getContext('2d')
      const x = e.layerX
      const y = e.layerY
      const pixel = ctx.getImageData(x, y, 1, 1)
      const data = pixel.data
      const rgba = 'rgba(' + data[0] + ',' + data[1] + ',' + data[2] + ',' + (data[3] / 255) + ')'
      this.rgba = rgba
    },
    // 录像初始化
    initRecord() {
      let chunks = []
      this.$options.record = new MediaRecorder(this.$options.videoStream)
      const { record } = this.$options
      record.ondataavailable = e => {
        chunks.push(e.data)
      }
      record.onstop = () => {
        const blob = new Blob(chunks)
        this.recordStream = URL.createObjectURL(blob)
      }
    },
    // 录像开始
    startRecord() {
      this.initRecord()
      const { record } = this.$options
      if (record.state === 'recording') {
        return
      }
      record.start()
    },
    // 录像结束
    stopRecord() {
      const { record } = this.$options
      if (record.state === 'inactive') {
        return
      }
      record.stop()
    }
  },
  destroyed() {
    cancelAnimationFrame(this.$options.drawRAFId)
    // 手动关闭视频流，否则摄像头会一直处于打开状态
    const { videoStream } = this.$options
    if (!videoStream) return
    videoStream.getTracks().forEach(stream => stream.stop())
  },
  mounted() {
    navigator.mediaDevices.getUserMedia({
      video: true,
      // audio: true
    }).then((videoStream, audioStream) => {
      this.$options.videoStream = videoStream
      // 进入页面，promise 还没执行完就已经又退出页面，导致此时的 video 可能为 undefined
      this.$refs.video && (this.$refs.video.srcObject = videoStream)
      // this.$refs.audio && (this.$refs.audio.srcObject = audioStream)
    }).then(this.initCanvas)
  },
}
</script>

<style style="less" scoped>
.fl {
  float: left;
}
.clear {
  clear: both;
}
.canvas-image {
  width: 200px;
  height: 200px;
}
</style>
