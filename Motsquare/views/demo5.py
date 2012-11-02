#coding=utf-8

import os
import base64
import hashlib
import StringIO
from django.conf import settings
from django.utils import simplejson
from django.http import HttpResponse



def upload(request):
    buf = StringIO.StringIO()
    print request.POST['value']
    print dir(request.POST['value'])
    buf.write(request.POST['value'])
    buf.seek(0)
    filename = request.POST['name']
    content_type = filename.split('.')[-1]
    content = buf.read()
    content = base64.decodestring(content)
    filename = hashlib.md5(content).hexdigest() + '.' + content_type

    f = open(os.path.join(settings.PROJECT_PATH, 'media/upload/', filename), "wa+")
    f.write(content)
    f.close()


    return HttpResponse(simplejson.dumps({'ok':True}), mimetype="application/json")
    

