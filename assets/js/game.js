var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var dirtT = new Image();
var dirtM = new Image();
var dirtTL = new Image();
var dirtTR = new Image();
var dirtL = new Image();
var dirtR = new Image();
var dirtTLM = new Image();
var dirtTRM = new Image();
var dirtTM = new Image();
var dirtTLRM = new Image();

const PLAYER_IDLE = 0;
const PLAYER_LEFT = 1;
const PLAYER_RIGHT = 2;
const PLAYER_JUMP = 3;
const PLAYER_FALL = 3;

var view = {
    left : 0,
    top : 0,
    zoom : 1,
    xspeed : 4
}

var map = {
    width: 3000 * view.zoom,
    height: 500 * view.zoom
}

var block = {
    width : 50 * view.zoom,
    height : 50 * view.zoom
}

var player = {
    width : 65 * view.zoom,
    height : 100 * view.zoom,
    x : 0,
    y : map.height - 80,
    speed : 1,
    condition : PLAYER_IDLE,
    img_id : 0,
    image : new Image()
}

var MapBlocks = [];
var PersonImg = [];

function resize(){
    var box = c.getBoundingClientRect();
    c.width = box.width;
    c.height = box.height;
    draw();
}

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

function loaded(){
    dirtT.src = "assets/image/DirtT.png";
    dirtM.src = "assets/image/DirtM.png";
    dirtL.src = "assets/image/DirtL.png";
    dirtR.src = "assets/image/DirtR.png";
    dirtTL.src = "assets/image/DirtTL.png";
    dirtTR.src = "assets/image/DirtTR.png";
    dirtTLM.src = "assets/image/DirtTLM.png";
    dirtTLRM.src = "assets/image/DirtTLRM.png";
    dirtTM.src = "assets/image/DirtTM.png";
    dirtTRM.src = "assets/image/DirtTRM.png";
    MapBlocks = new Array(map.width / block.width);
    for (var w = 0; w < map.width / block.width; w ++){
        MapBlocks[w] = new Array(map.height / block.height);
    }
    for (var i = 0; i < 15; i++){
        var img = new Image();
        img.src = `assets/image/person_${pad(i+1,2)}.png`;
        PersonImg[i] = img;
    }
    MapBlocks[10][9] = 1;
    MapBlocks[11][9] = 3;
    MapBlocks[20][9] = 1;
    MapBlocks[21][9] = 8;
    MapBlocks[21][8] = 4;
    MapBlocks[21][7] = 1;
    MapBlocks[22][7] = 2;
    MapBlocks[22][8] = 5;
    MapBlocks[22][9] = 5;
    MapBlocks[23][7] = 2;
    MapBlocks[23][8] = 5;
    MapBlocks[23][9] = 5;
    MapBlocks[24][8] = 5;
    MapBlocks[24][9] = 5;
    MapBlocks[25][8] = 5;
    MapBlocks[25][9] = 5;
    MapBlocks[24][7] = 2;
    MapBlocks[25][7] = 3;
    MapBlocks[25][8] = 6;
    MapBlocks[25][9] = 6;
    draw();
}

window.onkeydown = (event) => {
    if (event.keyCode == 39){
        var collider = colliderXCheck(view.left, player.width, player.y, player.height);
        if (collider){
            player.condition = PLAYER_IDLE;
            return;
        }
        if (view.left + c.width + view.xspeed > map.width){
            view.left = map.width - c.width;
        }else{
            view.left += view.xspeed;
        }
        player.condition = PLAYER_RIGHT;
    }else if (event.keyCode == 37){
        if (view.left - view.xspeed < 0){
            view.left = 0;
        }else{
            view.left -= view.xspeed;
        }
        player.condition = PLAYER_LEFT;
    }
    draw();
}

window.onkeyup = (event) => {
    player.condition = PLAYER_IDLE;
    draw();
}

window.onload = (event) => {
    draw();
}

function colliderXCheck(x,width, y, height){
    for (var yy = y/block.height; yy < y/block.height + Math.ceil(height/block.height); yy++){
        if (MapBlocks[parseInt((x + width)/block.width)][parseInt(yy)] != undefined){
            return true;
        }
        if (MapBlocks[parseInt(x/block.width)][parseInt(yy)] != undefined){
            return true;
        }
    }
    return false;
}

function draw(){
    ctx.clearRect(0, 0, c.width, c.height);
    // Create gradient
    var grd = ctx.createLinearGradient(0, 0, 0, map.height);
    grd.addColorStop(0, "blue");
    grd.addColorStop(1, "white");

    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, c.width, c.height);
    for (var x = 0 - view.left; x < c.width; x += block.width){
        for (var y = 0; y < c.height; y += block.height){
            switch (MapBlocks[(view.left + x)/block.width][y/block.height]){
                case 1:
                    ctx.drawImage(dirtTL, x, y, block.width, block.height);
                    break;
                case 2:
                    ctx.drawImage(dirtT, x, y, block.width, block.height);
                    break;
                case 3:
                    ctx.drawImage(dirtTR, x, y, block.width, block.height);
                    break;
                case 4:
                    ctx.drawImage(dirtL, x, y, block.width, block.height);
                    break;
                case 5:
                    ctx.drawImage(dirtM, x, y, block.width, block.height);
                    break;
                case 6:
                    ctx.drawImage(dirtR, x, y, block.width, block.height);
                    break;
                case 7:
                    ctx.drawImage(dirtTM, x, y, block.width, block.height);
                    break;
                case 8:
                    ctx.drawImage(dirtTLM, x, y, block.width, block.height);
                    break;
                case 9:
                    ctx.drawImage(dirtTRM, x, y, block.width, block.height);
                    break;
                case 10:
                    ctx.drawImage(dirtTLRM, x, y, block.width, block.height);
                    break;
            }
            if (y == map.height && MapBlocks[(view.left + x)/block.width][y/block.height - 1] != undefined) {
                switch(MapBlocks[(view.left + x)/block.width][y/block.height - 1] ){
                    case 1:
                        ctx.drawImage(dirtTLM, x, y, block.width, block.height);
                        break;
                    case 3:
                        ctx.drawImage(dirtTRM, x, y, block.width, block.height);
                        break;
                    case 4:
                        ctx.drawImage(dirtTLM, x, y, block.width, block.height);
                        break;
                    case 6:
                        ctx.drawImage(dirtTRM, x, y, block.width, block.height);
                        break;
                    case 7:
                        ctx.drawImage(dirtTLRM, x, y, block.width, block.height);
                        break;
                    default:
                        ctx.drawImage(dirtM, x, y, block.width, block.height);
                }
            }else if((y == map.height && MapBlocks[(view.left + x)/block.width][y/block.height - 1] == undefined)){
                ctx.drawImage(dirtT, x, y, block.width, block.height);
            }else if (y > map.height){
                ctx.drawImage(dirtM, x, y, block.width, block.height);
            }
        }
    }
    ctx.drawImage(player.image, player.x* view.zoom, player.y* view.zoom, player.image.naturalWidth * player.height / player.image.naturalHeight, player.height);

    for (var x = 0 - view.left; x < c.width; x += block.width){
        for (var y = 0; y < c.height; y += block.height){
            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.strokeStyle = "red";
            ctx.rect(x,y,block.width, block.height);
            ctx.stroke();
        }
    }
}

function drawCharacters(){
    if (player.condition == PLAYER_IDLE){
        switch(player.img_id){
            case 0:
                player.image = PersonImg[player.img_id];
                player.img_id = 1;
                break;
            case 1:
                player.image = PersonImg[player.img_id];
                player.img_id = 2;
                break;
            case 2:
                player.image = PersonImg[player.img_id];
                player.img_id = 3;
                break;
            case 3:
                player.image = PersonImg[player.img_id];
                player.img_id = 0;
                break;
            default:
                player.img_id = 0;
                break;
        }
    }else if (player.condition == PLAYER_RIGHT){
        switch(player.img_id){
            case 4:
                player.image = PersonImg[player.img_id];
                player.img_id = 5;
                break;
            case 5:
                player.image = PersonImg[player.img_id];
                player.img_id = 6;
                break;
            case 6:
                player.image = PersonImg[player.img_id];
                player.img_id = 7;
                break;
            case 7:
                player.image = PersonImg[player.img_id];
                player.img_id = 8;
                break;
            case 8:
                player.image = PersonImg[player.img_id];
                player.img_id = 9;
                break;
            case 9:
                player.image = PersonImg[player.img_id];
                player.img_id = 4;
                break;
            default:
                player.img_id = 4;
                break;
        }
    }else if (player.condition == PLAYER_LEFT){
        switch(player.img_id){
            case 4:
                player.image = flipY(PersonImg[player.img_id]);
                player.img_id = 5;
                break;
            case 5:
                player.image = flipY(PersonImg[player.img_id]);
                player.img_id = 6;
                break;
            case 6:
                player.image = flipY(PersonImg[player.img_id]);
                player.img_id = 7;
                break;
            case 7:
                player.image = flipY(PersonImg[player.img_id]);
                player.img_id = 8;
                break;
            case 8:
                player.image = flipY(PersonImg[player.img_id]);
                player.img_id = 9;
                break;
            case 9:
                player.image = flipY(PersonImg[player.img_id]);
                player.img_id = 4;
                break;
            default:
                player.img_id = 4;
                break;
        }
    }
    draw();
    setTimeout(function(){
        drawCharacters();
    },200);
}

function flipY(image){
     var c = document.createElement('canvas');
     c.width = image.width;
     c.height = image.height;
     var ctx = c.getContext('2d');
     ctx.scale(-1,1);
     ctx.drawImage(image,-image.width,0);
    
     return c.toDataURL();
}


loaded();
resize();
drawCharacters();

window.onresize = resize;