from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'blue.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    (r'^account/', include('userena.urls')),
    (r'^api/', include('api.urls')),

    # url(r'^admin/', include(admin.site.urls)),
)
