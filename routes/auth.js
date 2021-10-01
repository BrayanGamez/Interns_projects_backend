
const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();
const controllerPost = require('../controllers/auth.js');


router.post('/',controllerPost);
