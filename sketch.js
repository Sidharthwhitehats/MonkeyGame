
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground;
var survivalTime=0;
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
monkey= createSprite(60,250,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  ground= createSprite(400,350,900,10);
 
  ground.x=ground.width/2;
  
  FoodGroup= createGroup();
  obstacleGroup= createGroup();
}


function draw() {
background("white");
  
  
    ground.velocityX=-4;
    
    if(ground.x<0){
   ground.x=ground.width/2;
 }
  
  
  if(gameState===PLAY){
    
   
  
    if(keyDown("space")  && monkey.y>=200){
    monkey.velocityY= -12;
    
  }
    
     monkey.velocityY= monkey.velocityY+0.8;
  
   
   if(FoodGroup.isTouching(monkey)){
    
    FoodGroup.destroyEach();
  }
   Banana();
  Rock();
  
    stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime= Math.ceil(frameCount/frameRate());
  text("Survival Time: "+survivalTime,100,50);
    
if(obstacleGroup.isTouching(monkey)){
  
  gameState=END;
  
}
    
  }
  
 else if(gameState===END){
   
   text("gameOver",200,200);
   
    if(obstacleGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
  }
   
 }
 
  
  
  
 
  
 
  
  
  monkey.collide(ground);
 
  drawSprites();
}

function Banana(){
  
 if(frameCount%80===0){
   banana= createSprite(200,245,10,10);
   banana.addImage("moving",bananaImage);
   banana.scale=0.1;
   banana.y= Math.round(random(120,200));
   banana.velocityX=-4;
   FoodGroup.add(banana);
 }
  
}
function Rock(){
  if(frameCount%300===0){
    obstacle= createSprite(200,330,10,10);
    obstacle.addImage("moving",obstacleImage);
    obstacle.velocityX=-5;
    obstacle.scale=0.1;
    obstacleGroup.add(obstacle);
  }
}




