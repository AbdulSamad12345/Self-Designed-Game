var bg,bgImg,hero,heroImg;
var inviGround,inviGround2;
var platformImg,platform;
var arrow, arrowImg;

var coin, coinAnimation;

var wing, wingAnimation;

var counter=100;

function preload(){
bgImg = loadImage("Images/Background.png");
heroImg = loadImage("Images/Archer.png");
platformImg = loadImage("Images/Platform.png")
arrowImg= loadImage("Images/arrow.png");

coinAnimation = loadAnimation("Images/coin1.png","Images/coin2.png","Images/coin3.png",
"Images/coin4.png","Images/coin5.png","Images/coin6.png")

wingAnimation = loadAnimation("Images/wing1.png","Images/wing2.png","Images/wing3.png","Images/wing4.png",
"Images/wing5.png","Images/wing6.png","Images/wing7.png","Images/wing8.png");


}

function setup(){
  createCanvas(windowWidth-50,windowHeight);

  inviGround = createSprite(100,windowHeight-25,500,50);
  inviGround2 = createSprite

  

  bg = createSprite(windowWidth/2,windowHeight/2)
  bg.addImage(bgImg);
  bg.scale=1.24;
  bg.velocityX = -6;
  
  hero=createSprite(100,windowHeight-130,50,50);
  hero.addImage(heroImg);
  hero.scale = 0.6
  
  platformGrp = new Group();
  coinGrp = new Group();
  arrowGrp = new Group();
  wingGrp = new Group();

  totalCoins=0;
  killCount = 0;
  
  

}


function draw(){
  background("grey");
  
  


  if(bg.x<0){
    bg.x = windowWidth/2;
  }

  if(keyDown("SPACE")&&(hero.y>windowHeight/3)){
    hero.velocityY = (-10);
    
  }
  
  hero.velocityY +=0.7; 
  hero.collide(inviGround);

  if(frameCount%100===0){
    Platforms();
  }
  

  if(keyWentUp("Z")&&(counter>0)){
    counter--
    console.log(counter);
      Arrow();
  }

  if(hero.x<-200){
    hero.x = 100;
    hero.velocityX = 0;
    
  }
  hero.collide(platformGrp);

  hero.isTouching(coinGrp,Collect)

  if(frameCount%70===0){
    Spawn();
  }

arrowGrp.isTouching(wingGrp,KillMonster);
  
 drawSprites();
 fill("blue")
 stroke = 25;
 textSize(20);
 text("Coins Collected: "+totalCoins,100,70);
 fill("red");
 text("Kill Count: "+killCount,windowWidth-300,70);
 
}

function Platforms(){
  
  
  randY = Math.round(random(windowHeight/4+75,2.5*windowHeight/4));
  platform = createSprite(windowWidth+100,randY,100,30);
  platform.velocityX = -8;
  platform.addImage(platformImg);
  platform.scale = 2;
  platformGrp.add(platform);
  platform.lifetime = windowWidth/8+50;
  // platform.debug=true;

  coin = createSprite(platform.x,platform.y-50,50,50);
  coin.addAnimation("coin",coinAnimation);
  coin.scale = 0.6;
  coin.velocityX = -8;
  coin.lifetime = windowWidth/8+50;
  coinGrp.add(coin);


  

}

function Arrow(){
  arrow = createSprite(hero.x,hero.y,20,20);
  arrow.addImage(arrowImg);
  arrow.velocityX = 7;
  arrow.scale=0.33
  arrow.lifetime = windowWidth/8+50;
  arrowGrp.add(arrow);
  // arrow.debug = true;
  arrow.setCollider("rectangle",0,0,300,90)
}

function Collect(hero,coin){
  coin.remove();
  totalCoins++
}

function KillMonster(arrow,wing){
  arrow.remove();
  wing.remove();
  killCount++
}

function Spawn(){
  randY = Math.round(random(windowHeight/4+75,2.5*windowHeight/4));
  wing = createSprite(windowWidth+100,randY,20,20);
  wing.addAnimation("wing",wingAnimation);
  wing.velocityX = -8;
  wing.lifetime = windowWidth/8+50;
  wingGrp.add(wing);
  // wing.debug = true;
}



