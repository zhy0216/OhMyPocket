import time

from django.shortcuts import render
from django.http import Http404
from django.views.decorators.http import require_http_methods
from whoosh import qparser

from article.models import Article
from utils import q, to_json, redis_conn, required_login, get_whoosh_ix
from article.models import (Article, UserArticleRelationship, UserPostArticle, 
                            UserRemoveArticle, UserStarArticle, UserArchiveArticle)


def _add_rs_(user, article, rs):
    pass

@to_json
@required_login
@require_http_methods(["POST"])
def star_article(request, article_id):
    article = Article.objects.get(id=article_id)
    rs, created = UserStarArticle.objects.get_or_create(article=article, user=request.user)
    return {}

@to_json
@required_login
@require_http_methods(["POST"])
def unstar_article(request, article_id):
    article = Article.objects.get(id=article_id)
    rs = UserStarArticle.objects.filter(article=article, user=request.user).first()
    if rs:
        rs.delete()
    return {}

@to_json
@required_login
@require_http_methods(["POST"])
def archive_article(request, article_id):
    user = request.user
    article = Article.objects.get(id=article_id)
    klass_list = [UserPostArticle, UserStarArticle]
    for klass in klass_list:
        rs = klass.get_rs_by_user_article(user, article)
        if rs:
            rs.delete()
    rs, created = UserArchiveArticle.objects.get_or_create(article=article, user=user)
    return {}

@to_json
@required_login
@require_http_methods(["POST"])
def delete_article(request, article_id):
    user = request.user
    article = Article.objects.get(id=article_id)
    for RS in UserArticleRelationship.__subclasses__():
        if RS == UserRemoveArticle:
            continue
        rs = RS.get_rs_by_user_article(user, article)
        if rs:
            rs.delete()
    rs, created = UserRemoveArticle.objects.get_or_create(article=article, user=user)
    return {}

@to_json
def search_article(request):
    start_time = time.time()
    from search.whoosh_schema import ArticleSchema
    query = request.GET.get("q") or ""
    data = {}

    ix = get_whoosh_ix("article", ArticleSchema)
    with ix.searcher() as searcher:
        parser = qparser.QueryParser("content", schema=ix.schema, group=qparser.OrGroup)
        search_expression = parser.parse(query)
        # app.logger.info("search_expression: %s", search_expression)

        results = searcher.search(search_expression, limit=None)


        # result_list = filter(None, [Article.objects.filter(id=r["article_id"]).first() \
                                     # for r in results])
        
        data["articles"] = []
        for r in results:
            data["articles"].append(dict(title=r["title"], id=r["article_id"]))
        data["meta"] = {
            "total_time": time.time() - start_time,
        }

    return data




