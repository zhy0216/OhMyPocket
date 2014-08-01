from django.db import models

'''
primary means whether the article is the 
first similar article added

'''
class Article(models.Model):
    original_url    = models.CharField(max_length=512)
    title           = models.CharField(max_length=128)
    content         = models.TextField()
    primary         = models.BooleanField(default=False)
    # user            = models.ForeignKey("User")

    def __unicode__(self):
        return "<RawArticle: %s>"%self.title
