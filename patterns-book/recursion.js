const countdown = num => {
	if(num === 0) return
	console.log(num)
	countdown(num - 1)
	console.log('bam')
}

countdown(10)
