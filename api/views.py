from django.shortcuts import redirect
from django.http import Http404
from django.core.urlresolvers import reverse
from django.http import HttpResponse
from django.views.decorators.http import require_http_methods
from article.models import Article
from utils import q, to_json, redis_conn, required_login
from exceptions import ParseError

@to_json
@required_login
@require_http_methods(["POST"])
def add_article(request):
    url = request.POST.get("url") or None
    if(url is None):
        raise ParseError("require url parameter")

    article = Article(original_url=url, user=request.user)
    article.save()

    # post process in rq worker
    q.enqueue(article.defer_process)

    return {}

@required_login
def random_article(request):
    ''' put all primary article id to the redis
        redis[all] = set(1,2,3)
        put all user read in redis
        redis[user] = set(1,2, 3)
    '''
    article_id = redis_conn.srandmember(Article.ALL_PRIMARY_IDS_KEY) or 0

    return redirect("/api/article/%s/"%article_id)


@to_json
@required_login
def get_article_by_id(request, articleid):
    article = Article.objects.filter(id=articleid).first()
    if article is None:
        raise Http404

    return article.to_dict()





