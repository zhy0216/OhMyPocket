from django.conf.urls import patterns, include, url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.contrib import admin
admin.autodiscover()

import settings

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'blue.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    (r'^account/', include('userena.urls')),
    (r'^api/', include('api.urls')),
    url(r'^article/random$', "article.views.show_random_article")

    # url(r'^admin/', include(admin.site.urls)),
)

if settings.DEBUG:
    urlpatterns += staticfiles_urlpatterns()

