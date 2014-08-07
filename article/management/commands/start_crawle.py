from django.core.management.base import BaseCommand, CommandError
from pyquery import PyQuery as pq

from utils import redis_conn
from utils import q
from article.models import Article, UserPostArticle
from django.contrib.auth.models import User

class Command(BaseCommand):
    help = 'start crawle stuff'
    def handle(self, *args, **options):
        machine = User.objects.filter().first()

        ## try http://news.dbanotes.net/
        d = pq(url="http://news.dbanotes.net/")
        for element in d(".title a"):
            url = pq(element).attr("href")
            article, _ = Article.objects.get_or_create(original_url=url)
            upa, created = UserPostArticle.objects.get_or_create(article=article, user=machine)
            # post process in rq worker
            if created:
                q.enqueue(upa.defer_process)

