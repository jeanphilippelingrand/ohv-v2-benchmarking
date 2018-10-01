module.exports.getPersonalizedRecommendations = async function(productId, memberId, weigthPercentage) {

	const { relatedProducts, preferences } = await getLocalDataWithAfterArbitroryTimeout();

	let result = relatedProducts.map(prod => {

		const prefObj = preferences. ( pref => {
			return pref.prefId === prod.prefId;
		});

		const prefScore = prefObj ? prefObj.score : 0;

		return ({
			id: prod.pid,
			score: prod.score * weigthPercentage + prefScore * (1-weigthPercentage)
		});

	});

	// descending sort
	result.sort((prodA, prodB) => (prodB.score - prodA.score));

	return result;

}

function getLocalDataWithAfterArbitroryTimeout(){

	return new Promise((resolve,reject) => {

	const PID_TABLE = require('./PidTable');
	const MID_TABLE = require('./MidTable');

	const relatedProducts = PID_TABLE[1].related;;
	const preferences = MID_TABLE[11].preferences;
	
	setTimeout(function() {
		resolve({
			relatedProducts, preferences
		})
	}, 25);

	})

}
