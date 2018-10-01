const { Client } = require('pg');

const getProductInfo = async function() {

	const client = new Client()

	await client.connect()

	const queryString = `SELECT * FROM products_info`

	const res = await client.query(queryString);

	await client.end();

	return res.rows;

}


const getArbo = async function() {

	const products = await getProductInfo();

	const arbo = {};
	id=1;
	products.forEach(p => {

		const brand = p.brand;
		const gender = p.gender;
		const category = p.category;

		if(!arbo[brand]) {
			arbo[brand] = {}
		}

		if(!arbo[brand][category]) {
			arbo[brand][category] = {}
		}

	if(!arbo[brand][category][gender]) {
		arbo[brand][category][gender] = { id, products: [] }
		id++
	}

		arbo[brand][category][gender].products.push(p.productID)

	});

	return arbo;

}

const createPref = async function(pref) {
	const client = new Client()
	await client.connect()

	const queryString = `
		INSERT INTO categories (id, name)
		VALUES (${pref.id}, '${pref.brand}:${pref.category}:${pref.gender}')
	`
	const res = await client.query(queryString);
	await client.end();

	return res.rows;
}

const createProducts = async function(data) {
	const client = new Client()
	await client.connect()

	let valuesString = ``;
	data.products.forEach(pid => {
		valuesString += `(${pid}, ${data.categoryId}), `
	})
	valuesString = valuesString.substring(0, valuesString.length - 2)

	const queryString = `
		INSERT INTO products (id, category_id) 
		VALUES ${valuesString}
	`

	const res = await client.query(queryString);

	await client.end();

	return res.rows;

}


const main = async function() {
	arbo = await getArbo();
	for(brand in arbo) {
		for(category in arbo[brand]) {
			for(gender in arbo[brand][category]) {
				const pref = arbo[brand][category][gender];
				await createPref({
					id: pref.id,
					brand, gender, category
				});
				await createProducts({categoryId: pref.id, products: pref.products})
			}
		}
	}
}

main()


