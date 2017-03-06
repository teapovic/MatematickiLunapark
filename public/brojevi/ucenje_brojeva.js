var game = new Phaser.Game(800, 600, Phaser.AUTO, 'ucimoBrojeve', {preload: preload, create: create, update: update});
var tema = document.currentScript.getAttribute('tema');
var ukupnoElemenata = 0;

function preload() {
    game.load.image('ball', '../public/nav/' + tema + '/element_ucimo.png');
    game.load.image('oblak', '../public/nav/razmak.png');
    game.load.image('pozadina', '../public/nav/' + tema + '/pozadina_ucimo.png');
    game.load.spritesheet('netocno', '../public/nav/netocno.png', 165, 165, 8);
    game.load.spritesheet('tocno', '../public/nav/tocno.png', 165, 165, 8);
}

var platforms;
var padalice;
var zvijezde = [];
var lokacije = new Map();
var brojevi = [];

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'pozadina');

    platforms = game.add.group();
    platforms.enableBody = true;

    var ground = platforms.create(0, game.world.height - 15, 'oblak');
    ground.scale.setTo(2.5, 1.5);
    ground.body.immovable = true;

    ground = platforms.create(0, game.world.height - 80, 'oblak');
    ground.scale.setTo(2.5, 1.5);
    ground.body.immovable = true;

    brojevi.push(game.rnd.integerInRange(1, 10));
    ukupnoElemenata += brojevi[0];
    for (var i = 0; i < 2; i++) {
        do {
            p = game.rnd.integerInRange(1, 10);
        } while (brojevi.indexOf(p) != -1);
        brojevi.push(p);
        ukupnoElemenata += p;
    }


    padalice = game.add.group();
    padalice.enableBody = true;
    for (var i = 0; i < ukupnoElemenata; i++) {
        //  Create a star inside of the 'stars' group
        var star = padalice.create(10 + i * (35 + (11 / (ukupnoElemenata / 2) - 1) * 25 ) + ((i % 2 == 0) ? 0 : 15), game.world.height - ((i % 2 == 0) ? 80 : 150), 'ball');
        star.name = 'star' + i;
        // Enable input detection, then it's possible be dragged.
        star.inputEnabled = true;
        star.body.collideWorldBounds = true;
        // Make this item draggable.
        star.input.enableDrag();

        star.body.gravity.y = 3000;

        star.events.onDragStop.add(dropHandler, this);
        zvijezde.push(star);

    }
    var ledge;
    ledge = platforms.create(300, 340, 'oblak');
    ledge.body.immovable = true;

    var fill = '#FFFFFF';
    if (tema == 'svemir' || tema == 'more') {
        fill = '#21409A';
    }
    var style = {font: "66px Heavitas2", fontWeight: 'bold', fill: fill, align: "left"};
    s = game.add.text(225 - ((brojevi[0] == 10) ? 17 : 0), 280, brojevi[0], style);
    lokacije.set(3, s.text);
    ledge = platforms.create(0, 230, 'oblak');
    ledge.body.immovable = true;

    s = game.add.text(530 - ((brojevi[1] == 10) ? 17 : 0), 175, brojevi[1], style);
    lokacije.set(2, s.text);
    ledge = platforms.create(300, 120, 'oblak');
    ledge.body.immovable = true;

    s = game.add.text(225 - ((brojevi[2] == 10) ? 17 : 0), 60, brojevi[2], style);
    lokacije.set(1, s.text);
    dijamanti = game.add.group();
    dijamanti.enableBody = true;
}

function dropHandler(item, pointer) {
}

function update() {
    game.physics.arcade.collide(padalice, platforms);
}


var prviGif;
var drugiGif;
var treciGif;

function rezultat() {
    if (prviGif != undefined) prviGif.destroy();
    if (drugiGif != undefined) drugiGif.destroy();
    if (treciGif != undefined) treciGif.destroy();

    var prviRezultat = 0;
    var drugiRezultat = 0;
    var treciRezultat = 0;

    padalice.forEach(function (item) {
        if (item.y <= 100 && item.x >= 225) {
            prviRezultat++;
        }
        if (item.y > 100 && item.y <= 270 && item.x <= 530) {
            drugiRezultat++;
        }
        if (item.y <= 430 && item.y >= 220 && item.x >= 225) {
            treciRezultat++;
        }
        item.input.disableDrag();
    });

    if (prviRezultat == lokacije.get(1)) {
        prviGif = game.add.sprite(35, 30, 'tocno');
    }
    else {
        prviGif = game.add.sprite(35, 30, 'netocno');
    }
    if (drugiRezultat == lokacije.get(2)) {
        drugiGif = game.add.sprite(600, 150, 'tocno');
    }
    else {
        drugiGif = game.add.sprite(600, 150, 'netocno');
    }
    if (treciRezultat == lokacije.get(3)) {
        treciGif = game.add.sprite(35, 250, 'tocno');
    }
    else {
        treciGif = game.add.sprite(35, 250, 'netocno');
    }

    prviGif.animations.add('slide');
    prviGif.animations.play('slide', 10, false);

    drugiGif.animations.add('slide');
    drugiGif.animations.play('slide', 10, false);

    treciGif.animations.add('slide');
    treciGif.animations.play('slide', 10, false);
}