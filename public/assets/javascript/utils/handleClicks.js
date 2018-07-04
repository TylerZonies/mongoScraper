function saveArticle(event){
    event.preventDefault();
    const articleId = $(this).attr('data-article');
    $.post('/api/articles/save', {id: articleId}, (res) => {
        if (res.success){
            M.toast({html: 'Article saved'})
        } else {
            M.toast({html: 'Error saving article'})
        }
    });
}
function scrapeArticles(event){
    event.preventDefault();
    console.log('pressed')
    $.get('/api/scrape', (data) => {
        M.toast({html: data.message});
        console.log('scraped')
        if(data.success){
            getArticles(false);
        }
    })
}
function handleCommentSubmit(event){
    event.preventDefault();
    console.log(event)
    const articleId = $(this).attr('data-article');
    console.log(`submit article id: ${articleId}`)
    console.log(`input value ${$(`#commentInput-${articleId}`).attr('type')}`)
    console.log($(`#commentInput-${articleId}`).val())
    const comment = $(`#commentInput-${articleId}`).val().trim();
    $.post('/article/comment', {_articleID: articleId, comment: comment}, (data) => {
        if(data.success){
            handleCommentLoad(null, articleId)
        } else {
            M.toast({html: 'Error posting comment.'})
        }
        comment.val('');
    })
}
function handleArticleDelete(event){
    event.preventDefault();
    const articleId = $(this).attr('data-article');
    $.post('/articles/delete', {_id: articleId}, (data) => {
        if(data.success){
            $(`#article-${data.message._id}`).remove();
            M.toast({html: 'Article deleted'});
        } else {
            M.toast({html: 'Error deleting article'});
        }
    })
}
function handleCommentLoad(event, passedId){
    if(event){    
            event.preventDefault();
    }
    let articleId;
    if(passedId){
        articleId = passedId
    } else {
        articleId = $(this).attr('data-article');
    }
    console.log(`open article id: ${articleId}`)
    const commentCollapsible = M.Collapsible.getInstance($(`#commentCollapsible-${articleId}`));
    commentCollapsible.open();
    const commentArea = $(`#commentArea-${articleId}`)
    $.get(`/api/comments?id=${articleId}`, (data) => {
        console.log(`loaded ${data.message.length} comments \n ${data.success}`)
        commentArea.empty();
        if(data.success){
            
            for(let i=0; i<data.message.length; i++){  
                console.log('something')  
                console.log(commentArea);
                const commentText = $('<h2>').addClass('col l6 m6 s6 offset-l3 offset-m3 offset-s3 userCommentText').text(data.message[i].comment);
                const commentTextDiv = $('<div>').addClass('row').append(commentText);
                const commentDate = $('<p>').addClass('col l6 m6 s6 offset-l3 offset-m3 offset-s3 commentDate').text(data.message[i].date);
                const commentDateDiv = $('<div>').addClass('row').append(commentDate);
                const commentDiv = $('<div>').addClass('row userComment z-depth-2').append(commentTextDiv, commentDateDiv);
                commentArea.append(commentDiv);
            }
        } else {
            const errorMessage = $('<p>').addClass('center-align').text('Error loading comments');
            const errorLoad = $('<div>').addClass('row valign-wrapper').append(errorMessage)
            commentArea.append(errorLoad);
        }
        
    })
}