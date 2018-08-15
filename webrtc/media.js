const audio = document.querySelector('#audio')
const video = document.querySelector('#video')
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
const width = canvas.width
const height = canvas.height

let record;
let chunks = [];

navigator.webkitGetUserMedia({
	video: true,
	// audio: true
}, (stream1, stream2) => {
	initRecord(stream1)
	video.srcObject = stream1
	audio.srcObject = stream2
}, (err) => {
	console.log(err)
})

// canvas 动画 video stream
const draw = () => {
	ctx.drawImage(video, 0, 0, 200, 200)
	requestAnimationFrame(draw)
}
draw()

// 摄像
!function() {
	const image = document.querySelector('.capture-img')
	const btn = document.querySelector('.capture-btn')
	btn.addEventListener('click', (e) => {
		image.src = canvas.toDataURL()
	})
}()

// 可以用 css filter，在 video 元素上直接实现过滤效果
// example：filter: blur(3px);filter: grayscale(1);filter: invert(1);filter: sepia(1);
// 图片 invert 转换
!function() {
	const image = document.querySelector('.invert-img')
	const btn = document.querySelector('.invert-btn')
	btn.addEventListener('click', () => {
		const imageData = ctx.getImageData(0, 0, width, height)
		let data = imageData.data;
		for (var i = 0; i < data.length; i += 4) {
			data[i]     = 225 - data[i];     // red
			data[i + 1] = 225 - data[i + 1]; // green
			data[i + 2] = 225 - data[i + 2]; // blue
		}
		ctx.putImageData(imageData, 0, 0)
		image.src = canvas.toDataURL()
	})
}()

// 图片 grayscale 转换
!function() {
	const image = document.querySelector('.grayscale-img')
	const btn = document.querySelector('.grayscale-btn')
	btn.addEventListener('click', () => {
		const imageData = ctx.getImageData(0, 0, width, height)
		let data = imageData.data;
		for (var i = 0; i < data.length; i += 4) {
			var avg = (data[i] + data[i +1] + data[i +2]) / 3;
			data[i]     = avg; // red
			data[i + 1] = avg; // green
			data[i + 2] = avg; // blue
		}
		ctx.putImageData(imageData, 0, 0)
		image.src = canvas.toDataURL()
	})
}()

// 像素取色
!function() {
	const cp = document.querySelector('#colorpicker')
	const pick = (e) => {
		const x = e.layerX
		const y = e.layerY
		const pixel = ctx.getImageData(x, y, 1, 1)
		const data = pixel.data
		const rgba = 'rgba(' + data[0] + ',' + data[1] + ',' + data[2] + ',' + (data[3] / 255) + ')'
		cp.style.background = rgba
		cp.textContent = rgba
	}
	canvas.addEventListener('mousemove', pick)
}()

// 录像
!function() {
	const btnStart = document.querySelector('.record-btn1')
	const btnStop  = document.querySelector('.record-btn2')
	btnStart.addEventListener('click', () => {
		if (record.state === 'recording') {
			return
		}
		record.start()
	})
	btnStop.addEventListener('click', () => {
		if (record.state === 'inactive') {
			return
		}
		record.stop()
	})
}()
function initRecord(stream) {
	const video = document.querySelector('.record-video')
	record = new MediaRecorder(stream)
	// stop 后触发
	record.ondataavailable = (e) => {
		chunks.push(e.data)
	}
	record.onstop = () => {
		const blob = new Blob(chunks)
		video.src = URL.createObjectURL(blob)
	}
}
