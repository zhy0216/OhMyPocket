from django.core.management.base import BaseCommand, CommandError

from utils import redis_conn, q
from article.models import Article

class Command(BaseCommand):
    help = 'reindex'
    def handle(self, *args, **options):
        print "in process"
        ## delete the redis key
        redis_conn.delete("RedisStore:article")

        for article in Article.objects.all():
            q.enqueue(article.make_keyword_index)

        print "workers are working on reindexing, type`rqinfo` to check progress"