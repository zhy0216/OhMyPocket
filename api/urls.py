from django.conf.urls import url, patterns


urlpatterns = patterns('',
    url(r'^article/add$', 'api.views.add_article'),
    url(r'^article/random$', 'api.views.random_article'),
    url(r'^article/(\d+)/$', 'api.views.get_article_by_id'),
)
