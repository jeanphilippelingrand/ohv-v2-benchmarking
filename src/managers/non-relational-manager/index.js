var AWS = require('aws-sdk');
var DynamoDB = require('aws-sdk/clients/DynamoDB');

const pidTableName = '';
const midTableName = '';
const credentials = {
	accessKeyId: '',
	secretAccessKey: ''
}

module.exports.getPersonalizedRecommendations = async function(productId, memberId, weigthPercentage) {

	const clientConfig = {
		credentials: credentials,
		region: 'us-west2'
	};

	const client = new DynamoDB(clientConfig);

	const relatedProductQueryInput = {
		Key: {
			product_id: {
				N: productId
			}
		},
		TableName: pidTableName
	};

	const memberPreferencesQueryInput = {
		Key: {
			member_id: {
				N: memberId
			}
		},
		TableName: midTableName
	};

	r = await Promise.all(getItemPromisified(relatedProductQueryInput), getItemPromisified(memberPreferencesQueryInput))

	const relatedProducts = r[0].related_products;
	const preferences = r[1].preferences;

	let result = relatedProducts.map(prod => {

		const prefObj = preferences.find( pref => {
			return pref.prefId === prod.prefId;
		});

		const prefScore = prefObj ? prefObj.score : 0;

		return ({
			id: prod.pid,
			score: prod.score * weigthPercentage + prefScore * (1-weigthPercentage),
		});

	});

	result.sort((prodA, prodB) => (prodB.score - prodA.score));

	return result;

}

// just a helper function to get a dynamodb item incapsulated in a promise
function getItemPromisified(queryInput){

	return new Promise((resolve, reject) => {

		this.client.getItem(queryInput, (err, data) => {

			if (err != null) {

				reject (err);

				return;
			}

			resolve(data);

			return;

		});

	});

}
