const db = require('../model');

module.exports = {
    findArticles: (req, res) => {
        let { query } = req


        db.Article.find(query).sort({data: -1}).then(dbArticles => {
            if(dbArticles.length == 0){
                res.json({
                    success: false,
                    message: 'No articles found by that query'
                })
            } else {
                res.json({
                success: true,
                articles: dbArticles
                })
            }
        })
    },
    saveArticle: (req, res) => {
        const { body } = req

        db.Article.findOneAndUpdate({_id: body.id }, { $set: { saved: true }}, { new: true })
            .then(dbArticle => res.json({
                success: true,
                message: 'dbArticle'
            }).catch(e => res.json({success: false})));
    },
    deleteArticle: (req, res) => {
        const { query } = req

        db.Article.remove({_id: query.id }).then(dbArticle => res.json(dbArticle));
    }
}