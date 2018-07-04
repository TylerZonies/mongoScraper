const db = require('../model');
const scraper = require('../utils/scrape');

module.exports = (req, res) => {
    return scraper(articles => db.Article.create(articles, (e, dbArticles) => {
        if(e){
            res.json({
                success: false,
                message: 'Error Scraping Articles'
            })
        }
        if(dbArticles.length == 0){
            res.json({
                success: true,
                message: 'No new articles'
            })
        }else{
            res.json({
                success: true,
                message: `${dbArticles.length} new articles added`
            })
        }
    }))
}