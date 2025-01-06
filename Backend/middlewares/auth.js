exports.findAll = async (req, res) => {
  // ...
};

exports.create = async (req, res) => {
  // ...
};

exports.delete = async (req, res) => {
  // ...
};module.exports = (req, res, next) => {
  // ...
};module.exports = (sequelize, DataTypes) => {
  const Works = sequelize.define(
	"works",
	{
	  // ...
	}
  );
  return Works;
};module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define(
	"categories",
	{
	  // ...
	}
  );
  return Categories;
};const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
	try {
		console.log(req.headers.authorization);
		const token = req.headers.authorization.split(' ')[1]
		const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
		const userId = decodedToken.userId
		req.auth = { userId }
		if (req.body.userId && req.body.userId !== userId) {
			throw 'Invalid user ID'
		} else {
			next()
		}
	} catch {
		res.status(401).json({
			error: new Error('You are not authenticated')
		})
	}
}
