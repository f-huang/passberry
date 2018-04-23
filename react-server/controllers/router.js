"use strict";

const router = require('express').Router();

router.use('/sign-up', require('./credentials/signUp'));
router.use('/sign-in', require('./credentials/signIn'));

module.exports = router;