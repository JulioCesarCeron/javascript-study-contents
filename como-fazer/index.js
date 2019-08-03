const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const api = require('./api');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());

const port = process.env.PORT || 3000;
let i = 0;
app.get('/', async (request, response) => {
	const content = await axios.get('https://como-fazer-17dde.firebaseio.com/teste.json');
	response.render('index', { content: content.data });
});

app.get('/categorias/nova', (req, res) => {
	res.render('categorias/nova');
});

app.get('/categorias', async (req, res) => {
	const categorias = await api.list('categorias');
	res.render('categorias/index', { categorias: categorias });
});

app.get('/categorias/excluir/:id', async (req, res) => {
	await api.apagar('categorias', req.params.id);
	res.redirect('/categorias');
});

app.post('/categorias/nova', async (req, res) => {
	await axios.post('https://como-fazer-17dde.firebaseio.com/categorias.json', {
		categoria: req.body.categoria
	});
	res.redirect('/categorias');
});

app.get('/categorias/editar/:id', async (req, res) => {
	const categoria = await api.get('categorias', req.params.id);
	res.render('categorias/editar', {
		categoria: categoria
	});
});

app.post('/categorias/editar/:id', async (req, res) => {
	await api.update('categorias', req.params.id, { categoria: req.body.categoria });
	res.redirect('/categorias');
});

app.listen(port, (err) => {
	if (err) {
		console.log('');
	} else {
		console.log('Server is running on port:', port);
	}
});
