from django.conf.urls import url, patterns


urlpatterns = patterns('',
    url(r'^$', 'web.views.index_view'),
)