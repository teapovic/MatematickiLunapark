var game = new Phaser.Game(800, 600, Phaser.AUTO, 'teskoOduzimanje', {
    preload: preload,
    create: create,
    update: update
});
var tema = document.currentScript.getAttribute('tema');

function preload() {
    game.load.image('ground', '../public/nav/razmak.png');
    game.load.image('1', '../public/nav/' + tema + '/broj_1.png');
    game.load.image('2', '../public/nav/' + tema + '/broj_2.png');
    game.load.image('3', '../public/nav/' + tema + '/broj_3.png');
    game.load.image('4', '../public/nav/' + tema + '/broj_4.png');
    game.load.image('5', '../public/nav/' + tema + '/broj_5.png');
    game.load.image('6', '../public/nav/' + tema + '/broj_6.png');
    game.load.image('7', '../public/nav/' + tema + '/broj_7.png');
    game.load.image('8', '../public/nav/' + tema + '/broj_8.png');
    game.load.image('9', '../public/nav/' + tema + '/broj_9.png');
    game.load.image('10', '../public/nav/' + tema + '/broj_10.png');
    game.load.image('pozadina', '../public/nav/' + tema + '/pozadina.png');
    game.load.spritesheet('netocno', '../public/nav/netocno.png', 165, 165, 8);
    game.load.spritesheet('tocno', '../public/nav/tocno.png', 165, 165, 8);
}

var platforms;
var padalice;
var zvijezde = [];
var brojevi = [];
var rez = [];

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'pozadina');

    platforms = game.add.group();
    platforms.enableBody = true;

    var ground = platforms.create(0, game.world.height - 15, 'ground');
    ground.scale.setTo(2.5, 1.5);
    ground.body.immovable = true;

    if (tema == 'police') {
        ground = platforms.create(0, game.world.height - 105, 'ground');
        ground.scale.setTo(2.5, 1.5);
        ground.body.immovable = true;
    } else {
        ground = platforms.create(0, game.world.height - 38, 'ground');
        ground.scale.setTo(2.5, 1.5);
        ground.body.immovable = true;
    }

    generirajBrojeve();

    padalice = game.add.group();
    padalice.enableBody = true;

    for (var i = 1; i <= 10; i++) {
        var star;
        if (tema == 'police' && i == 10) {
            star = padalice.create(11 * 60, game.world.height - 110, String(i));
        } else {
            star = padalice.create(i * 60 + ((tema == 'police' && i % 2 == 1) ? 0 : 15), game.world.height - ((tema == 'police' && i % 2 == 1) ? 110 : 250), String(i));
        }
        star.name = i;
        star.inputEnabled = true;
        star.body.collideWorldBounds = true;

        star.input.enableDrag();
        star.body.gravity.y = 3000;
        zvijezde.push(star);
    }

    var ledge;
    var s;
    var stylePloca = {font: "68px NoMoreLies", fontWeight: 'bold', fill: '#FFC5FF', align: "center"};
    var stylePolica = {font: "68px Heavitas2", fontWeight: 'bold', fill: '#FFFCD5', align: "center"}

    var style = stylePloca;
    var podigni = 0;
    if (tema == 'police') {
        style = stylePolica;
        podigni = 35;
    }
    s = game.add.text(135 + ((brojevi[0] != 10) ? 20 : 0), 65 - podigni, brojevi[0] + ' - ' + brojevi[1], style);
    s = game.add.text(335, 65 - podigni, ' =', style);

    ledge = platforms.create(340, 125 - podigni * 0.3, 'ground');
    ledge.body.immovable = true;

    s = game.add.text(135 + ((brojevi[2] != 10) ? 20 : 0), 175 - podigni * 0.4, brojevi[2] + ' - ' + brojevi[3], style);
    s = game.add.text(335, 175 - podigni * 0.4, ' =', style);

    ledge = platforms.create(340, 235 + podigni * 0.4, 'ground');
    ledge.body.immovable = true;

    s = game.add.text(135 + ((brojevi[4] != 10) ? 20 : 0), 285 + podigni * 0.3, brojevi[4] + ' - ' + brojevi[5], style);
    s = game.add.text(335, 285 + podigni * 0.3, ' =', style);

    ledge = platforms.create(340, 345 + podigni, 'ground');
    ledge.body.immovable = true;
}

function update() {
    game.physics.arcade.collide(padalice, platforms);
}

function generirajBrojeve() {
    var p;
    var q;
    var r = 0;

    for (var i = 0; i < 6; i += 2) {
        do {
            p = game.rnd.integerInRange(2, 10);
            q = game.rnd.integerInRange(1, 9);
            r = p - q;
        } while ((rez.indexOf(r) != -1) || (r < 1));
        rez.push(r);
        brojevi[i] = p;
        brojevi[i + 1] = q;
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
    var br1 = 0;
    var br2 = 0;
    var br3 = 0;

    var style = {font: "40px Arial", fontWeight: 'bold', fill: "#fff", align: "center"};

    padalice.forEach(function (item) {
        if (item.x >= 320 && item.y <= 150) {
            prviRezultat = item.name;
            br1++;
        }
        else if (item.x >= 320 && item.y >= 150 && item.y <= 270) {
            drugiRezultat = item.name;
            br2++;
        }
        else if (item.x >= 320 && item.y >= 270 && item.y <= 370) {
            treciRezultat = item.name;
            br3++;
        }
        item.input.disableDrag();
    });

    if (prviRezultat == rez[0] && br1 == 1) {
        prviGif = game.add.sprite(630, 10, 'tocno');
    }
    else {
        prviGif = game.add.sprite(630, 10, 'netocno');
    }
    if (drugiRezultat == rez[1] && br2 == 1) {
        drugiGif = game.add.sprite(630, 140, 'tocno');
    }
    else {
        drugiGif = game.add.sprite(630, 140, 'netocno');
    }
    if (treciRezultat == rez[2] && br3 == 1) {
        treciGif = game.add.sprite(630, 270, 'tocno');
    }
    else {
        treciGif = game.add.sprite(630, 270, 'netocno');
    }

    prviGif.animations.add('slide');
    prviGif.animations.play('slide', 10, false);

    drugiGif.animations.add('slide');
    drugiGif.animations.play('slide', 10, false);

    treciGif.animations.add('slide');
    treciGif.animations.play('slide', 10, false);
}