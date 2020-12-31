class Game {
  BG bg;
  float speed = 1;
  float pipeSeparation;
  int score = 0;
  float groundLevel;
  boolean gameStarted = false, gameFinished = false;
  Bird bird;
  ArrayList <Pipe> pipes;
  PImage[] scoreSheet =new PImage[10];
  boolean autoplay = false;

  Game() {
    groundLevel = height / 2 + height / 3 + height / 12;
    pipeSeparation = 2 * height / 3;
    scoreSheet[0] = spriteSheets.get(495, 59, 14, 20);
    scoreSheet[1] = spriteSheets.get(134, 454, 14, 20);
    scoreSheet[2] = spriteSheets.get(291, 159, 14, 20);
    scoreSheet[3] = spriteSheets.get(305, 159, 14, 20);
    scoreSheet[4] = spriteSheets.get(319, 159, 14, 20);
    scoreSheet[5] = spriteSheets.get(333, 159, 14, 20);
    scoreSheet[6] = spriteSheets.get(291, 183, 14, 20);
    scoreSheet[7] = spriteSheets.get(305, 183, 14, 20);
    scoreSheet[8] = spriteSheets.get(319, 183, 14, 20);
    scoreSheet[9] = spriteSheets.get(333, 183, 14, 20);
    initialize();
  }
  void initialize() {
    pipes = new ArrayList <Pipe>();
    for (int i = 0; i < floor((width - pipeSeparation + height / 8) / height) + 1; i++) {
      pipes.add(new Pipe());
      pipes.get(i).x += i * pipeSeparation - height / 2;
      if (i+1 < floor((width - pipeSeparation + height / 8) / height) + 1) {
        pipes.get(i).respawn = true;
      }
    }
    score = 0;
    bird = new Bird();
    gameStarted = false;
    gameFinished = false;
    speed = 1;
    bg = new BG();
  }

  void jump() {
    bird.fall = height / 1.4;
  }
  void update() {
    background(0);
    if (gameStarted && !gameFinished) {
      bg.update(speed / frameRate);
      for (int i = 0; i < pipes.size(); i++) {
        Pipe current = pipes.get(i);
        current.update(speed / frameRate);
        if (current.collision(bird)) {
          gameFinished = true;
          bird.fall = height / 3;
        }
        if (autoplay) {
          float distance = bird.x - current.x;
          if (distance - bird.w / 2 - current.w / 2 < 0 && - distance < pipeSeparation - bird.w / 2 - current.w / 2 && current.y - bird.y > current.h / 2 * .95 - bird.w / 2 + bird.fall / frameRate && bird.fall < height / 3) {
            jump();
          }
          if (bird.y < - groundLevel + height / 2 + bird.w / 2 - bird.fall / frameRate && !gameFinished) { 
            jump();
          }
        }
        if (current.givePoints(bird)) {
          score++;
          speed *= 1.0;
        }
        if (current.x < width - pipeSeparation + height / 4 && !current.respawn) {
          current.respawn = true;
          pipes.add(new Pipe());
        }
        if (current.x < - height / 4) {
          i--;
          pipes.remove(0);
        }
      }
    }
    if (gameStarted) {
      bird.update(speed / frameRate);
      if (bird.y < - groundLevel + height / 2 + bird.w / 2 && !gameFinished) { 
        bird.fall = 0;
        gameFinished = true;
      }
    }
  }

  void show() {
    bg.show();
    pushMatrix();
    translate(0, height / 2);
    rotateX(PI);
    for (int i = 0; i < pipes.size(); i++) {
      pipes.get(i).show();
    }
    bird.show();
    popMatrix();
    for (int i = 0; i < (floor(width / height) + 2) * 1; i++) {
      imageMode(CORNER);
      image(spriteSheet[3], i * height + (bg.x * 8) % height, groundLevel, height, height / 6);
    }
  }

  void drawScore() {
    drawNum(score, width / 2, height / 2 - height / 3, height / 6);
  }

  void drawNum(int n, float x, float y, float h) {
    String[] chars = str(n).split("");
    imageMode(CENTER);
    for (int i = 0; i < chars.length; i++) {
      image(scoreSheet[int(chars[i])], x - ((chars.length - 1) / 2 - i) * h * 4 / 5, y, h * 3 / 4, h);
    }
  }
}
