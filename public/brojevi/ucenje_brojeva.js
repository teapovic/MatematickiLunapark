var game = new Phaser.Game(800, 600, Phaser.AUTO, 'ucimoBrojeve', { preload: preload, create: create, update: update });
var tema = document.currentScript.getAttribute('tema');
var ukupnoElemenata = 0;

function preload() {
    game.load.image('ball', '../public/nav/'+ tema +'/element_ucimo.png');
   // game.load.image('star','../public/Bruna/assets/star.png');
    game.load.image('oblak','../public/nav/razmak.png');
    game.load.image('pozadina','../public/nav/'+ tema +'/pozadina_ucimo.png');
}

var platforms;
var padalice;
var zvijezde=[];
var lokacije = new Map();
var brojevi=[];

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

    brojevi.push(game.rnd.integerInRange(1,10));
    ukupnoElemenata += brojevi[0];
    for(var i=0;i<2;i++) {
        do {
            p = game.rnd.integerInRange(1, 10);
        } while (brojevi.indexOf(p) != -1);
        brojevi.push(p);
        ukupnoElemenata += p;
    }
    console.log(brojevi);


    padalice=game.add.group();
    padalice.enableBody=true;
    for (var i = 0; i < ukupnoElemenata; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = padalice.create(10 + i * (35 + (11/(ukupnoElemenata/2) - 1)*25 ) + ((i % 2 == 0)?0:15), game.world.height - ((i % 2 == 0)?80:150), 'ball');
        star.name = 'star' + i;
        // Enable input detection, then it's possible be dragged.
        star.inputEnabled = true;
        star.body.collideWorldBounds=true;
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
        if(tema == 'svemir' || tema == 'more') {
            fill = '#21409A';
        }
        var style = { font: "66px Heavitas2",fontWeight:'bold', fill: fill, align: "left" };
        s=game.add.text(225- ((brojevi[0] == 10)?17:0), 280,brojevi[0],style);
        lokacije.set(3,s.text);
        ledge = platforms.create(0, 230, 'oblak');
        ledge.body.immovable = true;

        s=game.add.text(530-((brojevi[1]== 10)?17:0), 175,brojevi[1],style);
        lokacije.set(2,s.text);
        ledge = platforms.create(300, 120, 'oblak');;
        ledge.body.immovable = true;

        s=game.add.text(225 - ((brojevi[2]== 10)?17:0), 60,brojevi[2],style);
        lokacije.set(1,s.text);
        dijamanti=game.add.group();
        dijamanti.enableBody=true;
}

function dropHandler(item, pointer) {
}

function update() {
    game.physics.arcade.collide(padalice, platforms);
}

function  myFunction() {
    console.log("u funkciji");
    var prvi=0;
    var drugi=0;
    var treci=0;
    var tocni=0;
    padalice.forEach(function(item) {
        if (item.y >100 && item.y<=270 && item.x<=530)
        {
            drugi++;
        }
        else if (item.y <=430 && item.y>=220 && item.x>=225)
        {
            treci++;
        }
        else if(item.y<=100 && item.x>=225){
            prvi++;
        }
    });
    var boja1;
    var boja2;
    var boja3;
    if(prvi!=lokacije.get(1)){
        boja1=0xe11818;
    }
    else{
        boja1=0x07c507;
        tocni++;
    }
    if(drugi!=lokacije.get(2)){
        boja2=0xe11818;
    }
    else{
        boja2=0x07c507;
        tocni++;
    }
    if(treci!=lokacije.get(3)){
        boja3=0xe11818;
    }
    else{
        boja3=0x07c507;
        tocni++;
    }
    padalice.forEach(function(item) {
        if (item.y >100 && item.y<=270 && item.x<=530)
        {
            item.input.disableDrag();
            item.tint=boja2;
        }
        else if (item.y <=430 && item.y>=220 && item.x>=225)
        {
            item.input.disableDrag();
            item.tint=boja3;
        }
        else if(item.y<=100 && item.x>=225){
            item.input.disableDrag();
            item.tint=boja1;
        }
        else{
            item.input.disableDrag();
        }
    });
    game.add.text(0,0,"Rezultat: ");
    for(var i=0;i<tocni;i++){
        game.add.sprite(i*40, 30, 'star');
    }
    if(tocni==0){
        game.add.text(0,30,"0");
    }
    //$("#rjesenje").prop('disabled',true);
}