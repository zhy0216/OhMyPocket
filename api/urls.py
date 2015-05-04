from django.conf.urls import url, patterns


urlpatterns = patterns('',
    url(r'^article/add$', 'api.views.add_article'),
    url(r'^article/(\d+)/star$', 'article.views.star_article'),
    url(r'^article/(\d+)/unstar$', 'article.views.unstar_article'),
    url(r'^article/(\d+)/archieve$', 'article.views.archieve_article'),
    url(r'^article/random$', 'api.views.random_article'),
    url(r'^article/inbox/$', 'api.views.get_inbox_article'),
    url(r'^article/star/$', 'api.views.get_star_article'),
    url(r'^article/archieve/$', 'api.views.get_archieve_article'),
    url(r'^article/(\d+)/$', 'api.views.get_article_by_id'),

    url(r'^account/login$', 'account.views.user_login'),
    url(r'^account/check-user-login$', 'account.views.check_user_login'),
    url(r'^account/register$', 'account.views.user_register'),
    url(r'^account/logout$', 'account.views.user_logout'),
)
