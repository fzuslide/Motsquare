$(document).ready(function() {

    // Makes sure the dataTransfer information is sent when we
    // Drop the item in the drop box.
    jQuery.event.props.push('dataTransfer');

    var filename = "";
    var z = -40;
    // The number of images to display
    var maxFiles = 1;
    var errMessage = 0;

    // Get all of the data URIs and put them in an array
    var dataArray = [];

    // Bind the drop event to the dropzone.
    $('#drop-files').bind('drop', function(e) {

        // Stop the default action, which is to redirect the page
        // To the drop file

        var files = e.dataTransfer.files;

        // For each file
        $.each(files, function(index, file) {

            if(dataArray.length < maxFiles) {
                // Change position of the upload button so it is centered
                var imageWidths = ((220 + (40 * $('#drop-files > .image').length)) / 2) - 40;
                $('#upload-button').css({'left' : imageWidths+'px', 'display' : 'block'});
            }else{
                return false;
            }

            // Hide  drop info 
            $('#drop-info').css({'display' : 'none'});

            // Start a new instance of FileReader
            var fileReader = new FileReader();

            // When the filereader loads initiate a function
            fileReader.onload = (function(file) {

                return function(e) { 

                    filename = file.name;
                    // Push the data URI into an array
                    dataArray.push({name : file.name, value : this.result});

                    // Move each image 40 more pixels across
                    z = z+40;
                    var image = this.result;


                    // Just some grammatical adjustments
                    $('#upload-info').html( file.name  + " to be uploaded");
                    $('#upload-info').css({"display": "block"});
                }; 

            })(files[index]);

            // For data URI purposes
            fileReader.readAsDataURL(file);

        });


    });

    function restartFiles() {

        // --------------------------------------------------------

        // We need to remove all the images and li elements as
        // appropriate. We'll also make the upload button disappear

        $('#upload-button').hide();
        $('#upload-info').css({"display": "none"});
        $('#drop-files > .image').remove();
        $('#drop-info').html("Drop Files Here");

        // And finally, empty the array/set z to -40
        dataArray.length = 0;
        z = -40;

        return false;
    }

    $('#upload-button .upload').click(function() {

        $('#upload-button').hide();
        $('#upload-info').css({'display' : 'none'});

        $.each(dataArray, function(index, file) {	
            $('#drop-info').html( file.name  + " uploading!");
            $('#drop-info').css({'display' : 'block'});

            $.post('/demo6/upload/', dataArray[index], function(response) {

                if (response.ok){
                    var imgs = response.data.imgs;
                    var width = response.data.size[0];
                    var height = response.data.size[1];
                    var __small_picarea_html = '';
                    backGrounds = imgs;
                for (var i=0;i< imgs.length;i++ ){
                    var index = i + 1
                __small_picarea_html += '<li><a href="javascript:shotImgView(\'' + imgs[i] + '\', \'thumbs' + index +'\', true, true);" id="thumbs' + index + '"><img src="' + imgs[i] + '" style="width:120px; height:90px"/></a></li>'
                };
            $("#thumbs").html(__small_picarea_html);

            canvasWidth = width;
            canvasHeight = height;
            backgroundImage.src = imgs[0];
            shotImgView(imgs[0], 'thumbs1', true, false);
            console.log(backgroundImage.src);
            prepareSimpleColorsCanvas(canvasWidth, canvasHeight);

                }else{
                    alert(response.reason);
                }
                restartFiles();

            });
        });

        return false;
    });

    // Just some styling for the drop file container.
    $('#drop-files').bind('dragenter', function() {
        $(this).css({'box-shadow' : 'inset 0px 0px 20px rgba(0, 0, 0, 0.1)', 'border' : '4px dashed #bb2b2b'});
        return false;
    });

    $('#drop-files').bind('drop', function() {
        $(this).css({'box-shadow' : 'none', 'border' : '4px dashed rgba(0,0,0,0.2)'});
        return false;
    });

    $('#drop-files #upload-button .delete').click(restartFiles);

});

function shotImgView(url, el, sync, refresh) {
    $('#thumbs').find('img').removeClass('focus');
    $("#shot_img").attr("src",url);
    $("#"+el+" img").addClass('focus');

    // disable upload
    $('#upload-content').css({'display' : 'none'});
    $('#draw-content').css({'display' : 'block'});

    // refresh background
    if (refresh){
        backgroundImage.src = url;
        clickX_simpleColors = new Array();
        clickY_simpleColors = new Array();
        clickDrag_simpleColors = new Array();
        clickColor_simpleColors = new Array();
    }


    if (sync) {
        draw_send(true, backGrounds, backgroundImage.src, canvasWidth, canvasHeight, clickX_simpleColors, clickY_simpleColors, clickDrag_simpleColors, clickColor_simpleColors);
    };

};



