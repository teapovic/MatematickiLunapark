var game = new Phaser.Game(800, 600, Phaser.AUTO, 'laganoZbrajanje', {
    preload: preload,
    create: create,
    update: update
});
var ukupnoElemenata = 0;
var tema = document.currentScript.getAttribute('tema');

function preload() {
    game.load.image('ground', '../public/nav/razmak.png');
    game.load.image('ball', '../public/nav/' + tema + '/element_zbrajanje.png');
    game.load.image('more', '../public/nav/' + tema + '/pozadina_zbrojRazlika.png');
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

    game.add.sprite(0, 0, 'more');
    platforms = game.add.group();
    platforms.enableBody = true;

    var ground = platforms.create(0, game.world.height - 15, 'ground');
    ground.scale.setTo(2.5, 1.5);
    ground.body.immovable = true;

    ground = platforms.create(0, game.world.height - 80, 'ground');
    ground.scale.setTo(2.5, 1.5);
    ground.body.immovable = true;

    generirajBrojeve();

    padalice = game.add.group();
    padalice.enableBody = true;
    for (var i = 0; i < ukupnoElemenata; i++) {
        //  Create a star inside of the 'stars' group
        var star = padalice.create(10 + i * (35 + (11 / (ukupnoElemenata / 2) - 1) * 25 ) + ((i % 2 == 0) ? 0 : 15), game.world.height - ((i % 2 == 0) ? 80 : 150), 'ball');
        star.name = 'star' + i;

        star.inputEnabled = true;
        star.body.collideWorldBounds = true;
        // Make this item draggable.
        star.input.enableDrag();
        //  Let gravity do its thing
        star.body.gravity.y = 3000;

        star.events.onDragStop.add(dropHandler, this);
        zvijezde.push(star);
    }

    var ledge;

    var fillMain = '#21409A';
    if (tema == 'suma') fillMain = '#FFF799';
    var fillCalculate = '#FFFFFF';

    var style = {font: "66px Heavitas2", fontWeight: 'bold', fill: fillCalculate, align: "center"};
    var style2 = {font: "77px Heavitas2", fontWeight: 'bold', fill: fillMain, align: "center"}

    s = game.add.text(380 - ((brojevi[0] == 10) ? 20 : 0), 5, brojevi[0], style2);

    s = game.add.text(200, 120, "+", style);
    s = game.add.text(100, 115, brojevi[1], style);
    lokacije.set(1, s.text);
    ledge = platforms.create(300, 180, 'ground');
    ledge.body.immovable = true;

    s = game.add.text(200, 220, "+", style);
    s = game.add.text(100, 215, brojevi[2], style);
    lokacije.set(1, s.text);
    ledge = platforms.create(300, 280, 'ground');
    ledge.body.immovable = true;

    s = game.add.text(200, 320, "+", style);
    s = game.add.text(100, 315, brojevi[3], style);
    lokacije.set(1, s.text);
    ledge = platforms.create(300, 380, 'ground');
    ledge.body.immovable = true;
}

function update() {
    game.physics.arcade.collide(padalice, platforms);
}

function dropHandler(item, pointer) {
}

function generirajBrojeve() {
    brojevi[0] = game.rnd.integerInRange(5, 10);
    ukupnoElemenata = 0;
    var p;
    for (var i = 1; i < 4; i++) {
        do {
            p = game.rnd.integerInRange(1, brojevi[0]);
        } while (brojevi.indexOf(p) != -1);
        brojevi[i] = p;
        ukupnoElemenata += brojevi[0] - p;
    }
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

    var style = {font: "40px Arial", fontWeight: 'bold', fill: "#E4FDF2", align: "center"};
    padalice.forEach(function (item) {
        if (item.x >= 200 && item.x <= 800 && item.y <= 180) {
            prviRezultat++;
        }
        else if (item.x >= 200 && item.x <= 800 && item.y >= 175 && item.y <= 270) {
            drugiRezultat++;
        }
        else if (item.x >= 200 && item.x <= 800 && item.y >= 285 && item.y <= 370) {
            treciRezultat++;
        }
        item.input.disableDrag();
    });

    if (prviRezultat == brojevi[0] - brojevi[1]) {
        prviGif = game.add.sprite(650, 80, 'tocno');
    }
    else {
        prviGif = game.add.sprite(650, 80, 'netocno');
    }
    if (drugiRezultat == brojevi[0] - brojevi[2]) {
        drugiGif = game.add.sprite(650, 180, 'tocno');
    }
    else {
        drugiGif = game.add.sprite(650, 180, 'netocno');
    }
    if (treciRezultat == brojevi[0] - brojevi[3]) {
        treciGif = game.add.sprite(650, 285, 'tocno');
    }
    else {
        treciGif = game.add.sprite(650, 285, 'netocno');
    }

    prviGif.scale.setTo(0.9, 0.9);
    prviGif.animations.add('slide');
    prviGif.animations.play('slide', 10, false);

    drugiGif.scale.setTo(0.9, 0.9);
    drugiGif.animations.add('slide');
    drugiGif.animations.play('slide', 10, false);

    treciGif.scale.setTo(0.9, 0.9);
    treciGif.animations.add('slide');
    treciGif.animations.play('slide', 10, false);

}