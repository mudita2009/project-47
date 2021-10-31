var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;

var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;

var redBubbleGroup, redBubbleGroup, bulletGroup;
 
var wildAnimals , wildanimalGroup ;

var domAnimals , domanimalGroup;

var life =10;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
  wildImg1 = loadImage("leopard.png")
  wildImg2 = loadImage("elephant.png")
  wildImg3 = loadImage("giraffe.png")
  wildImg4 = loadImage("gorilla.png")
  wildImg5 = loadImage("lion.png")
 // wildImg6 = loadImage("panda.png")
  domImg1 = loadImage("cow.png")
  domImg2 = loadImage("duck.png")
 // domImg3 = loadImage("goat.png")
  ///domImg4 = loadImage("hen.png")
  domImg5 = loadImage("horse.png")
 // domImg6 = loadImage("pig.png")
}
function setup() {
  createCanvas(800, 800);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  wildanimalGroup = createGroup();
  domanimalGroup = createGroup();
  
  heading= createElement("h1");
  scoreboard= createElement("h1");
}

function draw() {
  background("#BDA297");
  
  heading.html("Life: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Score: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)

  if(gameState===1){
    gun.y=mouseY  

    if (frameCount % 80 === 0) {
      drawblueBubble();
    }

    if (frameCount % 100 === 0) {
      drawredBubble();
    }

    if(keyDown("space")){
      shootBullet();
    }

    if (wildanimalGroup.collide(backBoard)){
      handleGameoverWild(wildanimalGroup);
    }
    
    /*if (domanimalGroup.collide(backBoard)) {
      handleGameover(domanimalGroup);
    }*/
    
    /*if(blueBubbleGroup.(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);
    }*/

    /*if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision();
    }*/
    
    /*if(blueBubbleGroup.collide()){
      handleBubbleCollision(blueBubbleGroup);
    }*/
    
    /*if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);
    }*/

    if(wildanimalGroup.collide(bulletGroup)){
      handleAnimalCollision(wildanimalGroup);

    }

    if(domanimalGroup.collide(bulletGroup)){
     handleGameoverDom(domanimalGroup)
    }
   
    wildAnimal();
    domAnimal();

    drawSprites();
  }
    
  
}

function drawblueBubble(){
  bluebubble = createSprite(800,random(20,780),40,40);
  bluebubble.addImage(blueBubbleImg);
  bluebubble.scale = 0.1;
  bluebubble.velocityX = -8;
  bluebubble.lifetime = 400;
  blueBubbleGroup.add(bluebubble);
}
function drawredBubble(){
  redbubble = createSprite(800,random(20,780),40,40);
  redbubble.addImage(redBubbleImg);
  redbubble.scale = 0.1;
  redbubble.velocityX = -8;
  redbubble.lifetime = 400;
  redBubbleGroup.add(redbubble);
}

function shootBullet(){
  bullet= createSprite(150, width/2, 50,20)
  bullet.y= gun.y-20
  bullet.addImage(bulletImg)
  bullet.scale=0.12
  bullet.velocityX= 7
  bulletGroup.add(bullet)
}

function wildAnimal(){
if(frameCount % 60 === 0){

 wildAnimals = createSprite(800,random(20,780),40,40);
  var rand= Math.round(random(1,5))
  console.log(rand)
  switch(rand){
  case 1 : wildAnimals.addImage(wildImg1)
 break;
  case 2 : wildAnimals.addImage(wildImg2)
break;
  case 3 : wildAnimals.addImage(wildImg3)
break;
  case 4 : wildAnimals.addImage(wildImg4)
break;
  case 5 : wildAnimals.addImage(wildImg5)

default: break;
  

  }
 
  wildAnimals.scale = 0.5;
  wildAnimals.velocityX = -8;
  wildAnimals.lifetime = 400;
  wildanimalGroup.add(wildAnimals);
}
}

function domAnimal(){
  if(frameCount % 60 === 0){
  
   domAnimals = createSprite(800,random(20,780),40,40);
    var rand= Math.round(random(1,3))
    console.log(rand)
    switch(rand){
    case 1 : domAnimals.addImage(domImg1)
   break;
    case 2 : domAnimals.addImage(domImg2)
  break;
    case 3 : domAnimals.addImage(domImg5)
 
    
  default: break;
    
  
    }
   
    domAnimals.scale = 0.5;
    domAnimals.velocityX = -8;
    domAnimals.lifetime = 400;
    domanimalGroup.add(domAnimals);
  }
  }

function handleAnimalCollision(animalGroup){
    if (life > 0) {
       score=score+1;
    }

     blast= createSprite(bullet.x+60, bullet.y, 50,50);
    blast.addImage(blastImg) 

    /* blast= sprite(bullet.x+60, bullet.y, 50,50);
    blast.addImage(blastImg) */

    /* blast= createSprite(bullet.x+60, bullet.y, 50,50);
    blast.add(blastImg) */

    /* blast= createSprite(bullet.x+60, bullet.y, 50,50);
    image(blastImg) */
    
    blast.scale=0.3
    blast.life=20
    bulletGroup.destroyEach()
    animalGroup.destroyEach()
}

function handleGameoverWild(animalGroup){
  
  //  life=life-1;
    animalGroup.destroyEach();
    

    if (life === 0) {
      gameState=2
      
      swal({
        title: `Game Over`,
        text: "Oops you lost the game....!!!",
        text: "Your Score is " + score,
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Thanks For Playing"
      });
    }
  

}

function handleGameoverDom(animalGroup){
  
    life=life-1;
    animalGroup.destroyEach();
    

    if (life === 0) {
      gameState=2
      
      swal({
        title: `Game Over`,
        text: "Oops you lost the game....!!!",
        text: "Your Score is " + score,
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Thanks For Playing"
      });
    }
  
}

