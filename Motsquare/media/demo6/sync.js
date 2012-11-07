function message(obj){
    var el = document.createElement('p');
    if ('announcement' in obj) el.innerHTML = '<em>' + esc(obj.announcement) + '</em>';
    else if ('message' in obj) el.innerHTML = '<b>MsgID:' + esc(obj.message.id) + '</b> Content: ' + esc(obj.message.msg);
    document.getElementById('chat').appendChild(el);
    document.getElementById('chat').scrollTop = 1000000;
}

function send(){
    var val = document.getElementById('text').value;
    $.post('ajax/demo6/', {msg_type: "chat", msg: val }, function(response) {
        if (response.ok){
            document.getElementById('text').value = '';
        } else {
            alert('send error');
        }

    });
}

function esc(msg){
    return String(msg).replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

function draw_send(background_src, width, height, x, y, drag, color){
    var send_data = {msg_type: "draw",
                     background_src: background_src,
                     width: width,
                     height: height,
                     x: x,
                     y: y,
                     drag: drag,
                     color: color,
    };
    $.post('ajax/demo6/', send_data, function(response) {
        // send draw info
    });

};

