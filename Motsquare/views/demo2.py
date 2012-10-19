#coding=utf-8

from uuid import uuid1
from redis import Redis
from django.conf import settings
from django.utils import simplejson
from django.http import HttpResponse


publisher = Redis(host=settings.PUBSUB_REDIS_HOST, port=settings.PUBSUB_REDIS_PORT)

def send(request):
    msg = request.POST['msg']
    if msg:
        send_message(msg)
    return HttpResponse(simplejson.dumps({'ok':True}), mimetype="application/json")
    
def send_message(msg, channel='default'):
    uid = uuid1().hex
    envelope = {'id': uid, 'msg': msg}
    publisher.publish(channel, simplejson.dumps(envelope))


