var snake = [{ l: 1, c: 1 }, { l: 2, c: 1 }, { l: 3, c: 1 }];
var controls_btn = document.querySelectorAll(".joystick");
var screem = document.querySelector(".screem");
var food = document.createElement("div")
var direction = "down"
var snakelength = 3
var l = 1
var c = 1;
var max = 25;
var min =1
var lfood = Math.floor((Math.random() * (max - min)) + min)
var cfood = Math.floor((Math.random() * (max - min)) + min)

//cria blocos div para formar linhas e colunas
var showblocks = () => {
    var l = 1;
    var c = 0;
    [...Array(625)].forEach((v, i, a) => {
        var block = document.createElement("div")
        block.setAttribute("class", "pixel");

        c++
        if (c > 25) {
            l++
            c = 1;
            cont = 1
        }
        block.id = `l${l}c${c}`

        screem.append(block)

    })
}
//controles do jogo
var controls = (boleam) => {
    controls_btn.forEach(e => {
        e.addEventListener("click", () => {
            if (e) {
                direction = e.innerHTML;
            }
        })
    })
    switch (direction) {
        case "right":
            c++
            break;
        case "down":
            l++
            break;
        case "up":
            l--
            break;
        case "left":
            c--
            break;
        default:
            break;
    }
    return boleam
}
//remove o primeiro elemento do array de objetos
var removetail = () => {
    var index = snake.shift();
    document.getElementById(`l${index.l}c${index.c}`).style.background = ""
}
///.....................................///

//cria o alimento da cobra
var food_ofSnake = () => {

    food.setAttribute("class", "food")
    food.id = JSON.stringify({ l: lfood, c: cfood });
    var pixel = document.getElementById(`l${lfood}c${cfood}`)
    eat_snake(food.id)
    pixel.appendChild(food);

}
var eat_snake = (foodposition) => {

    var headSnake = JSON.stringify(snake[snake.length - 1])
    if (headSnake == foodposition) {
   
         lfood = Math.floor((Math.random() * (max - min)) + min)
         cfood = Math.floor((Math.random() * (max - min)) + min)
        snakelength++
        food.id = JSON.stringify({ l: lfood, c: cfood });
        var pixel = document.getElementById(`l${lfood}c${cfood}`)
        pixel.appendChild(food);
    }
    
}
var gameover = () => {
    clearInterval(interval);
    screem.style.background = "red"
    screem.style.opacity = "60%";

}
var colision = (colide) => {
    var colidwall = snake[snake.length - 1]
    var selfcolid = snake[snake.length - 1];

    var body = document.getElementById(`l${snake[snake.length - 1].l}c${snake[snake.length - 1].c}`)
    //colide parede direita
    if (colidwall.c > 25) {
        gameover();
    }
    //colide parede direita
    else if (colidwall.c < 1) {
        gameover();
    }
    //colide teto
    else if (colidwall.l < 1) {
        gameover();
    }
    //colide solo
    else if (colidwall.l > 25) {
        gameover();
    }

    for (var i = 0; i < snake.length - 1; i++) {
        var objcolid = document.getElementById(`l${snake[i].l}c${snake[i].c}`)
        if (body.id == objcolid.id) {
            gameover()
        }
    }
    return colide
}

var start_game = () => {
    controls()
    colision(true)

    //


    snake.push({ l: l + 2, c: c });
    snake.forEach((v, i, a) => {
        document.getElementById(`l${a[i].l}c${a[i].c}`).style.background = "blue";
    })
    food_ofSnake();
    if (snake.length > snakelength) { removetail() }
}

showblocks();
var interval = setInterval(start_game, 300)




