var Todo = require('./models/todo');

var Bookshelf = require('bookshelf');


var knex = require('knex')({
	client: 'postgresql',
	connection: {
		host     : '127.0.0.1',
		port     : '5432',
		user     : 'postgres',
		password : 'root',
		database : 'postgres',
    charset  : 'utf8'
    }
});

var bookshelf = require('bookshelf')(knex);

var Todos = bookshelf.Model.extend({
  tableName: 'todos'
});


//Todos.collection().fetch().then(function (collection) {
  //console.log(collection);
//});


module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/todos', function(req, res) {
	console.log("GET Request Called " + knex.select('Name').from('todos'));
	//res.json(Todo['a']);

	Todos.collection().fetch().then(function (collection) {
	 console.log(collection['_byId']);
	 res.json(collection);
	});
	//res.json(Todo['a']);
		// use mongoose to get all todos in the database
		//Todo.find(function(err, todos) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			//if (err)
			//	res.send(err)

			//res.json(todos); // return all todos in JSON format
		//});
	});

	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		Todo.create({
			text : req.body.text,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});

	});

	// delete a todo
	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};
