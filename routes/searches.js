const {Router} = require('express');
const {Search} = require('../controllers/searches');

const router = Router();

router.get('/:coleccion/:termino',Search);

module.exports = router;