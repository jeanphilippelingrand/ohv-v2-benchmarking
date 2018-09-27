const { Client } = require('pg');

module.exports.getPersonalizedRecommendations = async function(productId, memberId, weigthPercentage) {

	const client = new Client()

	await client.connect()

	const queryString = `
		SELECT  
			rp.product_id2 id,
			(${weigthPercentage} * rp.score + ${1-weigthPercentage} * pc.score) score
		FROM
			related_products rp
		JOIN products p ON p.id = rp.product_id2
		JOIN prefered_categories pc ON pc.category_id = p.category_id 
		WHERE pc.member_id = ${memberId}
		AND rp.product_id1 = ${productId}
		ORDER BY score DESC
	`

	const res = await client.query(queryString);

	await client.end();

	return res.rows;

}