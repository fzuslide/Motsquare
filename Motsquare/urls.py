#coding=utf-8

import os

from django.conf.urls.defaults import *
from django.conf.urls import patterns, include, url
from django.conf import settings

from Motsquare.views import square
# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
        # Examples:
        url(r'^$', square.square_list ),
        url(r'square_list.html', square.square_list),
        (r'^media/(?P<path>.*)$', 'django.views.static.serve',
            {'document_root': os.path.join(settings.PROJECT_PATH, 'media')}),

        # url(r'^Motsquare/', include('Motsquare.foo.urls')),

        # Uncomment the admin/doc line below to enable admin documentation:
        # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

        # Uncomment the next line to enable the admin:
        # url(r'^admin/', include(admin.site.urls)),

        (r'^demo1.html', square.demo1),
        )


