const http = require('http')

http.createServer((req, res) => {
	res.writeHead(200, {
		'Content-Type': 'text/html'
	})
	let count = 0
	let timer = setInterval(() => {
		res.write(`<div>${count}</div>`)
		res.write(`<script>console.log(${count})</script>`)
		count++
		if (count > 100) {
			clearInterval(timer)
			res.end()
		}
	}, 50)
}).listen(7000)
