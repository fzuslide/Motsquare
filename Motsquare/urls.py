#coding=utf-8

import os

from django.conf.urls.defaults import *
from django.conf.urls import patterns, include, url
from django.conf import settings

from Motsquare.views import square
from Motsquare.views import demo2
from Motsquare.views import demo3
from Motsquare.views import demo5
from Motsquare.views import demo6
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

        (r'^demo2.html', square.demo2),
        (r'^ajax/demo2/', demo2.send),

        (r'^demo3.html', square.demo3),
        (r'^ajax/demo3/', demo3.send),

        (r'^demo4.html', square.demo4),

        (r'^demo5.html', square.demo5),
        (r'^demo5/upload/', demo5.upload),

        (r'^demo6.html', square.demo6),
        (r'^ajax/demo6/', demo6.send),
        (r'^demo6/upload/', demo6.upload),

        )


