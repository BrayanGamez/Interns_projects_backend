const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();
const {controllerPost,
controllerPut} = require('../controllers/scholars');

router.post('/',controllerPost)

router.put('/:id',controllerPut)