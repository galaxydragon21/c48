
var bg, bgImg;
var player, shooterImg, shooter_shooting;
var target, targetGroup
var bullets = 70
var bulletGroup
var gameState = 'fight'
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var score = 0
var life = 3
var explosionSound,lose,winning


function preload() {

  heart1Img = loadImage("assests/heart_1.png")
  heart2Img = loadImage("assests/heart_2.png")
  heart3Img = loadImage("assests/heart_3.png")


  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpg")

  lose = loadSound("assests/lose.mp3")
  winning = loadSound("assests/winning.mp3")
  explosionSound = loadSound("assests/explosion.mp3")

}

function setup() {


  createCanvas(windowWidth, windowHeight);

  //adding the background image
  bg = createSprite(displayWidth / 2 - 20, displayHeight / 2 - 40, 20, 20)
  bg.addImage(bgImg)
  bg.scale = 6.8




  //creating the player sprite
  player = createSprite(displayWidth - 1150, displayHeight - 300, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.3
  player.debug = true
  player.setCollider("rectangle", 0, 0, 300, 300)

  heart1 = createSprite(displayWidth - 150, 40, 20, 20)
  heart1.visible = false
  heart1.addImage("heart1", heart1Img)
  heart1.scale = 0.4

  heart2 = createSprite(displayWidth - 100, 40, 20, 20)
  heart2.visible = false
  heart2.addImage("heart2", heart2Img)
  heart2.scale = 0.4

  heart3 = createSprite(displayWidth - 150, 40, 20, 20)
  heart3.visible = false
  heart3.addImage("heart3", heart3Img)
  heart3.scale = 0.4

  targetGroup = new Group()
  bulletGroup = new Group()


}

function draw() {
  background(0);



  if (gameState === 'fight') {

    if (life === 3) {
      heart1.visible = false
      heart2.visible = false
      heart3.visible = true
    }

    if(life=== 2) {
      heart1.visible=false
      heart2.visible=true
      heart3.visible=false
    }

    if(life=== 1) {
      heart1.visible=true
      heart2.visible=false
      heart3.visible=false
    }

  if(life=== 0){
    gameState="lost"
  }

if(score===250){
gameState="won"
winning.play()
}
    //moving the player up and down and making the game mobile compatible using touches
    if (keyDown("UP_ARROW") || touches.length > 0) {
      player.y = player.y - 30
    }
    if (keyDown("DOWN_ARROW") || touches.length > 0) {
      player.y = player.y + 30
    }





    //release bullets and change the image of shooter to shooting position when space is pressed
    if (keyWentDown("space")) {

      player.addImage(shooter_shooting)
      bullet = createSprite(displayWidth - 1150, player.y - 30, 20, 10)
      bullet.velocityX = 20

      bulletGroup.add(bullet)
      player.depth = bullet.depth
      player.depth = player.depth + 2
      bullets = bullets - 1
    }

    //player goes back to original standing image once we stop pressing the space bar
    else if (keyWentUp("space")) {
      player.addImage(shooterImg)
    }

    if (bullets === 0) {
      gameState = 'bullet'
    }

    if (targetGroup.isTouching(bulletGroup)) {
      for (var i = 0; i < targetGroup.lenght; i++) {

        if (targetGroup.isTouching(bulletGroup)) {
          targetGroup[i].destroy()
          bullet.destroyEach()
          explosionSound.play()
        }
      }
    }

    if (targetGroup.isTouching(player)) {
      lose.play()
      for (var i = 0; 1 < targetGroup.length; i++) {

        if (targetGroup[i].isTouching(player)) {
          targetGroup[i].destroy()
          life= life-1
        }
      }
    }



    spawnTarget();
    enemy()
  }
  drawSprites();

  if (gameState == "lost") {

    textSize(100)
    fill("red")
    text("You Lost ", 400, 400)
    targetGroup.destroyEach();
    player.destroy();

  }

  else if (gameState == "won") {

    textSize(100)
    fill("yellow")
    text("You Won ", 400, 400)
    targetGroup.destroyEach();
    player.destroy();

  }

  else if (gameState == "bullet") {

    textSize(50)
    fill("yellow")
    text("You ran out of bullets!!!", 470, 410)
    targetGroup.destroyEach();
    player.destroy();
    bulletGroup.destroyEach();

  }
}
function enemy() {
  if (frameCount % 50 === 0) {

    //giving random x and y positions for zombie to appear
    zombie = createSprite(random(500, 1100), random(100, 500), 40, 40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug = true
    zombie.setCollider("rectangle", 0, 0, 400, 400)

    zombie.lifetime = 400
    zombieGroup.add(zombie)
  }

}

function spawnTarget() {
  if (frameCount % 110 === 0) {
    target = createSprite(random(400, 1100), random(100, 500), 40, 40)
  }
}

