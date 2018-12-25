const { Router } = require('express');
const routes = Router();

routes.get('/', (req, res) => {
	fetch( 'http://localhost:3000/api/todos', { method: "GET" } )
    .then( response => response.json() )
    .then( data => res.render("home", {allTodoes: data}) )
    .catch( error => console.log(error) );
})

routes.get('/edit/:id', (req, res) => {
	fetch( `http://localhost:3000/api/todos/${req.params.id}`, { method: "GET" } )
    .then( response => response.json() )
    .then( data => res.render("edit",{todo: data}) )
    .catch( error => console.log(error) );
})

routes.post('/', (req, res) => {
	fetch(`http://localhost:3000/api/todos`,{
    	method: "POST",
    	body: JSON.stringify({ todo: req.body.todo }),
    	headers: {"Content-Type": "application/json"}
    })
    .then(data => res.redirect('/'))
    .catch(error => console.log(error));
})

routes.post('/update/:id', (req, res) => {
	fetch( `http://localhost:3000/api/todos/${req.params.id}`,{
		method: 'PUT',
    	body: JSON.stringify({ todo: req.body.editTodo }),
    	headers: {"Content-Type": "application/json"}
	} )
    .then( data => res.redirect('/') )
    .catch( error => console.log(error) );
})

routes.get('/delete/:id', (req, res) => {
	fetch( `http://localhost:3000/api/todos/${req.params.id}`,{ method: "DELETE" } )
    .then( data => res.redirect('/') )
    .catch( error => console.log(error) )
});

module.exports = routes;