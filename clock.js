var cnvs, cntxt;
var loadCount=0; 
var imagefiles = ['pic/clockmojiban.png','pic/hneedleC71_26.png','pic/mneedleC71_21.png','pic/sneedleC71_16.png'];
var img = new Array(4);

for( var i = 0; i<img.length; i++ ) {
    img[i] = new Image();
}


function update_clock(){
    cntxt.clearRect(0,0,cnvs.width,cnvs.height);
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


    var colors = [{r: 200, color: "#D2F200"}, {r: 206, color: "#59F200"}, {r: 209, color: "#00F220"}, {r: 212, color: "#00F299"}, {r: 215, color: "#00D2F2"}, {r: 218, color: "#0059F2"}, {r: 221, color: "#2000F2"}, {r: 224, color: "#9900F2"}, {r: 227, color: "#F200D2"}, {r: 230, color: "#F20059"}, {r: 233, color: "#F22000"}]

    svg.selectAll("circle")
        .data(colors)
        .enter().append("circle")
        .attr("cx",318)
        .attr("cy",238)
        .attr("r", function(d) { return d.r;})
        .attr("fill","transparent")
        .attr("stroke-width",4)
        .attr("stroke", function(d) { return d.color; });


    var c20 = d3.scale.category20();

    var data = [{x: 398, y:110},{x: 455, y:165},{x: 480, y:253},{x: 455, y:335},{x: 398, y:400},{x: 313, y:416},{x: 227, y:395},{x: 165, y:335},{x: 143, y:250},{x: 163, y:167},{x: 223, y:105}, {x: 307, y:82}];

    svg.selectAll("text")
        .data(data)
        .enter().append("text")
        .attr("x", function(d) { return d.x;})
        .attr("y", function(d) { return d.y;})
        .attr("fill", function(d,i){ return c20(i);})
        .style("font-family", 'Lobster')
        .style("font-size", "30px")
        .text( function (d,i) { return i+1;})

}


function update() {
    update_clock();
    draw_number();
}

function start() {
    setInterval("update();",1000);
    update();
}
function sound() {
    setInterval("emit_sound();", 1000);
    emit_sound();
}


function init() {
    cnvs = document.getElementById('myCanvas');
    cntxt = cnvs.getContext('2d');

    sound();

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

var sound_flag = true;
var clock_time = 0;

function emit_sound() {
    if (sound_flag) {

        if(Math.floor(clock_time % 2) == 1){
            $("#sound1").get(0).play();
            clock_time++;
        } else {
            $("#sound2").get(0).play();
            clock_time++;
        }

    } else {
        $("#sound1").get(0).pause();
    }

} 

$(function(){
  $('#sound_button').click(function () {
      if(sound_flag == true){
          $(this).attr('src', 'pic/sound_off.png');
          sound_flag = false;
      } else {
          $(this).attr('src', 'pic/sound_on.png');
          sound_flag = true;
    }
    });
})
