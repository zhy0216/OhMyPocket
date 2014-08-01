from django.contrib.auth.models import User 
from .models import Article, UserReadArticle


def user_read_article(user, article):
    if(ariticle is None  or \
        UserReadArticle.objects.filter(user=user, 
                                      article=article).first() != None):
        return

    UserReadArticle.objects.create(user=user, article=article)
    if not article.primary:
        user_read_article(user, article.primary_article)


