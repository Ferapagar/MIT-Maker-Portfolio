class Bird {
  float x, y, maxY, minY, maxX, minX;
  float fall;
  float fallSpeed;
  float w;
  PImage sprite;
  float groundLevel;
  NeuralNetwork brain;
  float fitness;
  float distanceRan;
  boolean dead;
  int score;

  Bird() {
    groundLevel = - height / 3 - height / 12;
    brain = new NeuralNetwork(2, 2, 1);
    sprite = spriteSheet[0];
    dead = false;
    w = height / 15;
    y = 0;
    x = height / 5;
    distanceRan = 0;
    maxX = x + w / 2;
    minX = x - w / 2;
    maxY = y + w / 2;
    minY = y - w / 2;
    fall = 0;
    fallSpeed = height / 0.5;
    score = 0;
  }

  void update(float t) {
    distanceRan += t;
    y += fall * t + (fallSpeed * t * t) / 2;
    fall -= fallSpeed * t;
    if (y <= groundLevel + w / 2) {
      y = groundLevel + w / 2;
      fall = 0;
    }
    if (y + w / 2 > height / 2) {
      y = height / 2 - w / 2;
      fall = 0;
    }
    maxX = x + w / 2;
    minX = x - w / 2;
    maxY = y + w / 2;
    minY = y - w / 2;
  }

  void show() {
    pushMatrix();
    translate(x, y);
    rotateX(PI);
    rotateZ(radians(25) - atan(1.5 * fall / 1000));
    imageMode(CENTER);
    image(sprite, 0, 0, w, w * 706 / 820);
    popMatrix();
  }

  void collision(Pipe pipe) {
    if (pipe.collision(this)) {
      dead = true;
      float distanceToGoal = dist(0, y, 0, pipe.y);
      fitness = 1 / pow(3 * distanceToGoal / height, 10) + 10 * score;
    }
  }

  void think(Pipe pipe) {
    float[] thought = brain.feedForward(new float[] {y / height, pipe.y / height});
    if (thought[0] > .5) {
      jump();
    }
  }

  void jump() {
    fall = height / 1.4;
  }

  Bird giveBabie() {
    Bird ans = new Bird();
    ans.brain = brain.clone();
    return ans;
  }
}
