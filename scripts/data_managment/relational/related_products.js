const { Client } = require('pg');

const storeItem = async function(item) {
	const client = new Client()
	await client.connect()

	let valuesString = ``;
	item.related_products.forEach(p => {
		valuesString += `(${item.product_id}, ${p.related_product_id}, ${p.score}), `
	})
	valuesString = valuesString.substring(0, valuesString.length - 2)

	const queryString = `
		INSERT INTO related_products (product_id1, product_id2, score)
		VALUES ${valuesString}
	`

	const res = await client.query(queryString);
	await client.end();

	return res.rows;
}


const getAllProducts = async function(pref) {
	const client = new Client()
	await client.connect()

	const queryString = `
		SELECT * FROM products
	`
	const res = await client.query(queryString);
	await client.end();

	return res.rows;
}

const main = async function() {
	const products = await getAllProducts();
	const firstTwoHundred = [];
	for(let i=0; i<199; i++) {
		firstTwoHundred.push({
			related_product_id: products[i].id,
			score: 1
		})
	}

	for(let i=0; i<products.length; i++) {
		console.log('copying')

		await storeItem({
			product_id: products[i].id,
			related_products: firstTwoHundred
		})
	}

}

main()