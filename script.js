
var myGamePiece;

function startGame() {
    myGamePiece = new component(30, 30, "red", 80, 75);
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1510;
        this.canvas.height = 635;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);        
    },
    stop : function() {
        clearInterval(this.interval);
    },    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.health = 100;
    this.energy = 10;
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0.1;
    this.gravitySpeed = 0;
    this.seconds = 0;
    this.minuts = 0;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
            lever = true;
            if (datasave > 25){
                myGamePiece.health -= 15;
                console.log(myGamePiece.health)
                console.log(datasave)
                datasave = 0;
            }
        }
    }
}

setInterval(desingupdate, 200)
setInterval(timeadd, 1000);
function timeadd () {
    var s = document.getElementById("second");
    var m = document.getElementById("minut");
    myGamePiece.seconds += 1;
    if (myGamePiece.seconds == 60) {
        myGamePiece.seconds = 0;
        myGamePiece.minuts += 1;
    }
    s.innerHTML = ('0'+ myGamePiece.seconds).slice(-2);
    m.innerHTML = ('0'+ myGamePiece.minuts).slice(-2);
}
function desingupdate () {
    var hc= document.getElementById("healthcounter");
    var ec = document.getElementById("energycounter");
    hc.removeAttributeNode;
    ec.removeAttributeNode;
    // var ht = document.createTextNode(myGamePiece.health)
    // var et = document.createTextNode(myGamePiece.energy)
    // hc.appendChild(ht);
    // ec.appendChild(et);

    hc.innerHTML = myGamePiece.health;
    ec.innerHTML = myGamePiece.energy;
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();
}

var lever2 = false;
function jump(){
    lever2 = true;
    myGamePiece.gravity = -0.1;
}
setInterval(energylosss, 200);
setInterval(energygainn, 1000);
function energylosss(){
    if (myGamePiece.energy > 0 && lever2 == true) {
        setTimeout(energyLoss, 1);
    }
}
function energygainn () {
    if (myGamePiece.energy < 10 && lever2 == false) {
        setTimeout(energygain, 1);
    }
}

function energyLoss () {
    myGamePiece.energy -= 1;
}
function energygain () {
    myGamePiece.energy += 1;
}
document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 32 || keyCode == 38) {
        if (lever == true){
        jump();
        }
    } else if (keyCode == 65 || keyCode == 37) {
        moveleft()
    } else if (keyCode == 68 || keyCode == 39) {
        moveright()
    }
}
let data1 = 2;
let data2 = 5;
let data = data2-data1;
var lever = true;
let datasave = 0;
document.addEventListener("keyup", onDocumentKeyUp, false);
function onDocumentKeyUp(event) {
    var keyCode = event.which;
    if(keyCode == 65 || keyCode == 68 || keyCode == 37 || keyCode == 39) {
        clearmove();
    } else if ( keyCode == 32 || keyCode == 38) {
        fall()
    }
}
 function fall() {
     lever2 = false;
    myGamePiece.gravity = 0.1;
}

setInterval(checkenergie, 200)
function getData() {
    if (data2 - data1 == 0 && data != 0) {
        datasave = data;
    }
    data = data1 - data2;
    data2 = myGamePiece.y;    
}
setTimeout(lateinterval, 200)
function lateinterval(){
    setInterval(getData, 200);
}

function checkenergie () {
    if (myGamePiece.energy == 0) {
        outOfEnergie()
    }
    if (myGamePiece.energy > 10){
        myGamePiece.energy =10;
    }
    data1 = myGamePiece.y;
    
}

 function outOfEnergie (){
     lever2 = false;
     lever = false;
     myGamePiece.gravity = 0.1;
     while(myGamePiece.energy > 0 && lever2 == false) {
        setTimeout(energygain, 800);
    }
 }
 function moveleft() {
    myGamePiece.speedX = -5; 
}

function moveright() {
    myGamePiece.speedX = 5; 
}
function clearmove() {
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}

