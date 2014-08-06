from django.core.management.base import BaseCommand, CommandError

from utils import redis_conn

class Command(BaseCommand):
    help = 'start crawle stuff'
    def handle(self, *args, **options):
        ## try http://news.dbanotes.net/

        pass