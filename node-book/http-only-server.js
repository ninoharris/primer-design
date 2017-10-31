import http from 'http'

const getMethods = obj => console.log(Object.getOwnPropertyNames(obj));

const middleware = (req, res) => {
	let url = req.url

	console.log(url)
	if(url.search('/my/domain/') > -1) {
		res.writeHead(200)
		res.end('In the domain')
	} else {
		res.writeHead(404)
		res.end('Out of domain')
	}
}

const server = http.createServer(middleware)
server.listen(8080)
