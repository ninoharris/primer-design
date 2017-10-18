// Parent constructor
function Article() {
	this.tags = ['js', 'css']
}

var article = new Article()

// Default classical
function BlogPost() {

}
// BlogPost.prototype = new Article() or!
BlogPost.prototype = article
var blog = new BlogPost()
console.log('blog.tags, is able to access: ', blog.tags, '..... and has own property (duplicated):', blog.hasOwnProperty('tags'))


// Using borrowed constructor
function StaticPage() {
	console.log(this)
	Article.call(this)
	console.log(this)
}
var page = new StaticPage()
console.log('page.tags, is able to access: ', page.tags, '..... and has own property (duplicated):', page.hasOwnProperty('tags'))

// console.log(instanceof page)

console.log('page instanceof StaticPage:', page instanceof StaticPage)
console.log('page instanceof Article:', page instanceof Article)
