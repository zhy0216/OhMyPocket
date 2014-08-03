from django.shortcuts import render
from django.http import Http404
from utils import redis_conn
from article.models import Article

def show_random_article(request):
    articleid = redis_conn.srandmember(Article.ALL_PRIMARY_IDS_KEY)
    article = Article.objects.filter(id=articleid).first()
    if article is None:
        raise Http404

    return render(request, "article/article.html", {
        "article": article,


    })
