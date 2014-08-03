from django.db import models
from django.contrib.auth.models import User

from utils import redis_conn

'''
primary means whether the article is the 
first similar article added

'''
class Article(models.Model):
    original_url    = models.CharField(max_length=512)
    title           = models.CharField(max_length=128)
    content         = models.TextField(default="")
    finished        = models.BooleanField(default=False)

    primary         = models.BooleanField(default=False)
    # only exist when primary is false
    primary_article = models.ForeignKey("Article", null=True, blank=True)


    ALL_PRIMARY_IDS_KEY = "all-primary-article-id"


    def _catch_image(self):
        # to crawl the image from internet
        # create a thumbnail version

        pass

    def to_dict(self):
        return {
            "original_url": self.original_url,
            "title": self.title,
            "content": self.content,
        }

    def __unicode__(self):
        return "<RawArticle: %s>"%self.title


### user -- article relationship

class UserArticleRelationship(models.Model):
    user            = models.ForeignKey(User)
    article         = models.ForeignKey("Article")

    class Meta:
        abstract = True
        unique_together = ('user', 'article',)

class UserPostArticle(UserArticleRelationship):

    def defer_process(self):
        from readability.readability import Document
        import urllib
        article  = self.article
        if not article.finished:
            html = urllib.urlopen(article.original_url).read()
            article.content = Document(html).summary()
            article.title = Document(html).short_title()
            article.primary = True # TODO
            article.finished = True
            redis_conn.sadd(Article.ALL_PRIMARY_IDS_KEY, self.id)
            article.save()

    def __unicode__(self):
        return "[UserPostArticle: <%s -> %s>]"%(self.user, self.article)


class UserReadArticle(UserArticleRelationship):

    def __unicode__(self):
        return "[UserReadArticle: <%s -> %s>]"%(self.user, self.article)


class UserStarArticle(UserArticleRelationship):

    def __unicode__(self):
        return "[UserStarArticle: <%s -> %s>]"%(self.user, self.article)








