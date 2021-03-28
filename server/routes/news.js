const express = require('express');
const news = require('../controllers/news.js');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', news.getNews);
router.patch('/:newsId', auth, news.saveNews);



module.exports = router;