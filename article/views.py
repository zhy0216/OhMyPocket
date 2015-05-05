from django.shortcuts import render
from django.http import Http404
from django.views.decorators.http import require_http_methods
from article.models import Article
from utils import q, to_json, redis_conn, required_login
from article.models import (Article, UserPostArticle, 
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
    article = Article.objects.get(id=article_id)
    rs, created = UserArchiveArticle.objects.get_or_create(article=article, user=request.user)
    return {}



