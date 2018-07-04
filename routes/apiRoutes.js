const mongoose = require('mongoose');
const controller = require('../controller');

module.exports = (app) => {
    app.get('/api/articles', controller.Articles.findArticles);
    app.get('/api/comments', controller.Comments.find);
    app.get('/api/scrape', controller.getArticles);
    app.post('/api/articles/save', controller.Articles.saveArticle);
    app.post('/api/articles/delete', controller.Articles.deleteArticle);
    app.post('/article/comment', controller.Comments.addComment);
    app.post('/api/comments/delete', controller.Comments.delete);
}