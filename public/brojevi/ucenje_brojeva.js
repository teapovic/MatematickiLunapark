/**
 * Created by Bruna on 24.5.2016..
 */
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'brojevi', { preload: preload, create: create, update: update });
var tema = document.currentScript.getAttribute('tema');

function preload() {

    
    game.load.image('ground', '../public/Bruna/assets/platform.png');
    game.load.image('ball', '../public/nav/'+ tema +'/element_ucimo.png');
    game.load.image('star','../public/Bruna/assets/star.png');
    game.load.image('oblak','../public/nav/razmak.png');

    game.load.image('pozadina','../public/nav/'+ tema +'/pozadina_ucimo.png');

}

var platforms;
var padalice;
var zvijezde=[];
var lokacije = new Map();
var brojevi=[];
function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'pozadina');
    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;
    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 10, 'oblak');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2.5, 1.5);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    brojevi.push(game.rnd.integerInRange(1,10));
    for(var i=0;i<2;i++) {
        do {
            p = game.rnd.integerInRange(1, 10);
        } while (brojevi.indexOf(p) != -1);
        brojevi.push(p);
    }
    console.log(brojevi);


    padalice=game.add.group();
    padalice.enableBody=true;
    for (var i = 0; i < 27; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = padalice.create(i * 30, 0, 'ball');
        star.name = 'star' + i;
        // Enable input detection, then it's possible be dragged.
        star.inputEnabled = true;
        star.body.collideWorldBounds=true;
        // Make this item draggable.
        star.input.enableDrag();
        //  Let gravity do its thing
        star.body.gravity.y = 3000;
        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.3 + Math.random() * 0.2;
        star.events.onDragStop.add(dropHandler, this);
        zvijezde.push(star);

    }
    var ledge;
    setTimeout(function(){
        //  Now let's create two ledges
        ledge = platforms.create(300, 360, 'oblak');
        ledge.body.immovable = true;

        var style = { font: "40px Arial",fontWeight:'bold', fill: "#000033", align: "center" };
        s=game.add.text(235, 305,brojevi[0],style);
        lokacije.set(3,s.text);
        ledge = platforms.create(0, 245, 'oblak');
        ledge.body.immovable = true;

        s=game.add.text(535, 195,brojevi[1],style);
        lokacije.set(2,s.text);
        ledge = platforms.create(300, 130, 'oblak');;
        ledge.body.immovable = true;

        s=game.add.text(235, 85,brojevi[2],style);
        lokacije.set(1,s.text);
        dijamanti=game.add.group();
        dijamanti.enableBody=true;
    },3000);


}

function dropHandler(item, pointer) {

}

function update() {

    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(padalice, platforms);

}

function  myFunction() {
    console.log("u funkciji");
    var prvi=0;
    var drugi=0;
    var treci=0;
    var tocni=0;
    padalice.forEach(function(item) {
        if ((item.y >100 && item.y<=270 && item.x>=0 && item.x<=500))
        {
            drugi++;
            // item.tint=0x2ca52c;
            // console.log("na prvoj "+item.name);
        }
        else if ((item.y <=430 && item.y>=220 && item.x>=500))
        {
            treci++;
            // item.tint=0xd22424;
             //console.log("na drugoj "+item.name);
        }
        else if(item.y<=100 && item.x>=500){
            prvi++;
            // item.tint=0x0000FF;
            // console.log("na trecon"+item.name);
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
        if ((item.y >100 && item.y<=270 && item.x>=150 && item.x<=400)||(item.y<=270 && item.x>=400 && item.x<600))
        {
            item.input.disableDrag();
            item.tint=boja2;
        }
        else if ((item.y <=430 && item.y>=220 && item.x<=600 && item.x>=300)||(item.y<=430 && item.x>=600))
        {
            item.input.disableDrag();
            item.tint=boja3;
        }
        else if(item.y<=100 && item.x<=400){
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
    $("#rjesenje").prop('disabled',true);
    $.post('spremiRezRacunanje',{racunanje:  tocni});
}