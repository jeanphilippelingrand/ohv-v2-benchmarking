const app = require('./app');

try {
	app.listen(3000);
	console.log('app is listening')
} catch(e) {
	console.error('app crashed: ',e);
}