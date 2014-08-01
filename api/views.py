from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from article.models import Article


@login_required
def add_article(request):
    url = request.GET("url") or None
    if(url is None):
        pass

    article = Article.objects.create(url=url, user=user)

    # post process in rq worker

    # TODO: need to_json decorator
    return {"ok": True}

@login_required
def random_article(request):
    ''' put all primary article id to the redis
        redis[all] = set(1,2,3)
        put all user read in redis
        redis[user] = set(1,2, 3)
        
    '''

    pass

@login_required
def get_article_by_id(request, articleid):
    article = Article.objects.filter(id=articleid).first()
    if article is None:
        pass

    return article.to_dict()





