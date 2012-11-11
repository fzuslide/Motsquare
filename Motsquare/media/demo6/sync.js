function message(obj){
    var el = document.createElement('p');
    if ('announcement' in obj) el.innerHTML = '<em>' + esc(obj.announcement) + '</em>';
    else if ('content' in obj) el.innerHTML = '<b>' + esc(obj.content[0]) + ':</b> ' + esc(obj.content[1]);
    document.getElementById('chat').appendChild(el);
    document.getElementById('chat').scrollTop = 1000000;
}
 

function send(){
    var val = document.getElementById('text').value;
    chat_data = {'msg_type': 'Chat', content:  val }
    socket.send(chat_data);
    message({ content: ['you', val] });

    document.getElementById('text').value = '';
}


function esc(msg){
    return String(msg).replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

function draw_send(background_src, width, height, x, y, drag, color){
    var draw_data = {msg_type: "Draw",
                     background_src: background_src,
                     width: width,
                     height: height,
                     x: x,
                     y: y,
                     drag: drag,
                     color: color,
    };
    socket.send(draw_data);

};


function sync_draw(obj){
};
