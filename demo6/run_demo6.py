#!/usr/bin/env python


#!/usr/bin/env python
from gevent import monkey
#from socketio_021 import SocketIOServer
from socketio import SocketIOServer
import django.core.handlers.wsgi
import os
import sys

# import the django settings to get the PROJECT_ROOT
import settings

# use gevent to patch the standard lib to get async support
monkey.patch_all()

PORT = 15006
os.environ['DJANGO_SETTINGS_MODULE'] = 'settings'
application = django.core.handlers.wsgi.WSGIHandler()

# add our project directory to the path

if __name__ == '__main__':
    print('Listening on http://127.0.0.1:%s' % PORT)
    # Start up SocketIOServer, a gevent-pywsgi server which maps the url '/socket.io'
    SocketIOServer(('', PORT), application, resource="socket.io").serve_forever()

