var cheerio = require('cheerio');
var request = require('request');

module.exports = (cb) => {
    request.get('https://www.nytimes.com', (e, res, html) => {
        const $ = cheerio.load(html);

        const articles = []
        $('article.story').each((i, element) => {
            const headlineDiv = $(element).children('.story-heading');

            const url = $(headlineDiv).children('a').attr('href');

            const headline = $(headlineDiv).children('a').text().trim();
            
            const summary = $(element).children('p.summary').text().trim();

            const article = {
                headline,
                url,
                summary
            }

            if(article.headline && article.url && article.summary){
                articles.push(article);
            }   
        })
        cb(articles)
    })
}