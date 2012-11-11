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

function draw_send(init, backgrounds, background_src, width, height, x, y, drag, color){
    var draw_data = {msg_type: "Draw",
                     init: init,
                     backgrounds: backgrounds,
                     background_src: background_src,
                     width: width,
                     height: height,
                     x: x,
                     y: y,
                     drag: drag,
                     color: color,
    };
    console.log(draw_data);
    socket.send(draw_data);

};


function sync_draw(obj){
    console.log(obj);
    if ( $("#canvasSimpleColorsDiv").css("display") == 'none'){
        // Init canvas 
        var imgs = obj.backgrounds;
        var width = obj.width;
        var height = obj.height;
        var __small_picarea_html = '';
        for (var i=0;i< imgs.length;i++ ){
            var index = i + 1 
                __small_picarea_html += '<li><a href="javascript:shotImgView(\'' + imgs[i] + '\', \'thumbs' + index +'\', true, true);" id="thumbs' + index + '"><img src="' + imgs[i] + '" style="width:120px; height:90px"/></a></li>'
        };  
        $("#thumbs").html(__small_picarea_html);
        shotImgView(imgs[0], 'thumbs1', false, false);
        canvasWidth = width;
        canvasHeight = height;

        prepareSimpleColorsCanvas(canvasWidth, canvasHeight);
        backgroundImage.src = imgs[0];

    } 


    var old_bacground_src = backgroundImage.src;
    var new_bacground_src = obj.background_src;

    if (old_bacground_src != new_bacground_src){
        backgroundImage.src = obj.background_src;
    };

    backGrounds = obj.backgrounds;

    clickX_simpleColors = obj.x;
    clickY_simpleColors = obj.y;
    clickDrag_simpleColors = obj.drag;
    clickColor_simpleColors = obj.color;
    canvasWidth = obj.width;
    canvasHeight = obj.height;
    redrawSimpleColors();

};
