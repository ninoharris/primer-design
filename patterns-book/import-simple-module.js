var counter = new require('./counter')
console.log(counter.counter)
console.log('Directly editing the module property', ++counter.counter)
console.log(counter.counter)
console.log('Counter.incrememnt() uses the counter variable under file scope (not property)',counter.increment())
console.log(counter.counter)
console.log(counter.increment())
console.log(counter.counter)
console.log(counter.increment())
console.log(counter.counter)