
$('document').ready(() => {

    getArticles();
    $('body').on('click', '.saveButton', saveArticle);
    $('#scrapeBtn').on('click', scrapeArticles);
    $('body').on('click', '.commentSubmitButton', handleCommentSubmit);
    $('body').on('click', '.commentLoadButton', handleCommentLoad);
    $('body').on('click', '.deleteLink', handleArticleDelete);

})