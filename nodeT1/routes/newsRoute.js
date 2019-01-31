const NewsService = require('../service/newsService');
let express = require('express');
let router = express.Router();
const newsService = new NewsService();

router.get('/', function (req, res, next) {
    console.log("get")
    newsService.getNews().then(news=>{
        res.render('news', { newsList: news});
    }).catch(err => {
        next(err);
    })
});

router.get('/:id', function (req, res, next) {
    console.log("get ID")
    newsService.findById(req.params.id).then(news => {
        res.render('news', {newsList: [news]});
    }).catch(err => {
        next(err);
    })
});

router.post('/', function (req, res, next) {
    console.log("post")
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

router.put('/:id', function (req, res, next) {
    console.log("put")
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

router.delete('/:id', function (req, res, next) {
    console.log("delete")
    newsService.delete(req.params.id).then(news => {
        newsService.getNews().then(news=>{
            res.render('news', { newsList: news});
        })
    }).catch(err => {
        next(err);
    });
});

module.exports = router;
