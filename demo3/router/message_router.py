#codin=utf-8

import sys
from redis import Redis
import zmq


ROUTER_HOST = sys.argv[1]
ROUTER_PORT = sys.argv[2]
MESSAGER_HOST = sys.argv[3]
MESSAGER_CHANNEL = sys.argv[4]



context = zmq.Context()

sender = context.socket(zmq.PUSH)
sender.bind('tcp://%s:%s'%(ROUTER_HOST, ROUTER_PORT))
