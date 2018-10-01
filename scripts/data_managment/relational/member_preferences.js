const { Client } = require('pg');

const storeItem = async function(item) {
	const client = new Client()
	await client.connect()

	let valuesString = ``;
	item.prefered_categories.forEach(prefCat => {
		valuesString += `(${item.member_id}, ${prefCat.category_id}, ${prefCat.score}), `
	})
	valuesString = valuesString.substring(0, valuesString.length - 2)

	const queryString = `
		INSERT INTO prefered_categories (member_id, category_id, score)
		VALUES ${valuesString}
	`

	const res = await client.query(queryString);
	await client.end();

	return res.rows;
}


const getAllPreferences = async function(pref) {
	const client = new Client()
	await client.connect()

	const queryString = `
		SELECT * FROM categories
	`
	const res = await client.query(queryString);
	await client.end();

	return res.rows;
}

const main = async function() {
	const preferences = await getAllPreferences();
	const firstPrefs = [];
	for(let i=0; i<=nPrefPerMember; i++) {
		firstPrefs.push({
			category_id: preferences[i].id,
			score: 1
		})
	}

	for(let i=0; i<nMember; i++) {
		console.log('copying')
		await storeItem({
			member_id: i,
			prefered_categories: firstPrefs
		})
	}

}

const nMember = 1000000
const nPrefPerMember = 100

main()
