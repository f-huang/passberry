"use strict";

const router = require('express').Router();

router.use('/sign-up', require('./credentials/signUp'));
router.use('/sign-in', require('./credentials/signIn'));
router.use('/admin-add-activity', require('./admin/addProductDescription'));

module.exports = router;