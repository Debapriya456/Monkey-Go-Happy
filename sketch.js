//create sprites for the background
var backImage, backdrop;
//create sprites for the player
var player, player_running, player_out;
//create sprites for the ground
var ground, ground_img;

//create sprites for the food(bananas)
var FoodGroup, bananaImage;
//create sprites for the obstacles(stones)
var obstaclesGroup, obstacle_img;

//scoring variable
var score = 0;

//this function is used to load the images(animations) or the sounds used in the program
function preload() {

  //loading the image for the background
  backImage = loadImage("jungle.jpg");

  //loading the images for the player(monkey) 
  player_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  //loading image for the bananas
  bananaImage = loadImage("banana.png");

  //loading images for the obstacles
  obstacle_img = loadImage("stone.png");

}

//this function executes the codes only one time
function setup() {

  //creating the canvas of the desired dimensions
  createCanvas(800, 400);

  //creating the background sprite
  backdrop = createSprite(0, 0, 800, 400);
  backdrop.addImage(backImage);
  backdrop.scale = 1.5;
  backdrop.x = backdrop.width / 2;
  backdrop.velocityX = -4;

  //creating the sprite for the player(monkey)
  player = createSprite(100, 340, 20, 50);
  player.addAnimation("Running", player_running);
  player.scale = 0.1;

  //creating the sprite for the ground
  ground = createSprite(400, 350, 800, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  ground.visible = false;

  //declaring variables for the FoodGroup
  FoodGroup = new Group();

  //declaring variables for the ObstaclesGroup
  obstaclesGroup = new Group();

  //setting the initial score
  score = 0;
}

//this function executes the codes infinite times
function draw() {

  //reset the ground when it is exactly at half of its width
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  //reset the background when it is exactly at half of its width
  if (backdrop.x < 100) {
    backdrop.x = backdrop.width / 2;
  }

  //code for destroying the fruits when the player(monkey) touches it and increase the score by 2
  if (FoodGroup.isTouching(player)) {
    FoodGroup.destroyEach();
    score = score + 2;
  }

  //adjusting the size of the player
  switch (score) {
    case 10:
      player.scale = 0.12;
      break;
    case 20:
      player.scale = 0.14;
      break;
    case 30:
      player.scale = 0.16;
      break;
    case 40:
      player.scale = 0.18;
      break;
    default:
      break;
  }

  //this makes the monkey jump when user presses spacebar key
  if (keyDown("space")) {
    player.velocityY = -12;
  }

  //adding gravity
  player.velocityY = player.velocityY + 0.8;

  //making the monkey collide with the ground
  player.collide(ground);

  //declaring the code to spawn the obstacles and food
  spawnFood();
  spawnObstacles();

  //if the player touches an obstacle, reducing the size of the player
  if (obstaclesGroup.isTouching(player)) {
    player.scale = 0.08;
  }

  //draws the sprites, their properties and functions respectively on the main screen
  drawSprites();

  //text to display the score
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);
}

//code for spwing(generating random) fruits
function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(600, 250, 40, 10);
    banana.y = random(120, 200);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
    //assign lifetime to the variable
    banana.lifetime = 300;
    player.depth = banana.depth + 1;

    //add each banana to the group
    FoodGroup.add(banana);
  }
}

//code for spwing(generating random) obstacles
function spawnObstacles() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(800, 350, 10, 40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);

    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;

    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

    //Project Made By Debapriya Ghosh(PRO C-18)