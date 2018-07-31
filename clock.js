var cnvs, cntxt;
var loadCount=0; // loadされた画像の数
var imagefiles = ['pic/clockmojiban.png','pic/hneedleC71_26.png','pic/mneedleC71_21.png','pic/sneedleC71_16.png'];
var img = new Array(4);

for( var i = 0; i<img.length; i++ ) {
    img[i] = new Image();
}



function update_clock(){
    cntxt.clearRect(0,0,cnvs.width,cnvs.height);
    // cntxt.drawImage(img[4],0,0);
    cntxt.drawImage(img[0],0,0);
    var now = new Date();
    var s = now.getSeconds() + now.getMilliseconds() / 1000;
    var m = now.getMinutes() + s/60;
    var h = now.getHours() + m/60;

    cntxt.save();
    cntxt.translate(320, 240); // setting for hour
    cntxt.rotate(h*Math.PI/6 - Math.PI/2);
    cntxt.drawImage(img[1], -71, -26);
    cntxt.restore();

    cntxt.save();
    cntxt.translate(320, 240); // setting for minute
    cntxt.rotate(m*Math.PI/30 - Math.PI/2);
    cntxt.drawImage(img[2], -71, -21);
    cntxt.restore();

    cntxt.save();
    cntxt.translate(320, 240); // setting for second
    s = Math.floor(s);
    cntxt.rotate(s*Math.PI/30 - Math.PI/2);
    cntxt.drawImage(img[3], -71, -16);
    cntxt.restore();
}

function draw_number(){

    var svg = d3.select("svg")
        .attr("width", 642) 
        .attr("height", 482);

    svg.append("circle")
        .attr("cx",318)
        .attr("cy",238)
        .attr("r",200)
        .attr("fill","transparent")
        .attr("stroke-width",4)
        .attr("stroke","lightgreen");


    var c20 = d3.scale.category20();

    var data = [{x: 398, y:95},{x: 458, y:155},{x: 488, y:245},{x: 458, y:330},{x: 398, y:390},{x: 313, y:416},{x: 225, y:395},{x: 175, y:330},{x: 145, y:245},{x: 160, y:160},{x: 220, y:95}, {x: 308, y:75}];

    svg.selectAll("text")
        .data(data)
        .enter().append("text")
        .attr("x", function(d) { return d.x;})
        .attr("y", function(d) { return d.y;})
        .attr("fill", function(d,i){ return c20(i);})
        .text( function (d,i) { return i+1;})
        

}


function update() {
    update_clock();
    draw_number();
}

function start() {
    setInterval("update();",100);
    update();
}


function init() {
    cnvs = document.getElementById('myCanvas');
    cntxt = cnvs.getContext('2d');


    img[0].onload = function() {
        loadCount++;
        if ( loadCount < img.length ) return;
        start();
    };

    for(var i = 1; i < img.length; i++) {
      img[i].onload = img[0].onload;
    }

    for(var i=0; i < img.length; i++){
      img[i].src = imagefiles[i];
    }

}      
