#coding=utf-8

import os
import glob
import base64
import Image
import hashlib
import StringIO
import commands
from uuid import uuid1
from redis import Redis
from django.conf import settings
from django.utils import simplejson
from django.http import HttpResponse


from utils.DocumentConverter import DocumentConverter


publisher = Redis(host=settings.PUBSUB_REDIS_HOST, port=settings.PUBSUB_REDIS_PORT)

def send(request):
    args = request.POST
    msg_info = {}
    if args.get("msg_type") == "draw":
        for k in args.keys():
            if k.endswith('[]'):
                msg_info[k.replace('[]', '')] = args.getlist(k)
            else:
                msg_info[k] = args.get(k)
    else:
        msg_info['msg'] = args.get['msg']

    if msg_info:
        send_message(msg_info)
    return HttpResponse(simplejson.dumps({'ok':True}), mimetype="application/json")
    
def send_message(msg_info, channel='ch:demo6'):
    uid = uuid1().hex
    envelope = {'id': uid, 'msg_type': msg_info.pop('msg_type', ''), 'data': msg_info}
    publisher.publish(channel, simplejson.dumps(envelope))


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
    file_hash = hashlib.md5(content).hexdigest() 
    origin_filename = file_hash + '.' + content_type

    try:
        save_path = os.path.join(settings.PROJECT_PATH, 'media/upload/%d/'% (int(file_hash, 16) %1000))
        if not os.path.isdir(save_path):
            os.makedirs(save_path)
    except :
        import traceback; traceback.print_exc()
    f = open(os.path.join(save_path, origin_filename), "wa+")
    f.write(content)
    f.close()

    # conver to pdf
    if not origin_filename.endswith('pdf'):
        # Requirement : soffice "-accept=socket,port=2002;urp;"
        try:
            converter = DocumentConverter()    
            converter.convert(os.path.join(save_path, origin_filename),  os.path.join(save_path, file_hash + '.pdf'))
        except :
            return HttpResponse(simplejson.dumps({'ok':False, 'reason': "Convert error!"}), mimetype="application/json")

    

    commands.getoutput("convert %s %s" % (os.path.join(save_path, file_hash + '.pdf'),  os.path.join(save_path, file_hash + '.png')) )
    pngs = glob.glob(os.path.join(save_path, file_hash + "*.png"))
    first_png = Image.open(pngs[0])
    size = first_png.size
    if pngs:
        pngs = map(lambda x:'upload/%s/' %(int(file_hash, 16) % 1000) + x.split('/')[-1], pngs)
        pngs.sort()
        return HttpResponse(simplejson.dumps({'ok':True,
                                              'data': {"imgs":pngs,
                                                       "size": size}}), mimetype="application/json")
    
    return HttpResponse(simplejson.dumps({'ok':False, 'reason': "Convert error!"}), mimetype="application/json")

