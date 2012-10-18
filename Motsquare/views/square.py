#coding=utf-8


from django.shortcuts import render_to_response
from django.conf import settings


def square_list(requset):
    return render_to_response('square_list.html')


def demo1(request):
    return render_to_response('demo1.html',{"DEMO1_SERVER_PORT": settings.DEMO1_SERVER_PORT})

