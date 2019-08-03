const axios = require('axios');

const baseURL = 'https://como-fazer-17dde.firebaseio.com/';

const list = async (key) => {
	const content = await axios.get(baseURL + 'categorias.json');
	if (content.data) {
		const objetos = Object.keys(content.data).map((key) => {
			return {
				id: key,
				...content.data[key]
			};
		});
		return objetos;
	}
	return [];
};

const apagar = async (key, id) => {
	await axios.delete(`${baseURL}${key}/${req.params.id}.json`);
	return true;
};

const get = async (key, id) => {
	const content = await axios.get(`${baseURL}${key}/${id}.json`);
	return {
		id: req.params.id,
		...content.data
	};
};

const update = async (key, id, data) => {
	await axios.put(`${baseURL}${key}/${id}.json`, {
		categoria: data
	});
	return true;
};

module.exports = {
	list,
	apagar,
	get,
	update
};
