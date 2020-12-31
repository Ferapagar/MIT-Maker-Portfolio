Game game;
Population population;


PImage[] spriteSheet;
PImage spriteSheets;
boolean fastLearn;
void setup() {
  spriteSheet = new PImage[4];
  spriteSheet[0]  = loadImage("sprite1.png");
  spriteSheet[1]  = loadImage("pipes.png");
  spriteSheet[2]  = loadImage("bg.png");
  spriteSheet[3]  = loadImage("ground.png");
  spriteSheets  = loadImage("spritesheet.png");
  fastLearn = false;
  fullScreen(P3D);
  population = new Population(100);
}

void draw() {
  background(0);
  if (fastLearn) {
    while(population.score < 100){
        population.update();
    }
    population.score -= 100;
    fastLearn = false;
  } else {
    if (mousePressed) {
      for (int i = 0; i < map((mouseX + 0.0) / (width + 0.0), 0, 1, 1, 1000); i++) {
        population.update();
      }
    } else {
      population.update();
    }
  }
  population.show();
}
