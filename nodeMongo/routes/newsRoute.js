const NewsService = require('../service/newsService');
let express = require('express');
let router = express.Router();
let logHelp = require('../helpers/loginHelper');
const newsService = new NewsService();

router.get('/', function (req, res, next) {
    newsService.getNews().then(news=>{
        res.render('news', { newsList: news});
    }).catch(err => {
        next(err);
    })
});

router.get('/:id', function (req, res, next) {
    newsService.findById(req.params.id).then(news => {
        res.render('news', {newsList: [news]});
    }).catch(err => {
        next(err);
    })
});

router.post('/', function (req, res, next) {
    let news = {
        description: req.body.description,
        title: req.body.title,
        author: req.body.author
    };

    newsService.add(news).then(() => {
        newsService.getNews().then(news=>{
            res.render('news', { newsList: news});
        })
    }).catch(err => {
        next(err);
    });
});

router.put('/:id', logHelp.isLoggedIn, function (req, res, next) {
    let news = {
        author: req.body.author,
        title: req.body.title,
        description: req.body.description
    };

    newsService.updateById(req.params.id, news).then(news => {
        newsService.getNews().then(news=>{
            res.render('news', { newsList: news});
        })
    }).catch(err => {
        next(err);
    });
});

router.delete('/:id', logHelp.isLoggedIn, function (req, res, next) {
    newsService.delete(req.params.id).then(news => {
        newsService.getNews().then(news=>{
            res.render('news', { newsList: news});
        })
    }).catch(err => {
        next(err);
    });
});

module.exports = router;