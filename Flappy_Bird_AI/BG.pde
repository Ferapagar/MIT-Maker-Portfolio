class BG{
  PImage sprite;
  float x;
  int repetitions;
  float w;
  float h;
  
  BG(){
    x = 0;
    h = height;
    repetitions = floor(width / (1350 / 504 * h)) + 2;
    w = 1350 / 504 * h;
    sprite = spriteSheet[2];
  }
  
  void update(float howMuch){
    x -= height / 20 * howMuch;
    if (x < - w){
      x += w;
    }
  }
  
  void show(){
    imageMode(CORNER);
    tint(255, 255);
    for (int i = 0; i < repetitions; i++){
      image(sprite, x + w * i, 0, w, h);
    }
  }
  
}
