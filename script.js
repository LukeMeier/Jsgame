
var myGamePiece;
var particles = [];
var particleID = 0;

var colors = ["green", "red", "blue", "yellow", "gold", "black", "white", "orange", "lightblue", "lightgreen"];
var number = Math.floor(Math.random()*colors.length)

function startGame() {
    myGamePiece = new component(30, 30, "red", 80, 75);
    var int = 1;
    myGameArea.start();
    setInterval(() => {
        setTimeout(() => {
            int++;
            if(int > 20) return;
            particleID++;
            new component(10, 10, "red", 80, 75, 5000, 1000, particleID); 
        }, 10000);
    }, 100);
}

console.log(particles)

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

function component(width, height, color, x, y, optionalFadeDelay, optionalFadeTime, particleID) {
    this.id = particleID ?? 0;
    this.health = 100;
    this.energy = 10;
    this.color = color;
    // this.type = type;
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

    if(optionalFadeDelay && optionalFadeTime) {
        // this.color = `rgba(249, 180, 45, 1)`;
        setTimeout(() => {
            var ticks = optionalFadeTime / 20;
            var doneTicks = 0;
            fade();
            function fade() {
                setTimeout(() => {
                    // this.color = `rgba(249, 180, 45, ${Math.abs(doneTicks / ticks - 1)})`;
                    doneTicks++;
                    if(doneTicks > ticks) {
                        if(particleID) {
                            console.log(particles.filter(p => p.id === particleID)[0]);
                            particles.splice(particles.findIndex(p => p.id === particleID),1);
                            console.log(particles.filter(p => p.id === particleID)[0]);
                        }
                    }
                    else {
                        fade();
                    }
                }, 20);
            }
        }, optionalFadeDelay);
    }

    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y >= rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
            lever = true;
            if (datasave > 25){
                myGamePiece.health -= 15;
                if (myGamePiece.health <= 0) {
                    myGamePiece.health = 0;
                    location.reload();
                }
                console.log(myGamePiece.health)
                console.log(datasave)
                datasave = 0;
            }
        }
    }

    if(particleID) {
        particles.push(this);
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
    hc.innerHTML = myGamePiece.health;
    ec.innerHTML = myGamePiece.energy;
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();

    particles.forEach(particle => {
        console.log(particle)
        particle.newPos();
        particle.update();
    });
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