from django.conf.urls import url, patterns


urlpatterns = patterns('',
    url(r'^article/add$', 'api.views.add_article'),
    url(r'^article/random$', 'api.views.random_article'),
    url(r'^article/inbox/$', 'api.views.get_inbox_article'),
    url(r'^article/(\d+)/$', 'api.views.get_article_by_id'),


    url(r'^account/login$', 'account.views.user_login'),
    url(r'^account/check-user-login$', 'account.views.check_user_login'),
    url(r'^account/register$', 'account.views.user_register'),
    url(r'^account/logout$', 'account.views.user_logout'),
)
