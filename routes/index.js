const { Router } = require('express');

const routes = Router();

const todoes = [];

routes.get('/', (req, res) => {
	req.session.data = todoes
	res.render("home", {allTodoes: todoes})
})

routes.get('/edit/:id', (req, res) => {
	// console.log(req.params);

	let index=-1
	for (let i = 0; i < todoes.length; i++) {
        if (todoes[i].id == req.params.id) {
            index = i;
            break;
        }
    }
    const value = todoes[index].todo
    req.session.data = todoes
    // console.log(todoes)

	res.render("edit",{id: req.params.id, value: value })
})

routes.post('/', (req, res) => {
	req.session.count = (req.session.count || 0) + 1

	todoes.push({id: req.session.count, todo: req.body.todo})
	req.session.data = todoes
	res.render("home", {allTodoes: todoes})

})

routes.post('/update/:id', (req, res) => {
	
	let index = -1;
	console.log(todoes)
	// todoes = req.session.data
    for (let i = 0; i < todoes.length; i++) {
        if (todoes[i].id == req.params.id) {
            index = i;
            break;
        }
    }
    console.log(index)
    if (index >= 0) {
    	let obj = todoes[index]
    	obj.todo = req.body.editTodo
        todoes.splice(index, 1, obj);
        
    }

	res.redirect('/')

})

routes.get('/delete/:id', (req, res) => {
    const { id } = req.params;
    let index = -1;
    for (let i = 0; i < todoes.length; i++) {
        if (todoes[i].id == id) {
            index = i;
            break;
        }
    }
    if (index >= 0) {
        todoes.splice(index, 1);
    }
    req.session.data = todoes
    res.redirect('/')
});

module.exports = routes;