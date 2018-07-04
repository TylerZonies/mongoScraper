const db = require('../model');

module.exports = {
    addComment: (req, res) => {
        const { body } = req
        db.Comment.create(body, (e, dbComment) => {
            if(e) {
                console.log(e)
                return res.json({
                    success: false,
                })
            };
            res.json({
                success: true,
                message: dbComment
            });
        })
    },
    find: (req, res) => {
        const { query } = req

        db.Comment.find({ _articleID: query.id }).then(dbComment => {
            res.json({
                success: true,
                message: dbComment
            }).catch(e => {
                if(e) console.log(`Error loading comments for ${query.id}: \n ${e}`);
                res.json({
                    success: false,
                    message: 'Error loading comments'
                })
            });
        })
    },
    delete: (req, res) => {
        const { query } = req

        db.Comment.remove({ _id: query.id }).then(dbComment => {
            res.json(dbComment);
        })
    }
}