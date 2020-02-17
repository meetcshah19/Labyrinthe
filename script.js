var canvas;
var ctx;
var x, y;
var xf, yf;
var cx = 11, cy = 11;
var collides = 0;
var maze = new Image();
var gameon = false;

maze.src = "res/" + Math.ceil((Math.random() * 500)).toString();
var time = 0;
function timer() {
    // console.log('in');
    if (gameon) {
        time++;
        document.getElementById("timer").innerText = "Time Elapsed :" + time.toString();
    }
}
window.setInterval(timer, 1000);
function clear() {
    ctx.clearRect(0, 0, 922, 922);
    ctx.drawImage(maze, 0, 0, 922, 922);
}
function collide() {
    var imgd = ctx.getImageData(x, y, 20, 20);
    var pix = imgd.data;
    for (var i = 0; n = pix.length, i < n; i += 4) {
        if (pix[i] == 0) {
            collides = 1;
            break;
        }
    }
}

function draw() {
    document.getElementById('gameon').style.display = "flex";
    document.getElementById('startscreen').style = "display:none;";
    gameon = true;
    time = 0;
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    // var maze = document.getElementById('maze');
    ctx.drawImage(maze, 0, 0, 922, 922);
    
    
    
    var data = ctx.getImageData(20, 20, 882, 1).data;
    ctx.fillStyle = "red";
    var c = 0;
    for (let i = 0; i < 882 * 4; i += 4) {
        console.log(data[i]);

        if (data[i] == 255) {
            c++;
            if (c == 1) {
                x = 20 + i / 4;
                y = 22;
            }
            if (c == 2) {
                xf = 20 + i / 4;
                yf = 22;
            }
            i += 80;
        }
    }
    if (c != 2) {
        data = ctx.getImageData(20, 901, 882, 1).data;

        for (let i = 0; i < 882 * 4; i += 4) {
            console.log(data[i]);
            if (data[i] == 255) {
                c++;
                if (c == 1) {
                    x = 20 + i / 4;
                    y = 880;
                }
                if (c == 2) {
                    xf = 20 + i / 4;
                    yf = 880;
                }
                i += 80;
            }
        }
    }

    if (c != 2) {
        data = ctx.getImageData(901, 20, 1, 882).data;

        for (let i = 0; i < 882 * 4; i += 4) {
            console.log(data[i]);
            if (data[i] == 255) {
                c++;
                if (c == 1) {
                    x = 880;
                    y = 20 + i / 4;
                }
                if (c == 2) {
                    xf = 880;
                    yf = 20 + i / 4;
                }
                i += 80;
            }
        }
    }

    if (c != 2) {
        data = ctx.getImageData(20, 20, 1, 882).data;

        for (let i = 0; i < 882 * 4; i += 4) {
            console.log(data[i]);
            if (data[i] == 255) {
                c++;
                if (c == 1) {
                    x = 22;
                    y = 20 + i / 4;
                }
                if (c == 2) {
                    xf = 22;
                    yf = 20 + i / 4;
                }
                i += 80;
            }
        }
    }
    rect(ctx, x, y);
}
function click(evt) {
    if (gameon) {
        switch (evt.keyCode) {
            case 38:
                if (y - cy > 20) {
                    y -= cy;
                    clear();
                    collide();
                    if (collides == 1) {
                        y += cy;
                        collides = 0;
                    }
                }

                break;
            case 40:
                if (y + cy < 882) {
                    y += cy;
                    clear();
                    collide();
                    if (collides == 1) {
                        y -= cy;
                        collides = 0;
                    }
                }

                break;
            case 37:
                if (x - cx > 20) {
                    x -= cx;
                    clear();
                    collide();
                    if (collides == 1) {
                        x += cx;
                        collides = 0;
                    }
                }
                break;
            case 39:
                if ((x + cx < 882)) {
                    x += cx;
                    clear();
                    collide();
                    if (collides == 1) {
                        x -= cx;
                        collides = 0;
                    }
                }
                break;
        }

        rect(ctx, x, y);
    }
}


function rect(ctx, x, y) {
    ctx.beginPath();
    ctx.rect(x, y, 20, 20);
    ctx.closePath();
    ctx.fill();
    if (xf == x && yf == y) {
        gameon = false;
        document.getElementById('gameon').style.display = "none";
        document.getElementById('name').style.display = "flex";
        maze.src = "/res/" + Math.ceil((Math.random() * 500)).toString();
        return;
    }
}

function pause() {
    gameon = !gameon;
    if (gameon) {
        document.getElementById('pause').innerHTML = "Pause";
    } else {
        document.getElementById('pause').innerHTML = "Resume";
    }
}
function store() {
    maze.src = "res/" + Math.ceil((Math.random() * 500)).toString();
    console.log(typeof localStorage.getItem('data'));
    var xyz;
    if (localStorage.getItem('data') != null) {
        xyz = JSON.parse(localStorage.getItem('data'));
    } else {
        xyz = new Array();
    }
    console.log(xyz);
    xyz.push({ k: document.getElementById('namets').value, v: time });
    xyz.sort((a, b) => a.v - b.v);
    localStorage.setItem('data', JSON.stringify(xyz));

    document.getElementById('startscreen').style.display = "flex";
    document.getElementById('name').style.display = "none";
    time = 0;
}
function lb() {
    document.getElementById('startscreen').style.display = "none";
    var data = JSON.parse(localStorage.getItem('data'));
    var ins = '';
    var c = 1;
    data.forEach(element => {
        ins += c + ". " + element.k + " - " + element.v + "s<br>";
        c++;
    });
    document.getElementById('lbvals').innerHTML = ins;
    console.log(ins);
    document.getElementById('leaderboard').style.display = "flex";


}
function back() {
    document.getElementById('leaderboard').style.display = "none";
    document.getElementById('startscreen').style.display = "flex";
}
function exit() {
    document.getElementById('gameon').style.display = "none";
    document.getElementById('startscreen').style.display = "flex";
}
window.addEventListener('keydown', click, true);






