from django.http import HttpResponse
from django.contrib.auth.decorators import login_required


@login_required
def add_article(request):
    pass

@login_required
def random_article(request):
    pass

@login_required
def get_article_by_id(request, articleid):
    pass


