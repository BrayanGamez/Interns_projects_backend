const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();
const {controllerPost,
controllerPut,controllerDelete} = require('../controllers/scholars');

router.post('/',controllerPost)

router.put('/:id',controllerPut)

router.delete('/:id',controllerDelete)

module.exports = router;