from django.core.management.base import BaseCommand, CommandError

from utils import redis_conn
from article.models import Article

class Command(BaseCommand):
    help = 'reset redis'
    def handle(self, *args, **options):
        print "in process"
        redis_conn.flushdb()
        for article in Article.objects.only("id").filter(primary=True):
            redis_conn.sadd(Article.ALL_PRIMARY_IDS_KEY, article.id)


        ## to add user read article id list;

        print "done"