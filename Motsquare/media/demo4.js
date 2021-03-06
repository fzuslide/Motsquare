// Copyright 2010 William Malone (www.williammalone.com)
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//   http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


var canvas;
var canvasWidth = 500;
var canvasHeight = 300;
var padding = 25;
var lineWidth = 8;
var colorPurple = "#cb3594";
var colorGreen = "#659b41";
var colorYellow = "#ffcf33";
var colorBrown = "#986928";
var outlineImage = new Image();
var crayonImage = new Image();
var markerImage = new Image();
var eraserImage = new Image();
var backgroundImage = new Image();
var clickX = new Array();
var clickY = new Array();
var clickColor = new Array();
var clickTool = new Array();
var clickSize = new Array();
var clickDrag = new Array();
var paint = false;
var curColor = colorPurple;
var curTool = "crayon";
var curSize = "normal";
var mediumStartX = 18;
var mediumStartY = 19;
var mediumImageWidth = 93;
var mediumImageHeight = 46;
var drawingAreaX = 111;
var drawingAreaY = 11;
var drawingAreaWidth = 267;
var drawingAreaHeight = 200;
var toolHotspotStartY = 23;
var toolHotspotHeight = 38;
var sizeHotspotStartY = 157;
var sizeHotspotHeight = 36;
var sizeHotspotWidthObject = new Object();
sizeHotspotWidthObject.huge = 39;
sizeHotspotWidthObject.large = 25;
sizeHotspotWidthObject.normal = 18;
sizeHotspotWidthObject.small = 16;

var totalLoadResources = 8
var curLoadResNum = 0;


var clickX_simpleColors = new Array();
var clickY_simpleColors = new Array();
var clickDrag_simpleColors = new Array();
var clickColor_simpleColors = new Array();
var paint_simpleColors;
var canvas_simpleColors;
var context_simpleColors;
var curColor_simpleColors = colorPurple;



// Calls the redraw function after all neccessary resources are loaded.
//resourceLoaded = function () {
//    redrawSimpleColors();
//},


function prepareSimpleColorsCanvas()
{
    // Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
    var canvasDiv = document.getElementById('canvasSimpleColorsDiv');
    canvas_simpleColors = document.createElement('canvas');
    canvas_simpleColors.setAttribute('width', canvasWidth);
    canvas_simpleColors.setAttribute('height', canvasHeight);
    canvas_simpleColors.setAttribute('id', 'canvasSimpleColors');
    canvasDiv.appendChild(canvas_simpleColors);
    if(typeof G_vmlCanvasManager != 'undefined') {
        canvas_simpleColors = G_vmlCanvasManager.initElement(canvas_simpleColors);
    }
    context_simpleColors = canvas_simpleColors.getContext("2d");

    // Add mouse events
    // ----------------
    $('#canvasSimpleColors').mousedown(function(e)
            {
                // Mouse down location
                var mouseX = e.pageX - this.offsetLeft;
                var mouseY = e.pageY - this.offsetTop;

                paint_simpleColors = true;
                addClickSimpleColors(mouseX, mouseY, false);
                redrawSimpleColors();
            });

    $('#canvasSimpleColors').mousemove(function(e){
        if(paint_simpleColors){
            addClickSimpleColors(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redrawSimpleColors();
        }
    });

    $('#canvasSimpleColors').mouseup(function(e){
        paint_simpleColors = false;
        redrawSimpleColors();
    });

    $('#canvasSimpleColors').mouseleave(function(e){
        paint_simpleColors = false;
    });

    $('#choosePurpleSimpleColors').mousedown(function(e){
        curColor_simpleColors = colorPurple;
    });
    $('#chooseGreenSimpleColors').mousedown(function(e){
        curColor_simpleColors = colorGreen;
    });
    $('#chooseYellowSimpleColors').mousedown(function(e){
        curColor_simpleColors = colorYellow;
    });
    $('#chooseBrownSimpleColors').mousedown(function(e){
        curColor_simpleColors = colorBrown;
    });

    $('#clearCanvasSimpleColors').mousedown(function(e)
            {
                clickX_simpleColors = new Array();
                clickY_simpleColors = new Array();
                clickDrag_simpleColors = new Array();
                clickColor_simpleColors = new Array();
                clearCanvas_simpleColors();
            });


}

function addClickSimpleColors(x, y, dragging)
{
    clickX_simpleColors.push(x);
    clickY_simpleColors.push(y);
    clickDrag_simpleColors.push(dragging);
    clickColor_simpleColors.push(curColor_simpleColors);
}

function clearCanvas_simpleColors()
{
    context_simpleColors.fillStyle = '#ffffff'; // Work around for Chrome
    context_simpleColors.fillRect(0, 0, canvasWidth, canvasHeight); // Fill in the canvas with white
    canvas_simpleColors.width = canvas_simpleColors.width; // clears the canvas 
}

function redrawSimpleColors()
{
    clearCanvas_simpleColors();

    var radius = 5;
    context_simpleColors.lineJoin = "round";
    context_simpleColors.lineWidth = radius;

    //context_simpleColors.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);
    for(var i=0; i < clickX_simpleColors.length; i++)
    {
        context_simpleColors.beginPath();
        if(clickDrag_simpleColors[i] && i){
            context_simpleColors.moveTo(clickX_simpleColors[i-1], clickY_simpleColors[i-1]);
        }else{
            context_simpleColors.moveTo(clickX_simpleColors[i]-1, clickY_simpleColors[i]);
        }
        context_simpleColors.lineTo(clickX_simpleColors[i], clickY_simpleColors[i]);
        context_simpleColors.closePath();
        context_simpleColors.strokeStyle = clickColor_simpleColors[i];
        context_simpleColors.stroke();
    }

}


prepareSimpleColorsCanvas();
