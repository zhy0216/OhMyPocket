from django.core.management.base import BaseCommand, CommandError

from bs4 import BeautifulSoup
from django.contrib.auth.models import User
from article.models import Article, UserPostArticle
from utils import q

class Command(BaseCommand):
    help = 'import pocket data'

    def add_arguments(self, parser):
        parser.add_argument('pocket_path', type=str)

    def handle(self, *args, **options):
        print "in process"
        file_path = options["pocket_path"]
        soup = None
        with open(file_path, 'r') as pocket_file:
            soup = BeautifulSoup(pocket_file.read())

        user = User.objects.filter().first()
        for link in soup.find_all('a'):
            url = link.get('href')

            article, _ = Article.objects.get_or_create(original_url=url)
            upa, created = UserPostArticle.objects.get_or_create(article=article, user=user)
            # post process in rq worker
            if created:
                q.enqueue(upa.defer_process)

        print "done"
