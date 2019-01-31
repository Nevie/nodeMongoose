let News = require('../models/News');

class NewsService {
    getNews() {
        return new Promise((resolve, reject) =>
            News.find({}, (err, news) => {
                if (err) reject(err);
                resolve(news)
            })
        )
    }

    findById(id) {
        return new Promise((resolve, reject) =>
            News.findById(id, (err, news) => {
                if (err) reject(err);
                resolve(news)
            })
        )
    }

    updateById(id, news) {
        return new Promise((resolve, reject) =>
            News.findByIdAndUpdate(id,news, (err, news) => {
                if (err) reject(err);
                resolve(news)
            })
        )
    }

    add(news) {
        return new Promise((resolve, reject) =>
            News.create(news, (err, news)=> {
                if (err) reject(err);
                resolve(news);
            })
        )
    }

    delete(id) {
        return new Promise((resolve, reject) =>
            News.findByIdAndRemove(id, (err, news) => {
                if (err) reject(err);
                resolve(news)
            })
        )
    }
}

module.exports = NewsService;
