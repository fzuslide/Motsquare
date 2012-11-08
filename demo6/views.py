#coding=utf-8

import time
from redis import Redis

from gevent.greenlet import Greenlet
from django.http import HttpResponse
from django.utils import simplejson


buffer = []

class Subscriber(object):
    def __init__(self):
        self.red = Redis(host='127.0.0.1', port=6379)
        self.client = self.red.pubsub()

    def subscribe(self, channel):
        self.client.subscribe(channel)

    def listen(self):
        return self.client.listen()


def socketio(request):
    socketio = request.environ['socketio']
    subscriber = Subscriber()
    if socketio.on_connect():
        socketio.send({'buffer': buffer})
        socketio.broadcast({'announcement': socketio.session.session_id + ' connected'})
    
    is_connected = True
    while is_connected:
        try:
            subscriber.subscribe('ch:demo6')
            for msg in subscriber.listen():
                if not socketio.connected():
                    is_connected = False
                else:
                    data = msg.get('data')
                    if data and isinstance(data, str):
                        envelope = simplejson.loads(data)
                        socketio.send({'message': envelope})
        except Exceptoin,e :
            pass

        time.sleep(10)
        if not is_connected:
            socketio.broadcast({'announcement': socketio.session.session_id + ' disconnected'})

    return HttpResponse()
