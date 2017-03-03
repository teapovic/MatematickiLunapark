/**
 * Created by Bruna on 26.5.2016..
 */

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'hcminus', { preload: preload, create: create, update: update });

function preload() {

    
    game.load.image('ground', '../public/Bruna/assets/platform.png');
    game.load.image('1', '../public/Bruna/assets/1.png');
    game.load.image('2', '../public/Bruna/assets/2.png');
    game.load.image('3', '../public/Bruna/assets/3.png');
    game.load.image('4', '../public/Bruna/assets/4.png');
    game.load.image('5', '../public/Bruna/assets/5.png');
    game.load.image('6', '../public/Bruna/assets/6.png');
    game.load.image('7', '../public/Bruna/assets/7.png');
    game.load.image('8', '../public/Bruna/assets/8.png');
    game.load.image('9', '../public/Bruna/assets/9.png');
    game.load.image('10', '../public/Bruna/assets/10.png');
    game.load.image('star','../public/Bruna/assets/star.png');
    game.load.image('pozadina','../public/Bruna/assets/pozadina.jpg');
    game.load.image('kraj','../public/Bruna/assets/kraj.jpg');
    game.load.image('minus','../public/Bruna/assets/minus.png');
    game.load.image('jednako','../public/Bruna/assets/jednako.png');

}

var platforms;
var padalice;
var zvijezde=[];
var brojevi=[];
var rez=[];
var boje=[0xf2a3bd,0xd6d963,0x6fe7db,0xc4adc9, 0xfad48b, 0xf5f9ad, 0xbcdf8a, 0x94c0cc];

function create() {
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.stage.backgroundColor = "#f9f9ac";
    game.add.sprite(0, 0, 'pozadina');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 27, 'kraj');
    ground.body.immovable = true;

    generirajBrojeve();

    padalice=game.add.group();
    padalice.enableBody=true;
    var color=boje[parseInt((Math.random()*10)%4,10)];
    for (var i = 1; i <= 10; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = padalice.create(i * 70, 0, String(i));
        star.name = i;
        // Enable input detection, then it's possible be dragged.
        star.inputEnabled = true;
        star.body.collideWorldBounds=true;
        star.scale.setTo(1.5, 1.5);
        // Make this item draggable.
        star.input.enableDrag();
        //  Let gravity do its thing
        star.body.gravity.y = 300;

        star.tint=color;
        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.3 + Math.random() * 0.2;
        star.events.onDragStop.add(dropHandler, this);

        zvijezde.push(star);
    }

    var ledge;
    var s;
    setTimeout(function(){
        //  Now let's create two ledges



        s=game.add.sprite(100, 135, String(brojevi[0]));
        s.scale.setTo(1.5,1.5);
        game.add.sprite(200,150,'minus');
        s=game.add.sprite(300, 135, String(brojevi[1]));
        s.scale.setTo(1.5,1.5);
        game.add.sprite(400,155,'jednako');
        ledge = platforms.create(500, 180, 'ground');
        ledge.scale.setTo(0.5,0.2);
        ledge.body.immovable = true;

        s=game.add.sprite(100, 235, String(brojevi[2]));
        s.scale.setTo(1.5,1.5);
        game.add.sprite(200,250,'minus');
        s=game.add.sprite(300, 235, String(brojevi[3]));
        s.scale.setTo(1.5,1.5);
        game.add.sprite(400,255,'jednako');
        ledge = platforms.create(500, 280, 'ground');
        ledge.scale.setTo(0.5,0.2);
        ledge.body.immovable = true;

        s=game.add.sprite(100, 335, String(brojevi[4]));
        s.scale.setTo(1.5,1.5);
        game.add.sprite(200,350,'minus');
        s=game.add.sprite(300, 335, String(brojevi[5]));
        s.scale.setTo(1.5,1.5);
        game.add.sprite(400,355,'jednako');
        ledge = platforms.create(500, 380, 'ground');
        ledge.scale.setTo(0.5,0.2);
        ledge.body.immovable = true;
    },2000);

}

function update() {

    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(padalice, platforms);

}

function dropHandler(item, pointer) {

}

function generirajBrojeve() {

    var p;
    var q;
    var r=0;

    for(var i=0;i<6;i+=2){
        do{
            p=game.rnd.integerInRange(2, 10);
            q=game.rnd.integerInRange(1,9);
            r=p-q;
        }while((rez.indexOf(r)!=-1)||(r<1));
        rez.push(r);
        brojevi[i]=p;
        brojevi[i+1]=q;
    }
    console.log(rez);
}

function  myFunction() {
    var prvi=0;
    var br1=0;
    var drugi=0;
    var br2=0;
    var treci=0;
    var br3=0;
    var tocni=0;
    var style = { font: "40px Arial",fontWeight:'bold', fill: "#fff", align: "center" };
    padalice.forEach(function(item) {
        if (item.x >= 400 && item.x <= 700 && item.y <= 180) {
            prvi=item.name;
            br1++;
        }
        else if (item.x >= 400 && item.x <= 700 && item.y >= 175 && item.y<=270) {
            drugi=item.name;
            br2++;
        }
        else if (item.x >= 400 && item.x <= 700 && item.y>=285 && item.y <= 370) {
            treci=item.name;
            br3++;
        }
    });

    console.log(prvi);
    console.log(drugi);
    console.log(treci);
    console.log(rez);
    var boja1;
    var boja2;
    var boja3;
    if(rez[0]!=prvi||br1!=1){
        boja1=0xe11818;
    }
    else{
        tocni++;
        boja1=boja1=0x07c507;
    }
    if(rez[1]!=drugi||br2!=1){
        boja2=0xe11818;
    }
    else{
        tocni++;
        boja2=0x07c507;
    }
    if(rez[2]!=treci||br3!=1){
        boja3=0xe11818;
    }
    else{
        tocni++;
        boja3=0x07c507;
    }
    padalice.forEach(function(item) {
        if (item.x >= 400 && item.x <= 700 && item.y <= 180) {
            item.input.disableDrag();
            item.tint = boja1;
        }
        else if (item.x >= 400 && item.x <= 700 && item.y >= 175 && item.y<=270) {
            item.input.disableDrag();
            item.tint = boja2;
        }
        else if (item.x >= 400 && item.x <= 700 && item.y>=285 && item.y <= 370) {
            item.input.disableDrag();
            item.tint=boja3;
        }
        else{
            item.input.disableDrag();
        }
    });
    game.add.text(35,25,"Rezultat: ",style);
    for(var i=0;i<tocni;i++){
        game.add.sprite(i*40+35, 65, 'star');
    }
    if(tocni==0){
        game.add.text(35,65,"0",style);
    }

    $("#rjesenje").prop('disabled',true);
    $.post('spremiRezRacunanje',{racunanje:  tocni});

}