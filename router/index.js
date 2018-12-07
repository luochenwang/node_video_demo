const express = require('express');
const web_home = require('../controllers')




const router = express.Router();




router.get('/', web_home.index);
router.get('/details/:id', web_home.details);
router.get('/play/:id', web_home.play);



router.post('/addVideo', web_home.addVideo);
router.post('/delectVideo', web_home.delectVideo);









module.exports = router;