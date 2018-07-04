
function getArticles(saved){

    let url = '/api/articles'
    if(saved){
        url += '?saved=true';
    }
    $.get(url, (data) => {
        
        if(data.success){
            for(let i=0; i<data.articles.length; i++){
                // article row
                const newArticleDiv = $('<div>').addClass('article row z-depth-3').attr('id', `article-${data.articles[i]._id}`);
                const newArticleContent = $('<div>').addClass('col l12 m12 s12');
                // article card contents
                // card header
                const deleteIcon = $('<icon>').addClass('material-icons col l1 s1 m1').text('delete');
                const deleteLink = $('<a>').addClass('col l1 s1 m1 deleteLink').attr({'data-article': data.articles[i]._id, 'href': '#'}).append(deleteIcon);
                const articleHeadline = $('<a>').addClass('articleHeadline col l11 s11 m11').attr('href', data.articles[i].url).append(`<h2 class="headlineText"> ${data.articles[i].headline} </h2>`);
                const cardHeader = $('<div>').addClass('row').append(articleHeadline, deleteLink);
                // card body
                const articleSummary = $('<p>').addClass('articleSummary').text(data.articles[i].summary);
                const cardBody = $('<div>').addClass('row').append(articleSummary);
                // card footer
                // button to open comments for the article
                const commentIcon = $('<icon>').addClass('material-icons').text('chat'); 
                const commentLoadButton = $('<button>').addClass('commentLoadButton waves-effect waves-light btn col l6 m6 s3').attr('data-article', data.articles[i]._id).text('Comments').append(commentIcon);
                // button to save article
                const saveIcon = $('<icon>').addClass('material-icons').text('save');
                const saveButton = $('<button>').addClass('saveButton waves-effect waves-light btn col l6 m6 s3').attr('data-article', data.articles[i]._id).text('Save Article').append(saveIcon);
                const cardFooter = $('<div>').addClass('row').append(commentLoadButton);
                if(!saved){
                    cardFooter.append(saveButton);
                }
                // comment collapsible content 
                const commentInput = $('<input>').addClass('materialize-textarea').attr({'id': `commentInput-${data.articles[i]._id}`, 'type': 'text'})
                const commentSubmitButton = $('<input>').addClass('commentSubmitButton waves-effect waves-light btn').attr({'type': 'submit', 'data-article': data.articles[i]._id}).text('Comment');
                const commentInputDiv = $('<div>').addClass('input-field inline').append(commentSubmitButton, commentInput);
                const commentForm = $('<form>').append(commentInputDiv)
                const commentList = $('<div>').addClass('container').attr('id', `commentArea-${data.articles[i]._id}`).append('<div class="progress"><div class="indeterminate"></div></div>');
                const commentBody = $('<div>').addClass('collapsible-body').append(commentList, commentForm);
                const commentListItem = $('<li>').append(commentBody)         
                const commentCollapsible = $('<ul>').addClass('collapsible').attr('id', `commentCollapsible-${data.articles[i]._id}`).append(commentListItem);
                newArticleContent.append(cardHeader, cardBody, cardFooter, commentCollapsible);
                newArticleDiv.append(newArticleContent);
                $('#articleArea').append(newArticleDiv)
            }
            $('.collapsible').collapsible();
        }
    })
}