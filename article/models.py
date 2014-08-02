from django.db import models
from django.contrib.auth.models import User

'''
primary means whether the article is the 
first similar article added

'''
class Article(models.Model):
    original_url    = models.CharField(max_length=512)
    title           = models.CharField(max_length=128)
    content         = models.TextField(default="")
    finished        = models.BooleanField(default=False)
    user            = models.ForeignKey(User)

    primary         = models.BooleanField(default=False)
    # only exist when primary is false
    primary_article = models.ForeignKey("Article", null=True, blank=True)

    def defer_process(self):
        from readability.readability import Document
        import urllib
        html = urllib.urlopen(self.original_url).read()
        self.content = Document(html).summary()
        self.title = Document(html).short_title()
        self.finished = True
        self.save()



    def to_dict(self):
        return {
            "original_url": self.original_url,
            "title": self.title,
            "content": self.content,
        }

    def __unicode__(self):
        return "<RawArticle: %s>"%self.title

class UserReadArticle(models.Model):
    user            = models.ForeignKey(User)
    article         = models.ForeignKey("Article")

    def __unicode__(self):
        return "<%s -> %s>"%(self.user, self.article)
