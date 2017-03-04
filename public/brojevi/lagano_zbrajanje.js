/**
 * Created by Bruna on 24.5.2016..
 */
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'zbroj', { preload: preload, create: create, update: update });
var ukupnoElemenata = 0;
var tema = document.currentScript.getAttribute('tema');
function preload() {

    
    game.load.image('ground', '../public/nav/razmak.png');
    game.load.image('ball', '../public/nav/'+ tema +'/element_zbrajanje.png');
    game.load.image('more','../public/nav/'+ tema +'/pozadina_zbrojRazlika.png');

}

var platforms;
var padalice;
var zvijezde=[];
var lokacije = new Map();
var brojevi=[];

function create() {
    //  We're going to be using physics, so enable the Arcade Physics system
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

    padalice=game.add.group();
    padalice.enableBody=true;
    for (var i = 0; i < ukupnoElemenata; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = padalice.create(10 + i * (35 + (11/(ukupnoElemenata/2) - 1)*25 ) + ((i % 2 == 0)?0:15), game.world.height - ((i % 2 == 0)?80:150), 'ball');
        star.name = 'star' + i;

        star.inputEnabled = true;
        star.body.collideWorldBounds=true;
        // Make this item draggable.
        star.input.enableDrag();
        //  Let gravity do its thing
        star.body.gravity.y = 3000;

        star.events.onDragStop.add(dropHandler, this);
        zvijezde.push(star);
    }

    var ledge;
    setTimeout(function(){

        var fillMain = '#21409A';
        if( tema == 'suma') fillMain = '#FFF799';
        var fillCalculate = '#FFFFFF';

        var style = { font: "66px Heavitas2",fontWeight:'bold', fill: fillCalculate, align: "center" };
        var style2= {font: "77px Heavitas2",fontWeight:'bold', fill: fillMain, align: "center"}

        s=game.add.text(380 - ((brojevi[0] == 10)?20:0),5,brojevi[0],style2);

        s=game.add.text(200,120,"+",style);
        s=game.add.text(100,115,brojevi[1],style);
        lokacije.set(1,s.text);
        ledge = platforms.create(300, 180, 'ground');
        ledge.body.immovable = true;

        s=game.add.text(200,220,"+",style);
        s=game.add.text(100,215,brojevi[2],style);
        lokacije.set(1,s.text);
        ledge = platforms.create(300, 280, 'ground');
        ledge.body.immovable = true;

        s=game.add.text(200,320,"+",style);
        s=game.add.text(100,315,brojevi[3],style);
        lokacije.set(1,s.text);
        ledge = platforms.create(300, 380, 'ground');
        ledge.body.immovable = true;
    },1000);
    
}

function update() {

    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(padalice, platforms);

}

function dropHandler(item, pointer) {

}

function generirajBrojeve() {
    brojevi[0]=game.rnd.integerInRange(5, 10);
    ukupnoElemenata =0;
    var p;
    for(var i=1;i<4;i++){
        do{
            p=game.rnd.integerInRange(1, brojevi[0]);
        }while(brojevi.indexOf(p)!=-1);
        brojevi[i]=p;
        console.log(ukupnoElemenata);
        ukupnoElemenata += brojevi[0] - p;
    }
}

function  myFunction() {
    var prvi=0;
    var drugi=0;
    var treci=0;
    var tocni=0;
    var style = { font: "40px Arial",fontWeight:'bold', fill: "#E4FDF2", align: "center" };
    padalice.forEach(function(item) {
        if (item.x >= 200 && item.x <= 800 && item.y <= 180) {
            prvi++;
        }
        else if (item.x >= 200 && item.x <= 800 && item.y >= 175 && item.y<=270) {
            drugi++;
        }
        else if (item.x >= 200&& item.x <= 800 && item.y>=285 && item.y <= 370) {
            treci++;
        }
    });

    var rez1=brojevi[0]-brojevi[1];
    var rez2=brojevi[0]-brojevi[2];
    var rez3=brojevi[0]-brojevi[3];

    var boja1;
    var boja2;
    var boja3;
    if(rez1!=prvi){
        boja1=0xe11818;
    }
    else{
        tocni++;
        boja1=boja1=0x07c507;
    }
    if(rez2!=drugi){
        boja2=0xe11818;
    }
    else{
        tocni++;
        boja2=0x07c507;
    }
    if(rez3!=treci){
        boja3=0xe11818;
    }
    else{
        tocni++;
        boja3=0x07c507;
    }
    padalice.forEach(function(item) {
        if (item.x >= 200 && item.x <= 800 && item.y <= 180) {
            item.input.disableDrag();
            item.tint = boja1;
        }
        else if (item.x >= 200 && item.x <= 800 && item.y >= 175 && item.y<=270) {
            item.input.disableDrag();
            item.tint = boja2;
        }
        else if (item.x >= 200 && item.x <= 800 && item.y>=285 && item.y <= 370) {
            item.input.disableDrag();
            item.tint=boja3;
        }
        else{
            item.input.disableDrag();
        }
    });
    game.add.text(0,0,"Rezultat: ",style);
    for(var i=0;i<tocni;i++){
        game.add.sprite(i*40, 35, 'star');
    }
    if(tocni==0){
        game.add.text(0,35,"0",style);
    }

    //$("#rjesenje").prop('disabled',true);

}