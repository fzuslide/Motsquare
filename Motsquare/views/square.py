#coding=utf-8


from django.shortcuts import render_to_response
from django.conf import settings


def square_list(requset):
    return render_to_response('square_list.html')


def demo1(request):
    return render_to_response('demo1.html',{"DEMO1_SERVER_PORT": settings.DEMO1_SERVER_PORT})

def demo2(request):
    return render_to_response('demo2.html',{"DEMO2_SERVER_PORT": settings.DEMO2_SERVER_PORT})

def demo3(request):
    return render_to_response('demo3.html',{"DEMO3_SERVER_PORT": settings.DEMO3_SERVER_PORT})

def demo4(request):
    return render_to_response('demo4.html',)

def demo5(request):
    return render_to_response('demo5.html',)

def demo6(request):
    return render_to_response('demo6.html',{"DEMO6_SERVER_PORT": settings.DEMO6_SERVER_PORT})
