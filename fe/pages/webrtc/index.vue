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
  record: null,
  audioStream: null,
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
    initCanvas() {
      const { canvas } = this.$refs
      const ctx = canvas.getContext('2d')
      // canvas 动画 video stream
      const draw = () => {
        ctx.drawImage(this.$refs.video, 0, 0, 200, 200)
        requestAnimationFrame(draw)
      }
      draw()
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
      const { data } = imageData;
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i +1] + data[i +2]) / 3;
        data[i]     = avg; // red
        data[i + 1] = avg; // green
        data[i + 2] = avg; // blue
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
      this.$options.record = new MediaRecorder(this.$options.audioStream)
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
  mounted() {
    navigator.mediaDevices.getUserMedia({
      video: true,
      // audio: true
    }).then((stream1, stream2) => {
      this.$options.audioStream = stream1
      this.$refs.video.srcObject = stream1
      this.$refs.audio.srcObject = stream2
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
