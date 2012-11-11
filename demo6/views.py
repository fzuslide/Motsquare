from django.http import HttpResponse

buffer = []

def socketio(request):
    socketio = request.environ['socketio']
    if socketio.on_connect():
        socketio.send({'buffer': buffer})
        socketio.broadcast({'msg_type': 'Chat', 'announcement': socketio.session.session_id + ' connected'})

    while True:
        message = socketio.recv()

        if len(message) == 1:
            message = message[0]
            if message.get("msg_type") == "Draw":
                pass
            elif message.get("msg_type") == "Chat":
                message.update({'content': [socketio.session.session_id, message.get("content")]})
                buffer.append(message)

            if len(buffer) > 15:
                del buffer[0]
                pass
            socketio.broadcast(message)
            #socketio.send(message)
        else:
            if not socketio.connected():
                socketio.broadcast({'msg_type': 'Chat', 'announcement': socketio.session.session_id + ' connected'})
                break

    return HttpResponse()
