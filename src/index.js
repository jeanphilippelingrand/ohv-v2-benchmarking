const app = require('./app');

try {
	app.listen(3000);
} catch(e) {
	console.error('app crashed: ',e);
}