var express = require('express');
var app = express();

const managers = {
	'relational': require('./managers/relational-manager'),
	'non-relational': require('./managers/non-relational-manager'),
	'local': require('./managers/local-manager')
};

app.get('/:manager', async function(req, res){
  const result = await managers[req.params.manager].getPersonalizedRecommendations(1,1,0.5);
  res.json(result);
});

module.exports = app;
