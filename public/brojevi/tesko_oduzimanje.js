/**
 * Created by Bruna on 26.5.2016..
 */
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'teskoOduzimanje', { preload: preload, create: create, update: update });
var tema = document.currentScript.getAttribute('tema');

function preload() {

    game.load.image('ground', '../public/nav/razmak.png');
    game.load.image('1', '../public/nav/'+ tema +'/broj_1.png');
    game.load.image('2', '../public/nav/'+ tema +'/broj_2.png');
    game.load.image('3', '../public/nav/'+ tema +'/broj_3.png');
    game.load.image('4', '../public/nav/'+ tema +'/broj_4.png');
    game.load.image('5', '../public/nav/'+ tema +'/broj_5.png');
    game.load.image('6', '../public/nav/'+ tema +'/broj_6.png');
    game.load.image('7', '../public/nav/'+ tema +'/broj_7.png');
    game.load.image('8', '../public/nav/'+ tema +'/broj_8.png');
    game.load.image('9', '../public/nav/'+ tema +'/broj_9.png');
    game.load.image('10', '../public/nav/'+ tema +'/broj_10.png');
    game.load.image('pozadina','../public/nav/'+ tema +'/pozadina.png');
}

var platforms;
var padalice;
var zvijezde=[];
var brojevi=[];
var rez=[];

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'pozadina');

    platforms = game.add.group();
    platforms.enableBody = true;

    var ground = platforms.create(0, game.world.height - 15, 'ground');
    ground.scale.setTo(2.5, 1.5);
    ground.body.immovable = true;

    if( tema == 'police') {
        ground = platforms.create(0, game.world.height - 105, 'ground');
        ground.scale.setTo(2.5, 1.5);
        ground.body.immovable = true;
    } else {
        ground = platforms.create(0, game.world.height - 38, 'ground');
        ground.scale.setTo(2.5, 1.5);
        ground.body.immovable = true;
    }

    generirajBrojeve();

    padalice=game.add.group();
    padalice.enableBody=true;

    for (var i = 1; i <= 10; i++)
    {
        var star;
        if(tema == 'police' && i == 10) {
            star = padalice.create(11 * 60, game.world.height - 110, String(i));
        } else {
            star = padalice.create(i * 60 + ((tema == 'police' && i % 2 == 1) ? 0 : 15), game.world.height - ((tema == 'police' && i % 2 == 1) ? 110 : 250), String(i));
        }
        star.name = i;
        star.inputEnabled = true;
        star.body.collideWorldBounds=true;

        star.input.enableDrag();
        star.body.gravity.y = 3000;
        zvijezde.push(star);
    }

    var ledge;
    var s;
    setTimeout(function(){
        //  Now let's create two ledges
        var stylePloca = { font: "68px NoMoreLies",fontWeight:'bold', fill: '#FFC5FF', align: "center" };
        var stylePolica = {font: "68px Heavitas2",fontWeight:'bold', fill: '#FFFCD5', align: "center"}

        var style = stylePloca;
        var podigni = 0;
        if( tema == 'police') {
            console.log('tu sam');
            style = stylePolica;
            podigni = 35;
        }
        s=game.add.text(135 + ((brojevi[0]!=10)?20:0), 65 - podigni ,brojevi[0] + ' - ' + brojevi[1], style);
        s=game.add.text(335, 65 - podigni ,' =', style);

        ledge = platforms.create(340, 125 - podigni*0.3, 'ground');
        ledge.body.immovable = true;

        s=game.add.text(135 + ((brojevi[2]!=10)?20:0), 175 - podigni*0.4 ,brojevi[2] + ' - ' + brojevi[3], style);
        s=game.add.text(335, 175 - podigni*0.4 ,' =', style);

        ledge = platforms.create(340, 235 + podigni*0.4 , 'ground');
        ledge.body.immovable = true;

        s=game.add.text(135 + ((brojevi[4]!=10)?20:0), 285 + podigni*0.3 ,brojevi[4] + ' - ' + brojevi[5], style);
        s=game.add.text(335, 285 + podigni*0.3 ,' =', style);

        ledge = platforms.create(340, 345 + podigni, 'ground');
        ledge.body.immovable = true;

    },1000);

}

function update() {

    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(padalice, platforms);

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
        if (item.x >= 320  && item.y <= 150) {
            prvi=item.name;
            br1++;
        }
        else if (item.x >= 320 && item.y >= 150 && item.y<=270) {
            drugi=item.name;
            br2++;
        }
        else if (item.x >= 320 && item.y>=270 && item.y <= 370) {
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
        if (item.x >= 320  && item.y <= 150)  {
            item.input.disableDrag();
            item.tint = boja1;
        }
        else if (item.x >= 320 && item.y >= 150 && item.y<=270) {
            item.input.disableDrag();
            item.tint = boja2;
        }
        else if (item.x >= 320 && item.y>=270 && item.y <= 370) {
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

    //$("#rjesenje").prop('disabled',true);

}