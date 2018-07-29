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
    // cntxt.beginPath();
    // cntxt.moveTo(320,240);
    // cntxt.lineTo(320,100);
    // cntxt.quadraticCurveTo(50,200,150,200);
    // cntxt.bezierCurveTo(75,250,175,250,250,250);
    // cntxt.lineTo(250,50);
    // cntxt.lineWidth = 15;
    // cntxt.strokeStyle = 'red';
    // cntxt.lineCap = 'round';
    // cntxt.lineJoin = 'round';
    // cntxt.stroke();

    // svg = d3.select(".cv")
    //     .append("svg")
    //     .attr("width", 642)
    //     .attr("height", 482)
    svg = d3.select("svg")
        .append("circle")
        .style("stroke", "gray")
        .style("fill", "white")
        .attr("r", 40)
        .attr("cx", 50)
        .attr("cy", 50)
        // .on("mouseover", -> d3.select(this).style("fill", "aliceblue"))
        // .on("mouseout", -> d3.select(this).style("fill", "white"))
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
