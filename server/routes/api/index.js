const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const investmentRoutes = require('./investment-routes.js');

router.use('/user', userRoutes);
router.use('/investment', investmentRoutes);

module.exports = router;
