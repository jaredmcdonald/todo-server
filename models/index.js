module.exports = function (mongoose) {

  var fn = {}

  // models.Todo
	var todoSchema = mongoose.Schema({
	    description: String,
      created: Number,
      lastUpdated: Number,
      completed: Boolean
	})
	fn.Todo = mongoose.model('Todo', todoSchema)

  return fn
}
