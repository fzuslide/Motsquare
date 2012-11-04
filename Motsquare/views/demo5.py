#coding=utf-8

import os
import base64
import hashlib
import StringIO
from django.conf import settings
from django.utils import simplejson
from django.http import HttpResponse



def upload(request):
    # save the origin file
    buf = StringIO.StringIO()
    buf.write(request.POST['value'])
    buf.seek(0)
    origin_filename = request.POST['name']
    content_type = origin_filename.split('.')[-1]
    content = buf.read()
    content = content.split(',')[1]
    content = base64.decodestring(content)
    origin_filename = hashlib.md5(content).hexdigest() + '.' + content_type

    f = open(os.path.join(settings.PROJECT_PATH, 'media/upload/', origin_filename), "wa+")
    f.write(content)
    f.close()
    


    return HttpResponse(simplejson.dumps({'ok':True}), mimetype="application/json")
    

